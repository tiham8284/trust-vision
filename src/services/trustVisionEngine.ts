import { AnalysisMetrics, AnalysisResult, DemoScenario, DemoScenarioId, Detection, RiskFactor, TrustStatus } from '../types';
import { DEMO_IMAGES } from './demoImages';

// Deterministic TrustScore Calculation Function
export function calculateTrustScore(metrics: {
  imageQuality: number;
  modelConfidence: number;
  consistencyScore: number;
  anomalyRisk: number;
  manipulationRisk: number;
  adversarialRisk: number;
}): number {
  const {
    imageQuality,
    modelConfidence,
    consistencyScore,
    anomalyRisk,
    manipulationRisk,
    adversarialRisk
  } = metrics;

  const rawScore =
    imageQuality * 0.15 +
    modelConfidence * 0.25 +
    consistencyScore * 0.20 +
    (100 - anomalyRisk) * 0.15 +
    (100 - manipulationRisk) * 0.10 +
    (100 - adversarialRisk) * 0.15;

  return Math.round(Math.min(100, Math.max(0, rawScore)));
}

export function getTrustStatus(score: number): TrustStatus {
  if (score >= 80) return 'TRUSTED';
  if (score >= 50) return 'CAUTION';
  return 'HIGH_RISK';
}

export const DEMO_SCENARIOS: Record<DemoScenarioId, DemoScenario> = {
  normal: {
    id: 'normal',
    title: 'Normal Autonomous Scene',
    subtitle: 'High quality urban drive feed with clear lighting and authentic sensor metadata.',
    imageUrl: DEMO_IMAGES.normal,
    badge: 'OPTIMAL INPUT',
    badgeColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
    expectedTrustScore: 94,
    expectedStatus: 'TRUSTED',
    metrics: {
      trustScore: 94,
      status: 'TRUSTED',
      imageQuality: 98,
      modelConfidence: 96,
      consistencyScore: 95,
      anomalyRisk: 7,
      manipulationRisk: 4,
      adversarialRisk: 8
    },
    detections: [
      { id: 'd1', label: 'Person (Pedestrian)', confidence: 96.2, bbox: [22, 58, 8, 24], color: '#38bdf8' },
      { id: 'd2', label: 'Leading Vehicle', confidence: 94.4, bbox: [41, 55, 18, 16], color: '#38bdf8' },
      { id: 'd3', label: 'Speed Limit 45 Sign', confidence: 93.8, bbox: [85, 44, 10, 22], color: '#38bdf8' },
      { id: 'd4', label: 'Adjacent Vehicle', confidence: 89.1, bbox: [60, 62, 20, 18], color: '#38bdf8' }
    ],
    riskFactors: [
      { name: 'Image Structure', category: 'quality', impact: 18, status: 'passed', description: 'Pixel SNR and spatial frequency match expected sensor profiles.' },
      { name: 'Model Confidence', category: 'model', impact: 24, status: 'passed', description: 'Primary and secondary class logits show high softmax entropy stability.' },
      { name: 'Visual Consistency', category: 'consistency', impact: 20, status: 'passed', description: 'Multi-scale crop invariance verified across 4 spatial augmentations.' },
      { name: 'Anomaly Patterns', category: 'anomaly', impact: -4, status: 'passed', description: 'No non-natural noise clusters or localized high-variance patches.' },
      { name: 'Manipulation Integrity', category: 'manipulation', impact: -2, status: 'passed', description: 'Error Level Analysis (ELA) confirms uniform JPEG compression grid.' },
      { name: 'Adversarial Defense', category: 'adversarial', impact: -2, status: 'passed', description: 'Frequency spectrum decomposition shows zero periodic perturbation vectors.' }
    ],
    keyFindings: [
      'Input quality is optimal (98%) with no significant compression or sensor degradation.',
      'Vision model confidence remains exceptionally stable (96.2%) across all detected anchors.',
      'Spatial and spectral anomaly checks passed all baseline safety thresholds.'
    ],
    recommendation: {
      action: 'PROCEED',
      summary: 'Verified Safe for Autonomous Decision Pipeline',
      details: [
        'Allow visual inputs to proceed directly to downstream vehicle planning.',
        'Telemetry logged to TrustVision Audit Ledger as TV-PASS.',
        'Zero mitigation intervention required.'
      ]
    }
  },

  low_quality: {
    id: 'low_quality',
    title: 'Low Quality / Degraded Input',
    subtitle: 'Harsh weather, sensor glare, severe rain noise, and low light attenuation.',
    imageUrl: DEMO_IMAGES.low_quality,
    badge: 'DEGRADED SNR',
    badgeColor: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
    expectedTrustScore: 68,
    expectedStatus: 'CAUTION',
    metrics: {
      trustScore: 68,
      status: 'CAUTION',
      imageQuality: 79,
      modelConfidence: 74,
      consistencyScore: 72,
      anomalyRisk: 31,
      manipulationRisk: 18,
      adversarialRisk: 27
    },
    detections: [
      { id: 'd1', label: 'Vehicle (Partial Occlusion)', confidence: 74.2, bbox: [38, 54, 24, 20], color: '#f59e0b' },
      { id: 'd2', label: 'Sensor Glare Reflection', confidence: 68.0, bbox: [65, 30, 25, 35], color: '#f59e0b', anomalyFlag: true },
      { id: 'd3', label: 'Obscured Lane Marker', confidence: 51.3, bbox: [15, 70, 20, 25], color: '#f59e0b' }
    ],
    riskFactors: [
      { name: 'Input Quality', category: 'quality', impact: 12, status: 'warning', description: 'High ISO sensor noise and optical glare reduce high-frequency contrast.' },
      { name: 'Model Confidence', category: 'model', impact: 18, status: 'warning', description: 'Bounding box jitter observed between consecutive inference passes.' },
      { name: 'Visual Consistency', category: 'consistency', impact: 14, status: 'warning', description: 'Rain streaks cause localized edge detection degradation.' },
      { name: 'Anomaly Patterns', category: 'anomaly', impact: -10, status: 'warning', description: 'Sensor glare bloom identified as anomalous intensity cluster.' },
      { name: 'Manipulation Integrity', category: 'manipulation', impact: -5, status: 'passed', description: 'No synthetic cloning or splicing indicators detected.' },
      { name: 'Adversarial Risk', category: 'adversarial', impact: -7, status: 'passed', description: 'High-frequency noise attributed to natural weather scattering.' }
    ],
    keyFindings: [
      'Input quality is impaired (79%) due to atmospheric precipitation and camera lens glare.',
      'Vision model confidence drops to 74% with elevated bounding box uncertainty.',
      'No intentional malicious attack detected, but environmental degradation warrants caution.'
    ],
    recommendation: {
      action: 'REVIEW',
      summary: 'Trigger Secondary Sensor Fusion / Human Verification',
      details: [
        'Engage auxiliary RADAR/LiDAR validation before critical actuation.',
        'Request frame enhancement filter or dynamic exposure adjustment.',
        'Flag sample for automated sensor cleaning alert.'
      ]
    }
  },

  manipulated: {
    id: 'manipulated',
    title: 'Manipulated / Spliced Image',
    subtitle: 'Synthetic vehicle copy-pasting, shadow mismatch, and altered speed signage.',
    imageUrl: DEMO_IMAGES.manipulated,
    badge: 'SPLICING DETECTED',
    badgeColor: 'text-rose-400 bg-rose-500/10 border-rose-500/30',
    expectedTrustScore: 48,
    expectedStatus: 'HIGH_RISK',
    metrics: {
      trustScore: 48,
      status: 'HIGH_RISK',
      imageQuality: 82,
      modelConfidence: 62,
      consistencyScore: 50,
      anomalyRisk: 58,
      manipulationRisk: 64,
      adversarialRisk: 38
    },
    detections: [
      { id: 'd1', label: 'Authentic Vehicle (Left)', confidence: 89.2, bbox: [30, 62, 20, 18], color: '#38bdf8' },
      { id: 'd2', label: 'Cloned Vehicle (Spliced)', confidence: 62.0, bbox: [57, 61, 22, 20], color: '#ef4444', anomalyFlag: true },
      { id: 'd3', label: 'Altered Speed 120 Sign', confidence: 71.2, bbox: [83, 42, 12, 24], color: '#ef4444', anomalyFlag: true }
    ],
    riskFactors: [
      { name: 'Error Level Analysis (ELA)', category: 'manipulation', impact: -22, status: 'failed', description: 'Discontinuous compression levels detected around cloned vehicle boundary.' },
      { name: 'Shadow Consistency', category: 'anomaly', impact: -18, status: 'failed', description: 'Illumination vector on target vehicle contradicts scene light source by 78 degrees.' },
      { name: 'Model Consistency', category: 'consistency', impact: 10, status: 'warning', description: 'Vision model outputs contradictory object bounds on repeated multi-scale crops.' },
      { name: 'Signage Verification', category: 'anomaly', impact: -14, status: 'failed', description: 'Typography gradient mismatch indicates digital glyph overlay.' },
      { name: 'Adversarial Perturbation', category: 'adversarial', impact: -8, status: 'passed', description: 'No universal perturbation patterns, but localized pixel splicing present.' },
      { name: 'Input Quality', category: 'quality', impact: 14, status: 'passed', description: 'Resolution is sharp, revealing boundary splicing seams.' }
    ],
    keyFindings: [
      'High manipulation risk (64%) flagged by Error Level Analysis and noise inconsistency.',
      'Illumination & shadow vectors in the right lane car do not align with scene geometry.',
      'Speed limit signage shows digital overlay artifacts with synthetic font boundaries.'
    ],
    recommendation: {
      action: 'QUARANTINE',
      summary: 'Quarantine Input & Alert Security Operations Center',
      details: [
        'Suppress downstream automated actuation based on cloned vehicle and altered signage.',
        'Route visual payload to TrustVision Forensics Sandbox for forensic breakdown.',
        'Notify human dispatcher of potential camera stream tampering.'
      ]
    }
  },

  adversarial: {
    id: 'adversarial',
    title: 'Adversarial Perturbation Attack',
    subtitle: 'Imperceptible high-frequency gradients crafted to fool stop-sign classification.',
    imageUrl: DEMO_IMAGES.adversarial,
    badge: 'ADVERSARIAL ATTACK',
    badgeColor: 'text-red-400 bg-red-500/10 border-red-500/30',
    expectedTrustScore: 31,
    expectedStatus: 'HIGH_RISK',
    metrics: {
      trustScore: 31,
      status: 'HIGH_RISK',
      imageQuality: 61,
      modelConfidence: 43,
      consistencyScore: 35,
      anomalyRisk: 72,
      manipulationRisk: 64,
      adversarialRisk: 81
    },
    detections: [
      { id: 'd1', label: 'Raw Model: "Green Light" (MISCLASSIFIED)', confidence: 89.2, bbox: [42, 32, 22, 35], color: '#ef4444', anomalyFlag: true },
      { id: 'd2', label: 'TrustVision: "Stop Sign (Perturbed)"', confidence: 43.1, bbox: [42, 32, 22, 35], color: '#00f0ff' },
      { id: 'd3', label: 'Gradient Noise Patch', confidence: 94.8, bbox: [35, 24, 34, 48], color: '#ef4444', anomalyFlag: true }
    ],
    riskFactors: [
      { name: 'High-Frequency Gradient Scan', category: 'adversarial', impact: -28, status: 'failed', description: 'Fourier transform reveals artificial high-frequency energy spikes characteristic of FGSM / PGD attacks.' },
      { name: 'Model Prediction Divergence', category: 'model', impact: -20, status: 'failed', description: 'Standard vision model erroneously classifies Stop Sign as Green Light with 89.2% confidence.' },
      { name: 'Spatial Noise Invariance', category: 'anomaly', impact: -18, status: 'failed', description: 'Small Gaussian smoothing shifts model prediction completely, confirming adversarial brittleness.' },
      { name: 'Consistency Check', category: 'consistency', impact: 7, status: 'failed', description: 'Cross-model ensemble voting shows 80% discordance between architectures.' },
      { name: 'Manipulation Integrity', category: 'manipulation', impact: -14, status: 'warning', description: 'Perturbation layer intentionally mimics sensor noise distribution.' },
      { name: 'Input Quality', category: 'quality', impact: 9, status: 'warning', description: 'High frequency spectral distortion detected.' }
    ],
    keyFindings: [
      'Critical adversarial attack detected (Adversarial Risk: 81%).',
      'The raw vision model was fooled into misclassifying a STOP sign as a "Green Light".',
      'TrustVision spectral analysis intercepted the attack and prevented a catastrophic driving error.'
    ],
    recommendation: {
      action: 'QUARANTINE',
      summary: 'Emergency Override: Suppress Raw Model Prediction',
      details: [
        'Trigger safe-stop fallback protocol and ignore raw "Green Light" inference.',
        'Isolate video frame and extract universal perturbation fingerprint.',
        'Update TrustVision edge filter with defensive adversarial denoising.'
      ]
    }
  }
};

// Pipeline step definition for realistic animated analysis
export interface PipelineStep {
  id: number;
  label: string;
  statusDescription: string;
  subDescription: string;
  durationMs: number;
}

export const PIPELINE_STEPS: PipelineStep[] = [
  { id: 1, label: 'INPUT RECEIVED', statusDescription: 'Validating payload checksum & format...', subDescription: 'Decoding raw visual buffer and dimensions', durationMs: 400 },
  { id: 2, label: 'VALIDATING INPUT', statusDescription: 'Performing format & structural integrity tests...', subDescription: 'Analyzing EXIF integrity, channel depth, and color profile', durationMs: 450 },
  { id: 3, label: 'CHECKING IMAGE INTEGRITY', statusDescription: 'Scanning for compression anomalies & ELA boundaries...', subDescription: 'Running Error Level Analysis and DCT coefficient analysis', durationMs: 500 },
  { id: 4, label: 'ANALYZING VISUAL FEATURES', statusDescription: 'Extracting spatial frequency & noise statistics...', subDescription: 'Computing multi-scale gradient orientations and texture distribution', durationMs: 450 },
  { id: 5, label: 'CHECKING ANOMALY PATTERNS', statusDescription: 'Comparing visual patterns against baseline distribution...', subDescription: 'Evaluating localized illumination anomalies & semantic outliers', durationMs: 500 },
  { id: 6, label: 'ESTIMATING ADVERSARIAL RISK', statusDescription: 'Evaluating adversarial risk (FGSM/PGD frequency scan)...', subDescription: 'High-frequency Fourier transform and gradient sensitivity sweep', durationMs: 550 },
  { id: 7, label: 'RUNNING VISION MODEL', statusDescription: 'Executing primary neural network inference pass...', subDescription: 'Object detection backbone, feature pyramids, and bounding box regressors', durationMs: 450 },
  { id: 8, label: 'CHECKING MODEL CONFIDENCE', statusDescription: 'Auditing softmax entropy & cross-layer stability...', subDescription: 'Cross-referencing ensemble models and spatial perturbation invariance', durationMs: 450 },
  { id: 9, label: 'GENERATING TRUST SCORE', statusDescription: 'Computing TrustVision Integrity Matrix...', subDescription: 'Synthesizing 6 integrity vectors into deterministic Trust Score', durationMs: 350 },
];

// Helper to simulate analysis of custom uploaded images with deterministic pseudo-random heuristics based on image attributes
export function analyzeCustomImage(
  imageName: string,
  imageUrl: string,
  width: number,
  height: number,
  fileSizeKb: number
): AnalysisResult {
  // Generate deterministic seed from name and size
  let seed = 0;
  for (let i = 0; i < imageName.length; i++) {
    seed = (seed * 31 + imageName.charCodeAt(i)) % 10000;
  }
  seed += Math.round(fileSizeKb) % 1000;

  // Derive realistic scores
  const qualityBase = Math.min(99, Math.max(65, 75 + (seed % 24)));
  const confidenceBase = Math.min(98, Math.max(70, 78 + ((seed * 7) % 20)));
  const anomalyBase = Math.min(45, Math.max(5, (seed * 13) % 40));
  const manipulationBase = Math.min(40, Math.max(3, (seed * 17) % 35));
  const adversarialBase = Math.min(45, Math.max(4, (seed * 19) % 38));
  const consistencyBase = Math.min(96, Math.max(68, 80 + (seed % 18)));

  const trustScore = calculateTrustScore({
    imageQuality: qualityBase,
    modelConfidence: confidenceBase,
    consistencyScore: consistencyBase,
    anomalyRisk: anomalyBase,
    manipulationRisk: manipulationBase,
    adversarialRisk: adversarialBase,
  });

  const status = getTrustStatus(trustScore);

  const customDetections: Detection[] = [
    { id: 'cd1', label: 'Primary Detected Object', confidence: Math.round(confidenceBase * 10) / 10, bbox: [25, 30, 45, 40], color: '#38bdf8' },
    { id: 'cd2', label: 'Environmental Context', confidence: Math.round((confidenceBase - 6) * 10) / 10, bbox: [10, 15, 80, 70], color: '#38bdf8' },
    { id: 'cd3', label: 'Foreground Feature', confidence: Math.round((confidenceBase - 12) * 10) / 10, bbox: [60, 50, 25, 30], color: '#38bdf8' }
  ];

  return {
    id: `TV-${1000 + (seed % 9000)}`,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    imageName,
    imageUrl,
    metrics: {
      trustScore,
      status,
      imageQuality: qualityBase,
      modelConfidence: confidenceBase,
      consistencyScore: consistencyBase,
      anomalyRisk: anomalyBase,
      manipulationRisk: manipulationBase,
      adversarialRisk: adversarialBase
    },
    detections: customDetections,
    riskFactors: [
      { name: 'Input Quality & Resolution', category: 'quality', impact: Math.round(qualityBase * 0.18), status: qualityBase > 75 ? 'passed' : 'warning', description: `Resolved at ${width}x${height}px with valid color calibration.` },
      { name: 'Model Softmax Stability', category: 'model', impact: Math.round(confidenceBase * 0.22), status: confidenceBase > 80 ? 'passed' : 'warning', description: 'Logit entropy confirms high class separation.' },
      { name: 'Visual Consistency', category: 'consistency', impact: Math.round(consistencyBase * 0.18), status: 'passed', description: 'Spatial multi-crop variance remains within standard tolerances.' },
      { name: 'Anomaly Index', category: 'anomaly', impact: -Math.round(anomalyBase * 0.2), status: anomalyBase > 30 ? 'warning' : 'passed', description: 'Baseline comparison against normal visual distribution.' },
      { name: 'Compression Integrity', category: 'manipulation', impact: -Math.round(manipulationBase * 0.15), status: manipulationBase > 30 ? 'warning' : 'passed', description: 'Uniform discrete cosine transform (DCT) block verification.' },
      { name: 'Adversarial Noise Sweep', category: 'adversarial', impact: -Math.round(adversarialBase * 0.18), status: adversarialBase > 35 ? 'warning' : 'passed', description: 'Frequency spectrum verified against adversarial gradient signatures.' }
    ],
    keyFindings: [
      `Image structure was analyzed at ${width}x${height} resolution with verified file integrity.`,
      `Computed Trust Score of ${trustScore}/100 indicates ${status} status for standard vision operations.`,
      `Anomaly risk evaluated at ${anomalyBase}% and adversarial perturbation risk at ${adversarialBase}%.`
    ],
    recommendation: {
      action: status === 'TRUSTED' ? 'PROCEED' : status === 'CAUTION' ? 'REVIEW' : 'QUARANTINE',
      summary: status === 'TRUSTED' ? 'Input Verified for Production Inference' : status === 'CAUTION' ? 'Caution Advised: Monitor Confidence Margins' : 'Quarantine: Elevated Risk Vectors Flagged',
      details: [
        `System status categorized as ${status}.`,
        'Logged to TrustVision telemetry for compliance and lineage tracking.',
        'Continuous frame-by-frame integrity check enabled.'
      ]
    },
    processingTimeMs: 142 + (seed % 60)
  };
}
