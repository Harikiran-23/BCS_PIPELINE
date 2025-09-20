import { useState } from "react";
import axios from "axios";
import "./App.css";

const classDescriptions = {
  I: "High Solubility, High Permeability",
  II: "Low Solubility, High Permeability",
  III: "High Solubility, Low Permeability",
  IV: "Low Solubility, Low Permeability"
};

function App() {
  const [smiles, setSmiles] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handlePredict = async () => {
    if (!smiles) return;
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:8000/predict_logS", { smiles });
      setResult(response.data);
    } catch (err) {
      console.error(err);
      alert("Error connecting to backend.");
    }
    setLoading(false);
  };

  return (
    <div className="container">
      {/* --- Intro Section --- */}
      <section className="intro">
        <h1>Biopharmaceutics Classification System (BCS)</h1>
        <p>
          The <strong>BCS Classification</strong> is a scientific framework that categorizes drugs
          based on their <strong>solubility</strong> and <strong>intestinal permeability</strong>.
          It helps in predicting drug absorption and guiding formulation strategies.
        </p>

        <h2>Why is BCS Important?</h2>
        <p>
          BCS plays a crucial role in pharmaceutical development and regulatory approvals.
          It assists in <em>drug discovery, bioequivalence studies, and formulation design</em>.
          Understanding the class of a drug helps in determining whether additional
          bioavailability studies are required.
        </p>

        <h2>The Four BCS Classes</h2>
        <div className="classes">
          <div className="class-card">
            <h3>Class I</h3>
            <p>{classDescriptions.I}</p>
            <small>Drugs are well absorbed with minimal formulation challenges.</small>
          </div>

          <div className="class-card">
            <h3>Class II</h3>
            <p>{classDescriptions.II}</p>
            <small>Absorption depends on improving solubility.</small>
          </div>

          <div className="class-card">
            <h3>Class III</h3>
            <p>{classDescriptions.III}</p>
            <small>Absorption depends on permeability enhancement strategies.</small>
          </div>

          <div className="class-card">
            <h3>Class IV</h3>
            <p>{classDescriptions.IV}</p>
            <small>Poor absorption; formulation is highly challenging.</small>
          </div>
        </div>
      </section>

      {/* --- Prediction Tool Section --- */}
      <section className="tool">
        <h2>Try the BCS Prediction Tool</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handlePredict();
          }}
        >
          <input
            type="text"
            placeholder="Enter SMILES string"
            value={smiles}
            onChange={(e) => setSmiles(e.target.value)}
          />
          <button type="submit">{loading ? "Predicting..." : "Predict"}</button>
        </form>

        {result && (
          <div className="result">
            <h2>Predicted logS: {result.logS.toFixed(3)}</h2>
            <p><strong>logS Explanation:</strong> {result.logS_explanation}</p>
            <h2>logP Value: {result.logP.toFixed(3)}</h2>
            
            <h2>
              Predicted BCS Class:{" "}
              {result.class.map(c => `${c} (${classDescriptions[c]})`).join(", ")}
            </h2>
            <p><strong>Class Explanation:</strong> {result.class_explanation}</p>

            <h3>Molecular Descriptors:</h3>
            <table className="descriptor-table">
              <thead>
                <tr>
                  <th>Descriptor</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(result.Values).map(([key, val]) => (
                  <tr key={key}>
                    <td>{key}</td>
                    <td>{val.toFixed(3)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}

export default App;
