import { AnalysisHistoryItem, AnalysisResult } from '../types';
import { DEMO_IMAGES } from './demoImages';

const STORAGE_KEY = 'trustvision_analysis_history';

export const INITIAL_HISTORY: AnalysisHistoryItem[] = [
  {
    id: 'TV-1048',
    timestamp: '12:42 PM',
    imageName: 'vehicle_urban_feed.jpg',
    imageUrl: DEMO_IMAGES.normal,
    trustScore: 94,
    status: 'TRUSTED',
    riskLevel: 'Low',
    modelConfidence: 96,
    actionTaken: 'PROCEED',
    scenarioId: 'normal'
  },
  {
    id: 'TV-1047',
    timestamp: '12:36 PM',
    imageName: 'road_scene_rainy.png',
    imageUrl: DEMO_IMAGES.low_quality,
    trustScore: 68,
    status: 'CAUTION',
    riskLevel: 'Medium',
    modelConfidence: 74,
    actionTaken: 'REVIEW',
    scenarioId: 'low_quality'
  },
  {
    id: 'TV-1046',
    timestamp: '12:31 PM',
    imageName: 'junction_spliced_cam2.jpg',
    imageUrl: DEMO_IMAGES.manipulated,
    trustScore: 48,
    status: 'HIGH_RISK',
    riskLevel: 'High',
    modelConfidence: 62,
    actionTaken: 'QUARANTINE',
    scenarioId: 'manipulated'
  },
  {
    id: 'TV-1045',
    timestamp: '12:15 PM',
    imageName: 'stop_sign_adversarial_test.png',
    imageUrl: DEMO_IMAGES.adversarial,
    trustScore: 31,
    status: 'HIGH_RISK',
    riskLevel: 'High',
    modelConfidence: 43,
    actionTaken: 'QUARANTINE',
    scenarioId: 'adversarial'
  },
  {
    id: 'TV-1044',
    timestamp: '11:58 AM',
    imageName: 'surveillance_gate_east.jpg',
    imageUrl: DEMO_IMAGES.normal,
    trustScore: 92,
    status: 'TRUSTED',
    riskLevel: 'Low',
    modelConfidence: 94,
    actionTaken: 'PROCEED',
    scenarioId: 'normal'
  }
];

export function getHistory(): AnalysisHistoryItem[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_HISTORY));
      return INITIAL_HISTORY;
    }
    return JSON.parse(data);
  } catch {
    return INITIAL_HISTORY;
  }
}

export function saveAnalysisToHistory(result: AnalysisResult): void {
  try {
    const history = getHistory();
    const newItem: AnalysisHistoryItem = {
      id: result.id,
      timestamp: result.timestamp,
      imageName: result.imageName,
      imageUrl: result.imageUrl,
      trustScore: result.metrics.trustScore,
      status: result.metrics.status,
      riskLevel: result.metrics.status === 'TRUSTED' ? 'Low' : result.metrics.status === 'CAUTION' ? 'Medium' : 'High',
      modelConfidence: result.metrics.modelConfidence,
      actionTaken: result.recommendation.action,
      scenarioId: result.scenarioId
    };

    // Prepend and keep last 50 items
    const updated = [newItem, ...history.filter(h => h.id !== result.id)].slice(0, 50);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to save to history:', err);
  }
}

export function clearHistory(): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_HISTORY));
}

export function deleteHistoryItem(id: string): AnalysisHistoryItem[] {
  const history = getHistory().filter(h => h.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  return history;
}
