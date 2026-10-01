export type TrustStatus = 'TRUSTED' | 'CAUTION' | 'HIGH_RISK';

export type DemoScenarioId = 'normal' | 'low_quality' | 'manipulated' | 'adversarial';

export interface Detection {
  id: string;
  label: string;
  confidence: number; // 0 to 100
  bbox?: [number, number, number, number]; // [x%, y%, width%, height%]
  color?: string;
  anomalyFlag?: boolean;
}

export interface RiskFactor {
  name: string;
  category: 'quality' | 'model' | 'anomaly' | 'manipulation' | 'adversarial' | 'consistency';
  impact: number; // positive or negative contribution
  status: 'passed' | 'warning' | 'failed';
  description: string;
}

export interface AnalysisMetrics {
  trustScore: number; // 0 to 100
  status: TrustStatus;
  imageQuality: number; // 0 to 100
  modelConfidence: number; // 0 to 100
  consistencyScore: number; // 0 to 100
  anomalyRisk: number; // 0 to 100 (lower is better)
  manipulationRisk: number; // 0 to 100 (lower is better)
  adversarialRisk: number; // 0 to 100 (lower is better)
}

export interface AnalysisResult {
  id: string;
  timestamp: string;
  imageName: string;
  imageUrl: string;
  scenarioId?: DemoScenarioId;
  metrics: AnalysisMetrics;
  detections: Detection[];
  riskFactors: RiskFactor[];
  keyFindings: string[];
  recommendation: {
    action: 'PROCEED' | 'REVIEW' | 'QUARANTINE';
    summary: string;
    details: string[];
  };
  attentionHeatmapUrl?: string;
  processingTimeMs: number;
}

export interface DemoScenario {
  id: DemoScenarioId;
  title: string;
  subtitle: string;
  imageUrl: string;
  badge: string;
  badgeColor: string;
  expectedTrustScore: number;
  expectedStatus: TrustStatus;
  metrics: AnalysisMetrics;
  detections: Detection[];
  keyFindings: string[];
  riskFactors: RiskFactor[];
  recommendation: {
    action: 'PROCEED' | 'REVIEW' | 'QUARANTINE';
    summary: string;
    details: string[];
  };
}

export interface PipelineStageInfo {
  id: string;
  name: string;
  description: string;
  status: 'Healthy' | 'Monitoring' | 'Alert' | 'Warning';
  latencyMs: number;
  confidence?: number;
  riskLevel?: 'Low' | 'Medium' | 'High';
  activeThreats?: number;
  details: {
    throughput: string;
    errorRate: string;
    subtasks: string[];
  };
}

export interface AnalysisHistoryItem {
  id: string;
  timestamp: string;
  imageName: string;
  imageUrl: string;
  trustScore: number;
  status: TrustStatus;
  riskLevel: 'Low' | 'Medium' | 'High';
  modelConfidence: number;
  actionTaken: 'PROCEED' | 'REVIEW' | 'QUARANTINE';
  scenarioId?: DemoScenarioId;
}

export type ViewTab = 'overview' | 'analysis' | 'pipeline' | 'threats' | 'explainability' | 'history' | 'about';
