# BCS_PIPELINE Project Documentation

## Project Overview

**BCS_PIPELINE** is a three-tier machine learning application for **Biopharmaceutics Classification System (BCS)** prediction of drug compounds. The system classifies drugs into BCS Classes I–IV based on solubility and permeability characteristics.

**Project Structure:**
- **Frontend** (React + Vite) — Interactive UI for drug predictions
- **Backend** (FastAPI) — Orchestrates frontend requests and calls ml_services
- **ml_services** (FastAPI + ML Models) — Core ML inference engine

---

## Architecture & Integration

### Data Flow
```
Frontend (React, port 5173)
    ↓ (HTTP POST to localhost:5000)
Backend (FastAPI, port 5000)
    ↓ (HTTP POST to localhost:8000/predict_logS)
ml_services (FastAPI, port 8000)
    ↓ (model inference)
    Returns: predictions + explanations
    ↑ (JSON response)
Backend
    ↑ (JSON response)
Frontend (displays results)
```

### Component Responsibilities

#### Frontend (`frontend/`)
- **Technology:** React + Vite
- **Purpose:** User interface for BCS drug classification
- **Inputs:** User-provided SMILES string (chemical notation)
- **Outputs:** BCS class prediction with visual explanations
- **API Call:** `POST http://localhost:5000/api/predict` (calls backend)
- **Run Command:** `npm run dev` (runs on port 5173)

#### Backend (`backend/`)
- **Technology:** FastAPI (Node.js/Express referenced in docs, but actual code is likely FastAPI/Python)
- **Purpose:** Request orchestration and validation
- **Key File:** `backend/server.js` or equivalent Python file
- **API Endpoints:**
  - `POST /api/predict` — Receives SMILES from frontend
  - Calls ml_services at `http://localhost:8000/predict_logS`
  - Returns combined response to frontend
- **Environment Variables:** 
  - `PORT=5000` (backend listens here)
  - `ML_SERVICE_URL=http://127.0.0.1:8000/predict_logS` (defined but check if actively used)
- **Run Command:** `npm run dev` (runs on port 5000)

#### ml_services (`ml_services/`)
- **Technology:** FastAPI + Python 3.11
- **Purpose:** Machine learning inference and explainability
- **Key Files:**
  - `ml_services/app.py` — FastAPI app with `/predict_logS` endpoint
  - `ml_services/bcs_explainer.py` — CatBoost model inference & SHAP explanations
  - `ml_services/predict_logS.py` — Utility for logS (solubility) predictions
- **API Endpoint:** `POST /predict_logS`
  - **Input:** `{"smiles": "CCO"}`
  - **Output:** JSON with predictions, probabilities, descriptor values, SHAP explanations
- **Trained Models:**
  - LightGBM (`lgbm_model.pkl`) — logS (solubility) regression
  - CatBoost (`artifacts_bcs/catboost_ovr.pkl`) — BCS multiclass classification (I, II, III, IV)
  - Preprocessing pipelines (`preprocessor.pkl`) for descriptor normalization
  - ECFP fingerprints (Morgan fingerprints, radius=2, 1024 bits)
- **Run Command:** 
  ```
  .\.venv\Scripts\python.exe -m uvicorn app:app --host 0.0.0.0 --port 8000 --reload
  ```
- **Dependencies:** See `ml_services/requirements.txt` (scikit-learn==1.4.2 critical for model compatibility)

---

## Setup & Running the Project

### Prerequisites
- **Node.js** (for frontend & backend)
- **Python 3.11** (for ml_services)
- **uv** (Python package manager, already installed)
- **Git**

### Step 1: Clone & Install Frontend
```bash
cd frontend
npm install
npm run dev  # Runs on http://localhost:5173
```

### Step 2: Install & Run Backend
```bash
cd backend
npm install
npm run dev  # Runs on http://localhost:5000
```

### Step 3: Set Up & Run ml_services
```bash
cd ml_services

# Virtual environment already created in `.venv`
# If you need to recreate it:
# uv venv .venv --python 3.11
# uv pip install -r requirements.txt --python .venv\Scripts\python.exe

# Start the service:
.\.venv\Scripts\python.exe -m uvicorn app:app --host 0.0.0.0 --port 8000 --reload
# Runs on http://localhost:8000
```

### Verify All Services Are Running
- **Frontend:** http://localhost:5173
- **Backend:** http://localhost:5000
- **ml_services:** http://localhost:8000

---

## API Specifications

### ml_services: `/predict_logS` Endpoint

**Request:**
```json
{
  "smiles": "CCO"
}
```

**Response:**
```json
{
  "Values": {
    "MolWt": 46.069,
    "HeavyAtomCount": 3,
    "NumRotatableBonds": 0,
    "TPSA": 20.23,
    "MolLogP": -0.001,
    "..." : "... (14 total molecular descriptors)"
  },
  "logS": 0.291,
  "logP": -0.001,
  "logS_explanation": "The feature 'MolLogP' with value -0.881 increases solubility. ...",
  "cb_probabilities": {
    "I": 0.976,
    "II": 0.004,
    "III": 0.141,
    "IV": 0.115
  },
  "cb_predicted_class": "I",
  "cb_predicted_flag": 1,
  "cb_descriptor_share": 0.759,
  "cb_ecfp_share": 0.241,
  "cb_top_descriptors": [
    {
      "name": "TPSA",
      "meaning": "Topological polar surface area",
      "value": 20.23,
      "contribution": 1.07,
      "effect": "toward"
    },
    "... (6 total)"
  ],
  "cb_bias": -1.966,
  "class_explanation": "Predicted BCS class (CatBoost): I"
}
```

**Error Handling:**
```json
{
  "error": "Invalid SMILES string. Please enter a valid chemical SMILES."
}
```

---

## Key Files & Their Purposes

### ml_services/
| File | Purpose |
|------|---------|
| `app.py` | FastAPI entry point; defines `/predict_logS` route; orchestrates feature extraction and model inference |
| `bcs_explainer.py` | Loads CatBoost OvR classifier; computes SHAP feature importance; formats explanations |
| `predict_logS.py` | LightGBM inference utilities; used by app.py for solubility prediction |
| `requirements.txt` | Python dependencies (fastapi, uvicorn, rdkit, catboost, lightgbm, scikit-learn==1.4.2, shap, etc.) |
| `.venv/` | Virtual environment with Python 3.11 and all dependencies installed |
| `artifacts_bcs/` | Directory containing trained model artifacts (CatBoost, preprocessing info, descriptor metadata) |

### Frontend/
| File/Dir | Purpose |
|----------|---------|
| `src/` | React components, hooks, styles |
| `public/` | Static assets |
| `vite.config.ts` | Vite build configuration |
| `package.json` | Frontend dependencies & scripts |

### Backend/
| File/Dir | Purpose |
|----------|---------|
| `server.js` (or equivalent) | Express/FastAPI server; `/api/predict` endpoint; calls ml_services |
| `.env` | Environment variables (PORT, ML_SERVICE_URL, FRONTEND_URL) |
| `package.json` | Backend dependencies & scripts |

---

## Model Training & Artifacts

### Models Used
1. **LightGBM (logS Regression)**
   - Predicts aqueous solubility (logS)
   - Uses molecular descriptors + ECFP fingerprints
   - File: `lgbm_model.pkl`

2. **CatBoost (BCS Classification)**
   - One-vs-Rest multiclass classifier (Classes I, II, III, IV)
   - Trained on solubility + permeability features
   - File: `artifacts_bcs/catboost_ovr.pkl`

### Feature Engineering
- **Molecular Descriptors:** 17 features (MolWt, TPSA, MolLogP, BertzCT, etc.) computed via RDKit
- **ECFP Fingerprints:** Morgan fingerprints (radius=2, 1024 bits)
- **Preprocessing:** RobustScaler for outlier-resistant normalization (scikit-learn pipeline)

### Model Performance (from README)
- **LightGBM (logS):** R² = 0.851
- **CatBoost (BCS):** Balanced precision/recall across 4 classes
- **Interpretability:** SHAP TreeExplainer for feature attribution

---

## Important Notes & Common Issues

### ⚠️ Critical: scikit-learn Version
**Requirement:** scikit-learn==1.4.2  
**Reason:** Models were pickled with scikit-learn 1.4.2. Using newer versions (e.g., 1.9.0) causes `AttributeError: 'SimpleImputer' object has no attribute '_fill_dtype'`.  
**Solution:** Always install from `requirements.txt` with pinned version.

### ⚠️ CORS Configuration
- **ml_services** allows requests from `http://localhost:5173` (frontend origin)
- **Backend** calls ml_services at `http://localhost:8000/predict_logS`
- If deploying, update CORS origins in `ml_services/app.py` (line 32)

### ⚠️ Route Mismatch (To Fix)
- **Current State:** `backend/server.js` calls `http://localhost:8000/predict` (hardcoded, line 20)
- **ml_services provides:** `POST /predict_logS`
- **Impact:** Backend call will 404 against ml_services unless corrected
- **Fix:** Update backend call to `http://localhost:8000/predict_logS` to match the actual route

### Model Artifact Loading
- Models are loaded at **startup** of ml_services (not per-request)
- Typical startup time: ~5–10 seconds (loading SHAP explainer, unpickling models)
- With `--reload`, uvicorn restarts on file changes (artifacts are reloaded)

### SMILES Validation
- Invalid SMILES strings return error response
- Valid SMILES: `"CCO"` (ethanol), `"c1ccccc1"` (benzene), `"CC(=O)O"` (acetic acid)
- RDKit's `Chem.MolFromSmiles()` parses and validates SMILES

---

## Development & Debugging

### Testing ml_services Directly
```bash
curl -X POST http://localhost:8000/predict_logS \
  -H "Content-Type: application/json" \
  -d '{"smiles":"CCO"}'
```

### Virtual Environment Management
```bash
# Activate venv (PowerShell)
.\.venv\Scripts\Activate.ps1

# Activate venv (bash)
source .venv/Scripts/activate

# Install additional packages
uv pip install <package-name> --python .venv\Scripts\python.exe

# Check installed versions
uv pip list --python .venv\Scripts\python.exe
```

### Common Development Tasks

**Adding a new dependency to ml_services:**
1. Add to `ml_services/requirements.txt`
2. Run `uv pip install -r requirements.txt --python .venv\Scripts\python.exe`
3. Commit both the requirements.txt and any code changes

**Updating ml_services code:**
- With `--reload` flag, uvicorn auto-restarts on Python file changes
- Model artifact changes require server restart

**Debugging prediction failures:**
- Check ml_services logs (SMILES parsing, descriptor computation)
- Verify SMILES validity: http://localhost:8000/docs (FastAPI interactive docs)
- Check scikit-learn version: `uv pip list --python .venv\Scripts\python.exe | grep scikit`

---

## Project History & Key Commits

Recent commits (from `git log`):
- **f06370d** Invalid Smiles Bug Fix
- **c0f3aa9** Complete project files
- **b01de1f** Catboost Implementation
- **346063c** css edits
- **5c519a4** Initial Commit: completed the entire pipeline for BCS classification

See git history for detailed change tracking.

---

## Future Enhancements & Known Limitations

### Known Limitations
- Model predictions are deterministic (no uncertainty quantification)
- SHAP explanations explain model behavior, not chemistry
- ECFP fingerprints lose 3D spatial information

### Potential Improvements
- Add confidence intervals or Bayesian uncertainty
- Ensemble with additional models (Random Forest, GCN)
- Support for batch predictions
- Caching layer for repeated SMILES queries
- Docker containerization for easier deployment

---

## Contact & References

**Developed By:**
- HARI KIRAN K (PES2UG22CS212)
- HARI SHANKAR (PESUGEECS213)
- KRUPA S (PES2UG22CS272)
- RHUSHYA K C (PES2UG22CS440)

**Department:** Computer Science, PES University

**Related Files:**
- `README.md` — High-level project overview
- `ml_services/requirements.txt` — Python dependencies
- `backend/.env` — Environment configuration
- `ml_services/artifacts_bcs/descriptor_columns.json` — Feature metadata
