import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import "./App.css";

// ===== Components =====

const HeroSection = ({ onStartClick }) => {
  return (
    <motion.section
      className="hero-section"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="hero-background">
        <svg viewBox="0 0 1200 600" className="molecule-svg">
          <circle cx="600" cy="300" r="80" fill="none" stroke="#3b82f6" opacity="0.1" strokeWidth="2" />
          <circle cx="450" cy="200" r="40" fill="none" stroke="#60a5fa" opacity="0.15" strokeWidth="2" />
          <circle cx="750" cy="200" r="40" fill="none" stroke="#60a5fa" opacity="0.15" strokeWidth="2" />
          <circle cx="400" cy="450" r="35" fill="none" stroke="#0ea5e9" opacity="0.1" strokeWidth="2" />
          <circle cx="800" cy="450" r="35" fill="none" stroke="#0ea5e9" opacity="0.1" strokeWidth="2" />
          <line x1="600" y1="300" x2="450" y2="200" stroke="#3b82f6" opacity="0.2" strokeWidth="2" />
          <line x1="600" y1="300" x2="750" y2="200" stroke="#3b82f6" opacity="0.2" strokeWidth="2" />
          <line x1="600" y1="300" x2="400" y2="450" stroke="#3b82f6" opacity="0.2" strokeWidth="2" />
          <line x1="600" y1="300" x2="800" y2="450" stroke="#3b82f6" opacity="0.2" strokeWidth="2" />
        </svg>
      </div>

      <div className="hero-content">
        <motion.h1
          className="hero-title"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Automated BCS Drug Categorization
        </motion.h1>

        <motion.p
          className="hero-subtitle"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          Machine Learning for Biopharmaceutics Classification System
        </motion.p>

        <motion.div
          className="hero-badge"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          ✓ Accepted Research Publication
        </motion.div>

        <motion.button
          className="hero-cta"
          onClick={onStartClick}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          Start Prediction
        </motion.button>
      </div>
    </motion.section>
  );
};

const AboutSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.section
      className="about-section"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <motion.h2 variants={itemVariants}>About the Research</motion.h2>

      <motion.p variants={itemVariants} className="about-intro">
        The Biopharmaceutics Classification System (BCS) is an internationally accepted framework for categorizing drug molecules based on two critical pharmaceutical properties: aqueous solubility and intestinal permeability. Traditional laboratory methods for determining BCS classes require significant time, cost, and experimental resources.
      </motion.p>

      <motion.p variants={itemVariants}>
        This research presents an automated machine learning pipeline capable of predicting the BCS class directly from a molecular SMILES representation, combining molecular featurization, solubility prediction, and explainable AI into a single integrated platform.
      </motion.p>

      <motion.div className="research-highlights" variants={containerVariants}>
        {[
          { icon: "🔬", title: "ML Pipeline", desc: "End-to-end learning from molecules" },
          { icon: "🧠", title: "Explainable AI", desc: "Interpretable predictions via SHAP" },
          { icon: "🎯", title: "High Accuracy", desc: "Validated on pharmaceutical datasets" },
          { icon: "🌐", title: "Interactive", desc: "Real-time predictions in your browser" },
        ].map((item, i) => (
          <motion.div key={i} className="highlight-card" variants={itemVariants}>
            <div className="highlight-icon">{item.icon}</div>
            <h4>{item.title}</h4>
            <p>{item.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
};

const BCSClassesSection = () => {
  const classData = {
    I: { solubility: "High", permeability: "High", color: "from-green-50 to-emerald-50", accent: "text-emerald-600" },
    II: { solubility: "Low", permeability: "High", color: "from-blue-50 to-cyan-50", accent: "text-cyan-600" },
    III: { solubility: "High", permeability: "Low", color: "from-amber-50 to-orange-50", accent: "text-orange-600" },
    IV: { solubility: "Low", permeability: "Low", color: "from-red-50 to-rose-50", accent: "text-rose-600" },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.section
      className="bcs-section"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <motion.h2 variants={itemVariants}>Why BCS Matters</motion.h2>
      <motion.p variants={itemVariants} className="section-intro">
        Four distinct classes with important implications for drug absorption and formulation strategies
      </motion.p>

      <div className="bcs-grid">
        {Object.entries(classData).map(([cls, data]) => (
          <motion.div
            key={cls}
            className={`bcs-card bg-gradient-to-br ${data.color}`}
            variants={itemVariants}
            whileHover={{ y: -8 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <div className={`class-label ${data.accent}`}>Class {cls}</div>
            <div className="class-properties">
              <div>
                <span className="property-label">Solubility</span>
                <span className="property-value">{data.solubility}</span>
              </div>
              <div>
                <span className="property-label">Permeability</span>
                <span className="property-value">{data.permeability}</span>
              </div>
            </div>
            <p className="class-detail">
              {cls === "I" && "Well absorbed with minimal formulation challenges"}
              {cls === "II" && "Absorption depends on improving solubility"}
              {cls === "III" && "Absorption depends on permeability enhancement"}
              {cls === "IV" && "Poor absorption; formulation is highly challenging"}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

const PipelineSection = () => {
  const steps = [
    { label: "SMILES", icon: "📝" },
    { label: "RDKit", icon: "🧪" },
    { label: "Descriptors", icon: "📊" },
    { label: "LightGBM", icon: "⚡" },
    { label: "CatBoost", icon: "🎯" },
    { label: "SHAP", icon: "💡" },
    { label: "Prediction", icon: "✓" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  return (
    <motion.section
      className="pipeline-section"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        Research Pipeline
      </motion.h2>
      <motion.p
        className="section-intro"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        Sequential workflow from molecular input to interpretable prediction
      </motion.p>

      <div className="pipeline-flow">
        {steps.map((step, idx) => (
          <div key={idx}>
            <motion.div
              className="pipeline-step"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="step-icon">{step.icon}</div>
              <div className="step-label">{step.label}</div>
            </motion.div>
            {idx < steps.length - 1 && <div className="pipeline-arrow">→</div>}
          </div>
        ))}
      </div>
    </motion.section>
  );
};

const TechStackSection = () => {
  const techs = [
    { name: "React", category: "Frontend" },
    { name: "FastAPI", category: "Backend" },
    { name: "RDKit", category: "Cheminformatics" },
    { name: "LightGBM", category: "ML" },
    { name: "CatBoost", category: "ML" },
    { name: "SHAP", category: "Explainability" },
    { name: "XGBoost", category: "ML" },
    { name: "Random Forest", category: "ML" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
  };

  return (
    <motion.section
      className="techstack-section"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <motion.h2 variants={itemVariants}>Technology Stack</motion.h2>

      <div className="tech-grid">
        {techs.map((tech, idx) => (
          <motion.div key={idx} className="tech-card" variants={itemVariants} whileHover={{ y: -4 }}>
            <div className="tech-name">{tech.name}</div>
            <div className="tech-category">{tech.category}</div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

const PerformanceSection = () => {
  const AnimatedCounter = ({ target, decimals = 3 }) => {
    const [count, setCount] = useState(0);

    return (
      <motion.div
        onAnimationComplete={() => setCount(target)}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        {count > 0 ? count.toFixed(decimals) : target.toFixed(decimals)}
      </motion.div>
    );
  };

  const metrics = [
    { label: "LogS R²", value: 0.851, icon: "📈" },
    { label: "Macro F1", value: 0.379, icon: "📊" },
    { label: "Micro ROC-AUC", value: 0.749, icon: "🎯" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.section
      className="performance-section"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <motion.h2 variants={itemVariants}>Performance Dashboard</motion.h2>

      <div className="metrics-grid">
        {metrics.map((metric, idx) => (
          <motion.div key={idx} className="metric-card" variants={itemVariants} whileHover={{ scale: 1.02 }}>
            <div className="metric-icon">{metric.icon}</div>
            <div className="metric-label">{metric.label}</div>
            <div className="metric-value">
              <AnimatedCounter target={metric.value} decimals={3} />
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div className="additional-metrics" variants={itemVariants}>
        <div className="metric-item">
          <span className="metric-name">Cross Validation</span>
          <span className="metric-val">0.378 ± 0.013</span>
        </div>
        <div className="metric-item">
          <span className="metric-name">Selected Model</span>
          <span className="metric-val">CatBoost</span>
        </div>
      </motion.div>
    </motion.section>
  );
};

const ModelComparisonSection = () => {
  const models = [
    { name: "Graph Convolution Network", r2: "0.710", category: "LogS" },
    { name: "LightGBM", r2: "0.851", category: "LogS", selected: true },
    { name: "Ensemble", r2: "0.762", category: "LogS" },
    // { name: "Random Forest", r2: "—", category: "BCS" },
    // { name: "XGBoost", r2: "—", category: "BCS" },
    // { name: "CatBoost", r2: "—", category: "BCS", selected: true },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <motion.section
      className="comparison-section"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <motion.h2 variants={itemVariants}>Model Comparison</motion.h2>

      <div className="comparison-table">
        <div className="table-header">
          <div>Model</div>
          <div>Category</div>
          <div>Performance</div>
          <div>Status</div>
        </div>
        {models.map((model, idx) => (
          <motion.div
            key={idx}
            className={`table-row ${model.selected ? "selected" : ""}`}
            variants={itemVariants}
            whileHover={{ backgroundColor: "rgba(59, 130, 246, 0.05)" }}
          >
            <div className="model-name">{model.name}</div>
            <div className="model-category">{model.category}</div>
            <div className="model-perf">{model.r2}</div>
            <div className="model-status">{model.selected ? "✓ Selected" : "—"}</div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

// ===== Main Prediction Section =====

const PredictionSection = ({ scrollTo }) => {
  const [smiles, setSmiles] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [activeTab, setActiveTab] = useState("prediction");

  const classDescriptions = {
    I: "High Solubility, High Permeability",
    II: "Low Solubility, High Permeability",
    III: "High Solubility, Low Permeability",
    IV: "Low Solubility, Low Permeability",
  };

  function safeFixed(v, digits = 3) {
    if (v === null || v === undefined) return "—";
    const n = Number(v);
    if (!Number.isFinite(n)) return String(v);
    return n.toFixed(digits);
  }

  const handlePredict = async (e) => {
    e.preventDefault();
    if (!smiles.trim()) {
      setErrorMsg("Please enter a SMILES string.");
      return;
    }

    setLoading(true);
    setErrorMsg("");
    setResult(null);

    try {
      // CRITICAL: Keep this API call identical to original
      const res = await axios.post(
        "http://localhost:8000/predict_logS",
        { smiles },
        { timeout: 20000 }
      );
      console.log("API response:", res.data);

      if (res.data?.error) {
        alert(res.data.error);
        setResult(null);
        return;
      }

      if (!res.data || typeof res.data !== "object") {
        throw new Error("Invalid response from server");
      }

      setResult(res.data);
      setActiveTab("results");
    } catch (err) {
      console.error("Prediction error:", err);
      const serverMsg = err?.response?.data?.error || err.message;
      setErrorMsg("Prediction failed: " + serverMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.section
      id="prediction-section"
      className="prediction-section"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        Interactive Prediction
      </motion.h2>

      <div className="prediction-container">
        {/* Tabs */}
        <div className="prediction-tabs">
          <button
            className={`tab-btn ${activeTab === "prediction" ? "active" : ""}`}
            onClick={() => setActiveTab("prediction")}
          >
            Input SMILES
          </button>
          {result && (
            <button className={`tab-btn ${activeTab === "results" ? "active" : ""}`} onClick={() => setActiveTab("results")}>
              Results
            </button>
          )}
          {result && (
            <button
              className={`tab-btn ${activeTab === "descriptors" ? "active" : ""}`}
              onClick={() => setActiveTab("descriptors")}
            >
              Descriptors
            </button>
          )}
        </div>

        {/* Prediction Input Tab */}
        {activeTab === "prediction" && (
          <motion.div className="tab-content" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
            <form onSubmit={handlePredict} className="prediction-form">
              <div className="form-group">
                <label htmlFor="smiles-input">Enter Molecular SMILES String</label>
                <input
                  id="smiles-input"
                  type="text"
                  placeholder="e.g., CCO (ethanol), c1ccccc1 (benzene), CC(=O)O (acetic acid)"
                  value={smiles}
                  onChange={(e) => setSmiles(e.target.value)}
                  className="smiles-input"
                />
              </div>

              <motion.button
                type="submit"
                className="submit-btn"
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {loading ? "Analyzing..." : "Predict BCS Class"}
              </motion.button>
            </form>

            {errorMsg && (
              <motion.div className="error-message" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                {errorMsg}
              </motion.div>
            )}

            {!result && !loading && (
              <div className="prediction-info">
                <p>Enter a valid SMILES string to receive BCS classification predictions with explainable AI insights.</p>
              </div>
            )}
          </motion.div>
        )}

        {/* Results Tab */}
        {result && activeTab === "results" && (
          <motion.div className="tab-content" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
            <div className="results-container">
              {/* BCS Class Result */}
              <motion.div className="result-card primary" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <h3>Predicted BCS Class</h3>
                <div className="predicted-class">
                  {Array.isArray(result.class) && result.class.length > 0
                    ? result.class
                        .map((c) => `${c} (${classDescriptions[c] ?? "No desc"})`)
                        .join(", ")
                    : result.cb_predicted_class ?? result.predicted_class ?? "Uncertain"}
                </div>
                <p className="class-explanation">{result.class_explanation ?? result.cb_predicted_class ?? "—"}</p>
              </motion.div>

              {/* Solubility Prediction */}
              <motion.div className="result-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <h3>Solubility Prediction (LogS)</h3>
                <div className="metric-big">{safeFixed(result.logS, 3)}</div>
                <p className="explanation">{result.logS_explanation ?? result.explanation ?? "—"}</p>
              </motion.div>

              {/* LogP */}
              <motion.div className="result-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <h3>Lipophilicity (LogP)</h3>
                <div className="metric-big">{safeFixed(result.logP, 3)}</div>
              </motion.div>

              {/* Top Descriptors */}
              {Array.isArray(result.cb_top_descriptors) && result.cb_top_descriptors.length > 0 && (
                <motion.div
                  className="result-card full-width"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <h3>Top Contributing Descriptors (SHAP)</h3>
                  <div className="descriptors-list">
                    {result.cb_top_descriptors.slice(0, 6).map((d, i) => (
                      <div key={i} className="descriptor-item">
                        <div className="descriptor-name">{d.name}</div>
                        <div className="descriptor-details">
                          <span className="descriptor-meaning">{d.meaning ?? ""}</span>
                          <span className="descriptor-value">Value: {safeFixed(d.value, 3)}</span>
                          <span className={`descriptor-contrib ${d.contribution > 0 ? "positive" : "negative"}`}>
                            Contribution: {safeFixed(d.contribution, 3)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Probability Distribution */}
              {result.cb_probabilities && (
                <motion.div
                  className="result-card full-width"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <h3>Class Probability Distribution</h3>
                  <div className="probability-bars">
                    {Object.entries(result.cb_probabilities).map(([cls, prob]) => (
                      <div key={cls} className="probability-bar">
                        <div className="prob-label">Class {cls}</div>
                        <div className="prob-container">
                          <motion.div
                            className={`prob-fill class-${cls}`}
                            initial={{ width: 0 }}
                            animate={{ width: `${prob * 100}%` }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                          />
                        </div>
                        <div className="prob-percent">{(prob * 100).toFixed(1)}%</div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}

        {/* Descriptors Tab */}
        {result && activeTab === "descriptors" && (
          <motion.div className="tab-content" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
            <div className="descriptors-section">
              <h3>Molecular Descriptors</h3>
              {result.Values && typeof result.Values === "object" ? (
                <div className="descriptor-table-wrapper">
                  <table className="descriptor-table">
                    <thead>
                      <tr>
                        <th>Descriptor</th>
                        <th>Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(result.Values).map(([k, v], idx) => (
                        <tr key={k} className={idx % 2 === 0 ? "even" : "odd"}>
                          <td className="desc-name">{k}</td>
                          <td className="desc-value">{safeFixed(v, 4)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p>No descriptor values available.</p>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </motion.section>
  );
};

const ContributionsSection = () => {
  const contributions = [
    {
      icon: "🔬",
      title: "Molecular Featurization",
      desc: "Advanced descriptor extraction using RDKit and ECFP fingerprints",
    },
    {
      icon: "📈",
      title: "Solubility Prediction",
      desc: "State-of-the-art LogS regression with LightGBM (R² = 0.851)",
    },
    {
      icon: "🎯",
      title: "BCS Classification",
      desc: "Multi-class classification with CatBoost for 4 drug classes",
    },
    {
      icon: "💡",
      title: "Explainable AI",
      desc: "SHAP-based feature importance for model interpretability",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.section
      className="contributions-section"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <motion.h2 variants={itemVariants}>Research Contributions</motion.h2>

      <div className="contributions-grid">
        {contributions.map((item, idx) => (
          <motion.div key={idx} className="contribution-card" variants={itemVariants} whileHover={{ y: -6 }}>
            <div className="contrib-icon">{item.icon}</div>
            <h4>{item.title}</h4>
            <p>{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

const FutureWorkSection = () => {
  const roadmap = [
    { phase: "Short Term", items: ["Larger BCS datasets", "Graph Neural Networks"] },
    { phase: "Medium Term", items: ["External validation", "ADMET integration"] },
    { phase: "Long Term", items: ["Improved visualization", "Cloud deployment", "Batch prediction"] },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.section
      className="future-section"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <motion.h2 variants={itemVariants}>Future Scope</motion.h2>

      <div className="roadmap">
        {roadmap.map((phase, idx) => (
          <motion.div key={idx} className="roadmap-phase" variants={itemVariants}>
            <div className="phase-title">{phase.phase}</div>
            <ul className="phase-items">
              {phase.items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

const FooterSection = () => {
  return (
    <footer className="footer-section">
      <div className="footer-content">
        <div className="footer-col">
          <h4>Publication</h4>
          <p>Automated BCS Drug Categorization Using Machine Learning: An Explainable AI Approach</p>
          <p className="publication-badge">✓ Accepted Conference Paper</p>
        </div>

        <div className="footer-col">
          <h4>Technology</h4>
          <ul>
            <li>React + Vite</li>
            <li>FastAPI + Python</li>
            <li>RDKit, LightGBM, CatBoost</li>
            <li>SHAP Explainability</li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Acknowledgments</h4>
          <ul>
            <li>PES University, Computer Science</li>
            <li>Research Team</li>
            <li>DrugBank & Pharma Specialist</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2026 Automated BCS Classification Research. All rights reserved.</p>
      </div>
    </footer>
  );
};

// ===== Main App =====

export default function App() {
  const predictionRef = null;

  const scrollToPrediction = () => {
    const element = document.getElementById("prediction-section");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.div className="app-wrapper" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <HeroSection onStartClick={scrollToPrediction} />
      <AboutSection />
      <BCSClassesSection />
      <PipelineSection />
      <TechStackSection />
      <PerformanceSection />
      <ModelComparisonSection />
      <PredictionSection scrollTo={scrollToPrediction} />
      <ContributionsSection />
      <FutureWorkSection />
      <FooterSection />
    </motion.div>
  );
}
