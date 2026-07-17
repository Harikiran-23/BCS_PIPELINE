# Automated BCS Drug Categorization Using Machine Learning

## Overview

The Biopharmaceutics Classification System (BCS) is an internationally accepted framework for categorizing drug molecules based on two critical pharmaceutical properties:

- Aqueous Solubility
- Intestinal Permeability

Accurate BCS classification plays an important role in pharmaceutical formulation, regulatory approval, bioavailability assessment, and early-stage drug discovery.

Traditional laboratory methods for determining BCS classes require significant time, cost, and experimental resources. This project presents an automated machine learning pipeline capable of predicting the BCS class directly from a molecular SMILES representation.

---

# Research Highlights

✓ Accepted Conference Publication

✓ End-to-End Machine Learning Pipeline

✓ Explainable Artificial Intelligence (XAI)

✓ Interactive Web Platform

✓ Real-Time Drug Classification

---

# Objectives

The project was developed with the following objectives:

- Predict aqueous solubility (LogS) from molecular descriptors.
- Generate molecular fingerprints using RDKit.
- Perform automated BCS classification.
- Compare multiple machine learning algorithms.
- Provide interpretable predictions using Explainable AI.
- Deliver an interactive web application for researchers.

---

# Methodology

The prediction pipeline follows six sequential stages.

## Step 1

User enters a molecular SMILES string.

↓

## Step 2

RDKit extracts

- Molecular Descriptors
- Physicochemical Features
- ECFP4 Fingerprints

↓

## Step 3

LightGBM predicts aqueous solubility (LogS).

↓

## Step 4

The predicted LogS together with molecular descriptors are passed to the BCS classification model.

↓

## Step 5

CatBoost predicts the most probable BCS class.

↓

## Step 6

SHAP Explainable AI generates feature-level explanations showing why the prediction was made.

---

# Technology Stack

Frontend

- React
- HTML5
- CSS3

Backend

- FastAPI

Machine Learning

- LightGBM
- CatBoost
- XGBoost
- Random Forest

Cheminformatics

- RDKit

Explainability

- SHAP

Deployment

- REST API

---

# Dataset

Two datasets were used.

## Solubility Dataset

Source:
DrugBank

Size:
9,943 molecules

Purpose:
Training the LogS prediction model.

---

## BCS Dataset

Source:
Pharma Specialist

Size:
390 drugs

Purpose:
Training the BCS classifier.

---

# Machine Learning Pipeline

The application combines regression and classification.

SMILES

↓

Descriptor Extraction

↓

LogS Prediction (LightGBM)

↓

Feature Combination

↓

BCS Classification (CatBoost)

↓

SHAP Explanation

---

# Model Comparison

## LogS Prediction

| Model | Performance |
|--------|-------------|
| Graph Convolution Network | R² = 0.710 |
| LightGBM | R² = 0.851 |
| Ensemble | R² = 0.762 |

Best Model:
LightGBM

---

## BCS Classification

Compared Models

- Random Forest
- XGBoost
- CatBoost

Final Selected Model

CatBoost

Reason

- Highest overall performance
- Stable cross-validation
- Best ROC behaviour
- Better generalization

---

# Performance Summary

## LogS Prediction

R² Score

0.851

---

## CatBoost Classification

Subset Accuracy

0.333

Macro F1

0.379

Micro ROC-AUC

0.749

Cross Validation

0.378 ± 0.013

---

# Explainable AI

Unlike conventional black-box prediction systems, this application provides transparent reasoning behind every prediction.

The system explains:

- Important molecular descriptors
- Positive feature contributions
- Negative feature contributions
- Solubility influencing properties
- Descriptor importance ranking

This enables researchers to understand why a drug belongs to a specific BCS class.

---

# Molecular Descriptors Used

The application computes important descriptors including:

- Molecular Weight
- TPSA
- MolLogP
- MolMR
- LabuteASA
- Hydrogen Bond Donors
- Hydrogen Bond Acceptors
- Rotatable Bonds
- Ring Count
- FractionCSP3
- BertzCT
- BalabanJ
- IPC
- QED

along with 1024-bit ECFP4 fingerprints.

---

# Prediction Workflow

Input

SMILES

↓

Descriptor Generation

↓

LogS Prediction

↓

BCS Classification

↓

SHAP Explanation

↓

Interactive Results

---

# Research Contributions

This work contributes an integrated platform that combines

- Molecular featurization
- Solubility prediction
- Automated BCS classification
- Explainable AI
- Interactive visualization

within a single web application.

---

# Applications

The system can assist in

- Early Drug Discovery
- Lead Optimization
- Pharmaceutical Research
- Drug Formulation
- Academic Research
- Educational Demonstrations

---

# Future Scope

Future improvements include

- Larger BCS datasets
- Graph Neural Networks
- External experimental validation
- ADMET integration
- Improved molecular visualization
- Cloud deployment
- Batch prediction support

---

# Publication

Automated BCS Drug Categorization Using Machine Learning:
An Explainable AI Approach for BCS Classification System

Accepted Conference Paper