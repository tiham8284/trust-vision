import React, { useState } from 'react';
import { PipelineStageInfo } from '../../types';
import { GlassCard } from '../common/GlassCard';
import { StageDetailModal } from './StageDetailModal';
import { 
  Camera, 
  Cpu, 
  Brain, 
  Layers, 
  ShieldCheck, 
  CheckCircle, 
  ArrowRight, 
  Radio,
  Zap,
  Sparkles
} from 'lucide-react';

export const PIPELINE_STAGES: PipelineStageInfo[] = [
  {
    id: 'input',
    name: 'INPUT',
    description: 'Raw video frame capture and checksum validation from RTSP, file, or onboard edge cameras.',
    status: 'Healthy',
    latencyMs: 12,
    details: {
      throughput: '60.2 FPS',
      errorRate: '0.001%',
      subtasks: [
        'Buffer allocation & frame lock',
        'Hardware timestamp synchronization',
        'Payload dimension & channel header check'
      ]
    }
  },
  {
    id: 'preprocessor',
    name: 'PREPROCESSOR',
    description: 'Normalizes dynamic range [0, 1], adjusts color space (BGR to RGB), and scales input tensors.',
    status: 'Healthy',
    latencyMs: 18,
    details: {
      throughput: '58.9 FPS',
      errorRate: '0.000%',
      subtasks: [
        'Bilinear interpolation resizing (640x640)',
        'Mean & std deviation normalization',
        'Dynamic batching & GPU memory staging'
      ]
    }
  },
  {
    id: 'vision_model',
    name: 'VISION MODEL',
    description: 'Core neural network inference executing feature extraction and candidate anchor classification.',
    status: 'Healthy',
    latencyMs: 148,
    confidence: 91,
    details: {
      throughput: '42.1 FPS',
      errorRate: '0.012%',
      subtasks: [
        'Backbone feature pyramid network (FPN)',
        'Class probability & bounding box regression',
        'Non-maximum suppression (NMS) filtering'
      ]
    }
  },
  {
    id: 'post_processing',
    name: 'POST PROCESSING',
    description: 'Formats bounding box coordinates into world space and aggregates detection tracking IDs.',
    status: 'Healthy',
    latencyMs: 14,
    details: {
      throughput: '60.0 FPS',
      errorRate: '0.000%',
      subtasks: [
        'Kalman filter object tracking',
        'Spatial depth projection',
        'Multi-frame track association'
      ]
    }
  },
  {
    id: 'integrity_engine',
    name: 'INTEGRITY ENGINE',
    description: 'TrustVision security core: scans for anomalies, splicing, and adversarial perturbations.',
    status: 'Monitoring',
    latencyMs: 24,
    riskLevel: 'Low',
    activeThreats: 0,
    details: {
      throughput: '59.4 FPS',
      errorRate: '0.000%',
      subtasks: [
        'Error Level Analysis (ELA) compression scan',
        'Adversarial Fourier frequency decomposition',
        'Softmax entropy stability audit',
        'Deterministic Trust Score synthesis'
      ]
    }
  },
  {
    id: 'decision',
    name: 'DECISION',
    description: 'Automated policy enforcement: routes approved frames to vehicle control or alerts failsafe quarantine.',
    status: 'Healthy',
    latencyMs: 2,
    details: {
      throughput: '1000+ RPS',
      errorRate: '0.000%',
      subtasks: [
        'Policy threshold gate (>=80 Pass, 50-79 Review, <50 Quarantine)',
        'Downstream CAN-bus / ROS2 message dispatch',
        'Compliance telemetry ledger append'
      ]
    }
  }
];

export const PipelineFlow: React.FC = () => {
  const [selectedStage, setSelectedStage] = useState<PipelineStageInfo | null>(null);

  const stageIcons: Record<string, React.ReactNode> = {
    input: <Camera className="w-5 h-5 text-cyan-400" />,
    preprocessor: <Cpu className="w-5 h-5 text-sky-400" />,
    vision_model: <Brain className="w-5 h-5 text-indigo-400" />,
    post_processing: <Layers className="w-5 h-5 text-purple-400" />,
    integrity_engine: <ShieldCheck className="w-5 h-5 text-emerald-400" />,
    decision: <CheckCircle className="w-5 h-5 text-amber-400" />
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider mb-1">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            END-TO-END VISION PIPELINE MONITOR
          </div>
          <h3 className="text-xl font-bold text-white font-display">
            Interactive Architecture &amp; Latency Flow
          </h3>
        </div>
        <div className="text-xs font-mono text-slate-400">
          Click any stage card to inspect deep telemetry.
        </div>
      </div>

      {/* Flow Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
        {PIPELINE_STAGES.map((stage, idx) => {
          const isIntegrity = stage.id === 'integrity_engine';

          return (
            <div
              key={stage.id}
              onClick={() => setSelectedStage(stage)}
              className={`
                relative p-4 rounded-xl cursor-pointer transition-all duration-300 border flex flex-col justify-between
                ${isIntegrity
                  ? 'bg-gradient-to-br from-cyan-950/60 to-blue-950/60 border-cyan-400 shadow-[0_0_20px_rgba(0,240,255,0.25)] ring-1 ring-cyan-400 hover:shadow-[0_0_25px_rgba(0,240,255,0.4)]'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-800/40'}
              `}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-9 h-9 rounded-lg bg-slate-800/80 flex items-center justify-center">
                    {stageIcons[stage.id]}
                  </div>
                  <span className="text-[10px] font-mono font-bold text-slate-500">
                    0{idx + 1}
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold font-mono text-white">
                    {stage.name}
                  </span>
                  {isIntegrity && <Sparkles className="w-3 h-3 text-cyan-400" />}
                </div>

                <div className="mt-3 space-y-1.5 text-[11px] font-mono border-t border-slate-800/80 pt-2">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Status:</span>
                    <span className={`font-bold ${stage.status === 'Healthy' ? 'text-emerald-400' : 'text-cyan-300'}`}>
                      {stage.status}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Latency:</span>
                    <span className="text-slate-200 font-bold">{stage.latencyMs} ms</span>
                  </div>

                  {stage.confidence && (
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Confidence:</span>
                      <span className="text-cyan-300 font-bold">{stage.confidence}%</span>
                    </div>
                  )}

                  {stage.riskLevel && (
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Risk:</span>
                      <span className="text-emerald-400 font-bold">{stage.riskLevel}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-4 pt-2 border-t border-slate-800/60 text-[10px] font-mono text-cyan-400 hover:underline flex items-center justify-between">
                <span>INSPECT</span>
                <ArrowRight className="w-3 h-3" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Stage Detail Modal */}
      <StageDetailModal
        stage={selectedStage}
        onClose={() => setSelectedStage(null)}
      />

    </div>
  );
};
