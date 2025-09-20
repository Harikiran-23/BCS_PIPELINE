from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import numpy as np
import shap
import pandas as pd
from rdkit import Chem
from rdkit.Chem import Descriptors, rdMolDescriptors, QED, GraphDescriptors, AllChem
from fastapi.middleware.cors import CORSMiddleware


# ----------------------------
# Load artifacts
# ----------------------------
model_lgbm = joblib.load("lgbm_model.pkl")
preprocessor = joblib.load("preprocessor.pkl")
feature_names = joblib.load("lgbm_feature_names.pkl")

# Random Forest classifier
clf = joblib.load("random_forest_classifier.pkl")
rf_features = joblib.load("rf_feature_names.pkl")

# Setup SHAP
explainer = shap.TreeExplainer(model_lgbm)

# ----------------------------
# Request Schema
# ----------------------------
class SMILESInput(BaseModel):
    smiles: str

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ----------------------------
# Utility functions
# ----------------------------
def smiles_to_ecfp4(smiles, n_bits=1024):
    mol = Chem.MolFromSmiles(smiles)
    if mol is None: 
        return None
    fp = AllChem.GetMorganFingerprintAsBitVect(mol, radius=2, nBits=n_bits)
    return np.array(fp)

def get_molecular_descriptors(smiles):
    mol = Chem.MolFromSmiles(smiles)
    if mol is None:
        return None
    return {
        'MolWt': Descriptors.MolWt(mol),
        'HeavyAtomCount': Descriptors.HeavyAtomCount(mol),
        'NumRotatableBonds': rdMolDescriptors.CalcNumRotatableBonds(mol),
        'TPSA': Descriptors.TPSA(mol),
        'LabuteASA': rdMolDescriptors.CalcLabuteASA(mol),
        'MolLogP': rdMolDescriptors.CalcCrippenDescriptors(mol)[0],
        'MolMR': rdMolDescriptors.CalcCrippenDescriptors(mol)[1],
        'FractionCSP3': rdMolDescriptors.CalcFractionCSP3(mol),
        'NumHDonors': Descriptors.NumHDonors(mol),
        'NumHAcceptors': Descriptors.NumHAcceptors(mol),
        'RingCount': Descriptors.RingCount(mol),
        'QED': QED.qed(mol),
        'BalabanJ': GraphDescriptors.BalabanJ(mol),
        'BertzCT': GraphDescriptors.BertzCT(mol),
        'Ipc': GraphDescriptors.Ipc(mol),
        'FormalCharge': Chem.GetFormalCharge(mol),
        'RadicalElectrons': Descriptors.NumRadicalElectrons(mol)
    }

def generate_lgbm_explanation(instance_features, shap_values, feature_names, top_n=5):
    df_shap = pd.DataFrame({
        "feature": feature_names,
        "value": instance_features,
        "shap_value": shap_values
    })
    df_shap["abs_shap"] = df_shap["shap_value"].abs()
    df_top = df_shap.sort_values("abs_shap", ascending=False).head(top_n)

    explanations = []
    for _, row in df_top.iterrows():
        direction = "increases" if row["shap_value"] > 0 else "decreases"
        explanations.append(
            f"The feature '{row['feature']}' with value {row['value']:.3f} {direction} solubility."
        )
    return " ".join(explanations)

# ----------------------------
# API Route
# ----------------------------
@app.post("/predict_logS")
def predict(input: SMILESInput):
    descriptors = get_molecular_descriptors(input.smiles)
    ecfp = smiles_to_ecfp4(input.smiles)

    if descriptors is None or ecfp is None:
        return {"error": "Invalid SMILES"}

    # --- logS prediction ---
    X_desc = pd.DataFrame([descriptors])
    X_proc = preprocessor.transform(X_desc)
    X_final = np.hstack([X_proc, ecfp.reshape(1, -1)])

    logS_pred = model_lgbm.predict(X_final)[0]
    shap_values = explainer.shap_values(X_final)[0]
    logS_explanation = generate_lgbm_explanation(X_final[0], shap_values, feature_names)

    # --- Random Forest Classification ---
    # Using logS and MolLogP for RF input
    X_class = pd.DataFrame([[logS_pred, descriptors['MolLogP']]], columns=rf_features)
    class_pred = clf.predict(X_class)[0]  # multi-label
    class_labels = ['I','II','III','IV']
    predicted_classes = [cls for cls, flag in zip(class_labels, class_pred) if flag==1]
    if not predicted_classes:
        predicted_classes = ["Uncertain"]

    class_explanation = (
        f"Predicted BCS class based on logS={logS_pred:.3f} and logP={descriptors['MolLogP']:.3f}."
    )

    return {
        "Values": descriptors,
        "logS": float(logS_pred),
        "logP": float(descriptors['MolLogP']),
        "logS_explanation": logS_explanation,
        "class": predicted_classes,
        "class_explanation": class_explanation
    }
