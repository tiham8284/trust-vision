# TRUSTVISION — AI Integrity Assurance for Computer Vision Pipelines

> **"See Clearly. Verify Confidently."**  
> *An integrity layer for computer vision.*  
> **Team Name:** BOOM BOOM

---

## 🎯 Executive Summary & Problem Statement

Computer vision models in production (autonomous vehicles, smart surveillance, robotics, industrial inspection) suffer from a dangerous architectural vulnerability: **blind trust in raw visual inputs**.

When visual streams are degraded by harsh weather, corrupted by lens glare, digitally spliced, or manipulated by **high-frequency adversarial perturbations (FGSM / PGD attacks)**, standard neural networks frequently output 90%+ confidence on catastrophic misclassifications.

**TRUSTVISION** solves this by adding an external, model-agnostic **AI Integrity Assurance Layer** around the vision pipeline.

---

## 🔬 Core Pipeline Architecture

```
IMAGE / VIDEO INPUT
        ↓
INPUT VALIDATION
        ↓
IMAGE QUALITY ANALYSIS
        ↓
ANOMALY DETECTION
        ↓
MANIPULATION ANALYSIS (Error Level Analysis)
        ↓
ADVERSARIAL RISK ANALYSIS (Fourier Frequency Decomposition)
        ↓
VISION MODEL INFERENCE
        ↓
CONFIDENCE & CONSISTENCY CHECK
        ↓
TRUSTVISION INTEGRITY ENGINE
        ↓
TRUST SCORE (0–100) + EXPLANATIONS + POLICY ACTION (PROCEED / REVIEW / QUARANTINE)
```

---

## 🧮 Deterministic Trust Score Formula

TrustVision evaluates visual inputs across 6 distinct integrity vectors:

$$\text{TrustScore} = \text{ImageQuality} \times 0.15 + \text{ModelConfidence} \times 0.25 + \text{Consistency} \times 0.20 + (100 - \text{AnomalyRisk}) \times 0.15 + (100 - \text{ManipulationRisk}) \times 0.10 + (100 - \text{AdversarialRisk}) \times 0.15$$

### Policy Enforcement Gates:
- **80 – 100 [TRUSTED]:** Proceed directly to downstream actuation & vehicle trajectory planning.
- **50 – 79 [CAUTION]:** Engage secondary sensor fusion (RADAR/LiDAR) or human verification.
- **0 – 49 [HIGH RISK]:** Emergency safe-stop / quarantine; suppress raw neural network logits.

---

## 🚀 Key Features

1. **Live Vision Analysis:**
   - Drag & drop custom image support (JPG, PNG, WEBP) + 4 instant offline demo scenarios:
     1. *Normal Autonomous Scene* (Score: 94 — TRUSTED)
     2. *Low Quality / Weather Degraded* (Score: 68 — CAUTION)
     3. *Manipulated / Spliced Junction* (Score: 48 — HIGH RISK)
     4. *Adversarial Stop Sign Perturbation* (Score: 31 — HIGH RISK / QUARANTINED)
   - 3–5 second sequential animated pipeline simulation with real-time stage telemetry.
   - Animated Circular Trust Score Gauge & 6 submetric progress monitors.
   - Attention & Spatial Risk Map visualizer with interactive heatmap, difference scan, and split-view modes.
   - Score contribution waterfall breakdown chart & natural language findings.

2. **Adversarial Robustness Lab:**
   - Interactive slider (0% to 100%) stress-testing FGSM, PGD, Patch, and Spatial Jitter attacks.
   - Dynamic HTML5 canvas synthesizing live adversarial noise over image pixels.
   - Real-time robustness degradation curves comparing raw model failure vs TrustVision threat detection.

3. **Pipeline Telemetry Monitor:**
   - Interactive architecture flowchart (`INPUT` → `PREPROCESSOR` → `VISION MODEL` → `POST PROCESSING` → `INTEGRITY ENGINE` → `DECISION`).
   - Clickable node inspector modal displaying latency, throughput, error bounds, and subtasks.
   - 24-Hour activity charts, risk distribution donut chart, and live streaming ingestion log.

4. **Explainability & Weight Tuning Sandbox:**
   - Interactive weight and risk sliders enabling hackathon judges to test how Trust Scores react live.
   - Full Decision Matrix documenting automated policy triggers.

5. **Analysis Audit History & Export:**
   - LocalStorage persisted audit ledger.
   - One-click printable PDF security certificate and audit report generation.

6. **Presentation Mode:**
   - Fullscreen dashboard designed specifically for pitching to hackathon judges on a projector.

---

## 🛠️ Technology Stack

- **Framework:** React 18 + TypeScript + Vite
- **Styling:** Tailwind CSS (Cyber Dark Theme with glassmorphic cards and glows)
- **Icons:** Lucide React
- **Data Visualization:** Recharts
- **Image Processing:** HTML5 2D Canvas

---

## 📦 Getting Started

### Prerequisites:
- Node.js (v18+)
- npm

### Installation & Run:
```bash
# Install dependencies
npm install

# Start local dev server
npm run dev
```

Open `http://localhost:3000` in your browser.

---

## 👥 Hackathon Team

**Team Name:** BOOM BOOM  
**Project:** TRUSTVISION — AI Integrity Assurance for Computer Vision Pipelines  
*Built for the AI & Cybersecurity Hackathon.*
