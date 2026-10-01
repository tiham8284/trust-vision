import React, { useState } from 'react';
import { GlassCard } from '../common/GlassCard';
import { 
  Database, 
  Camera, 
  Cpu, 
  Brain, 
  ShieldCheck, 
  Gauge, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight,
  Sparkles,
  Info
} from 'lucide-react';

export const ArchitectureDiagram: React.FC = () => {
  const [activeNode, setActiveNode] = useState<string>('integrity');

  const nodesInfo: Record<string, { title: string; subtitle: string; details: string; status: string; latency: string }> = {
    source: {
      title: '1. Data Source & Camera Feed',
      subtitle: 'Edge sensor or video stream (RTSP/Webcam/File)',
      details: 'Ingests raw visual stream at native framerates (30/60 FPS). Performs initial frame header check and hardware timestamping.',
      status: 'Healthy',
      latency: '4 ms'
    },
    preprocessor: {
      title: '2. Preprocessing & Normalization',
      subtitle: 'Color space conversion, scaling, batching',
      details: 'Normalizes dynamic range [0, 1], adjusts resolution to standard inference tensors (640x640 / 1080p), extracts spatial frequency statistics.',
      status: 'Healthy',
      latency: '14 ms'
    },
    model: {
      title: '3. Core Vision Model',
      subtitle: 'Object detector / segmentation backbone',
      details: 'Standard neural network (e.g. YOLO / ResNet / ViT) generating candidate bounding boxes, class labels, and raw softmax logit distributions.',
      status: 'Active',
      latency: '118 ms'
    },
    integrity: {
      title: '4. TrustVision Integrity Layer',
      subtitle: '6-Vector AI Security & Validation Envelope',
      details: 'Simultaneously audits: (1) Input Validation (2) Anomaly Detection (3) Manipulation/ELA Analysis (4) Adversarial Risk Sweep (5) Softmax Entropy Stability (6) Explainability & Attribution.',
      status: 'Monitoring Sentinel',
      latency: '24 ms'
    },
    score: {
      title: '5. Deterministic Trust Score Engine',
      subtitle: 'Multi-vector weighted synthesis',
      details: 'Calculates trustScore = quality * 0.15 + confidence * 0.25 + consistency * 0.20 + (100 - anomaly) * 0.15 + (100 - manip) * 0.10 + (100 - adv) * 0.15. Clamps to [0, 100].',
      status: 'Verified',
      latency: '2 ms'
    },
    decision: {
      title: '6. Policy Decision & Automated Actuation',
      subtitle: 'PROCEED / REVIEW / QUARANTINE',
      details: 'Routes trusted visual inferences to downstream vehicle steering/planning, flags degraded frames for sensor fusion, or triggers emergency failsafe quarantine on adversarial attack.',
      status: 'Automated Failsafe',
      latency: '1 ms'
    }
  };

  return (
    <section className="py-12 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-xs font-mono text-cyan-300 uppercase tracking-widest mb-3">
            SYSTEM ARCHITECTURE
          </div>
          <h2 className="text-3xl font-extrabold text-white font-display tracking-tight">
            How TrustVision Wraps Vision Pipelines
          </h2>
          <p className="text-slate-400 text-sm mt-2">
            Click any node below to inspect its role, latency, and telemetry in the pipeline.
          </p>
        </div>

        {/* Interactive Architecture Flow Diagram */}
        <div className="space-y-6">
          
          {/* Pipeline Stage Blocks */}
          <div className="grid grid-cols-1 md:grid-cols-6 gap-3">
            
            {/* Step 1 */}
            <div 
              onClick={() => setActiveNode('source')}
              className={`
                p-4 rounded-xl cursor-pointer transition-all duration-300 border text-left
                ${activeNode === 'source' 
                  ? 'bg-cyan-950/40 border-cyan-400 shadow-[0_0_15px_rgba(0,240,255,0.2)]' 
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'}
              `}
            >
              <div className="w-8 h-8 rounded-lg bg-slate-800/80 flex items-center justify-center text-cyan-400 mb-2">
                <Camera className="w-4 h-4" />
              </div>
              <div className="text-[11px] font-mono text-cyan-400 font-semibold">STAGE 1</div>
              <div className="text-xs font-bold text-white mt-0.5">Data Source</div>
              <div className="text-[10px] text-slate-400 mt-1">Camera / Sensor</div>
            </div>

            {/* Step 2 */}
            <div 
              onClick={() => setActiveNode('preprocessor')}
              className={`
                p-4 rounded-xl cursor-pointer transition-all duration-300 border text-left
                ${activeNode === 'preprocessor' 
                  ? 'bg-cyan-950/40 border-cyan-400 shadow-[0_0_15px_rgba(0,240,255,0.2)]' 
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'}
              `}
            >
              <div className="w-8 h-8 rounded-lg bg-slate-800/80 flex items-center justify-center text-sky-400 mb-2">
                <Cpu className="w-4 h-4" />
              </div>
              <div className="text-[11px] font-mono text-sky-400 font-semibold">STAGE 2</div>
              <div className="text-xs font-bold text-white mt-0.5">Preprocessing</div>
              <div className="text-[10px] text-slate-400 mt-1">Normalization</div>
            </div>

            {/* Step 3 */}
            <div 
              onClick={() => setActiveNode('model')}
              className={`
                p-4 rounded-xl cursor-pointer transition-all duration-300 border text-left
                ${activeNode === 'model' 
                  ? 'bg-cyan-950/40 border-cyan-400 shadow-[0_0_15px_rgba(0,240,255,0.2)]' 
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'}
              `}
            >
              <div className="w-8 h-8 rounded-lg bg-slate-800/80 flex items-center justify-center text-indigo-400 mb-2">
                <Brain className="w-4 h-4" />
              </div>
              <div className="text-[11px] font-mono text-indigo-400 font-semibold">STAGE 3</div>
              <div className="text-xs font-bold text-white mt-0.5">Vision Model</div>
              <div className="text-[10px] text-slate-400 mt-1">Raw Inference</div>
            </div>

            {/* Step 4: TRUSTVISION LAYER (Highlighted) */}
            <div 
              onClick={() => setActiveNode('integrity')}
              className={`
                p-4 rounded-xl cursor-pointer transition-all duration-300 border text-left relative overflow-hidden
                ${activeNode === 'integrity' 
                  ? 'bg-gradient-to-br from-cyan-950/60 to-blue-950/60 border-cyan-400 shadow-[0_0_20px_rgba(0,240,255,0.3)] ring-1 ring-cyan-400' 
                  : 'bg-cyan-950/20 border-cyan-500/30 hover:border-cyan-400/60'}
              `}
            >
              <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300 mb-2">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div className="text-[11px] font-mono text-cyan-300 font-bold flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-cyan-400" />
                TRUSTVISION
              </div>
              <div className="text-xs font-black text-white mt-0.5">Integrity Layer</div>
              <div className="text-[10px] text-cyan-400/80 mt-1">6-Vector Audit</div>
            </div>

            {/* Step 5 */}
            <div 
              onClick={() => setActiveNode('score')}
              className={`
                p-4 rounded-xl cursor-pointer transition-all duration-300 border text-left
                ${activeNode === 'score' 
                  ? 'bg-cyan-950/40 border-cyan-400 shadow-[0_0_15px_rgba(0,240,255,0.2)]' 
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'}
              `}
            >
              <div className="w-8 h-8 rounded-lg bg-slate-800/80 flex items-center justify-center text-emerald-400 mb-2">
                <Gauge className="w-4 h-4" />
              </div>
              <div className="text-[11px] font-mono text-emerald-400 font-semibold">STAGE 5</div>
              <div className="text-xs font-bold text-white mt-0.5">Trust Score</div>
              <div className="text-[10px] text-slate-400 mt-1">0–100 Deterministic</div>
            </div>

            {/* Step 6 */}
            <div 
              onClick={() => setActiveNode('decision')}
              className={`
                p-4 rounded-xl cursor-pointer transition-all duration-300 border text-left
                ${activeNode === 'decision' 
                  ? 'bg-cyan-950/40 border-cyan-400 shadow-[0_0_15px_rgba(0,240,255,0.2)]' 
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'}
              `}
            >
              <div className="w-8 h-8 rounded-lg bg-slate-800/80 flex items-center justify-center text-amber-400 mb-2">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div className="text-[11px] font-mono text-amber-400 font-semibold">STAGE 6</div>
              <div className="text-xs font-bold text-white mt-0.5">Decision &amp; Alert</div>
              <div className="text-[10px] text-slate-400 mt-1">Proceed / Quarantine</div>
            </div>

          </div>

          {/* Detailed Inspector Card for Selected Node */}
          {activeNode && nodesInfo[activeNode] && (
            <GlassCard className="p-6 border-cyan-500/30" glow>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                <div>
                  <div className="text-xs font-mono text-cyan-400 font-semibold">STAGE INSPECTOR</div>
                  <h3 className="text-lg font-bold text-white font-display mt-0.5">
                    {nodesInfo[activeNode].title}
                  </h3>
                  <p className="text-xs text-slate-400">{nodesInfo[activeNode].subtitle}</p>
                </div>
                <div className="flex items-center gap-4 text-xs font-mono">
                  <div className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-300">
                    LATENCY: <strong className="text-cyan-300">{nodesInfo[activeNode].latency}</strong>
                  </div>
                  <div className="px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-semibold">
                    STATUS: {nodesInfo[activeNode].status}
                  </div>
                </div>
              </div>

              <div className="pt-4 text-sm text-slate-300 leading-relaxed">
                {nodesInfo[activeNode].details}
              </div>

              {activeNode === 'integrity' && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mt-4 pt-4 border-t border-slate-800/80">
                  <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 text-xs">
                    <span className="text-cyan-400 font-mono font-bold block">✓ Vector 1:</span>
                    <span className="text-slate-300 font-medium">Input Validation</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 text-xs">
                    <span className="text-cyan-400 font-mono font-bold block">✓ Vector 2:</span>
                    <span className="text-slate-300 font-medium">Anomaly Detection</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 text-xs">
                    <span className="text-cyan-400 font-mono font-bold block">✓ Vector 3:</span>
                    <span className="text-slate-300 font-medium">Manipulation / ELA</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 text-xs">
                    <span className="text-cyan-400 font-mono font-bold block">✓ Vector 4:</span>
                    <span className="text-slate-300 font-medium">Adversarial Risk Sweep</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 text-xs">
                    <span className="text-cyan-400 font-mono font-bold block">✓ Vector 5:</span>
                    <span className="text-slate-300 font-medium">Model Entropy Check</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 text-xs">
                    <span className="text-cyan-400 font-mono font-bold block">✓ Vector 6:</span>
                    <span className="text-slate-300 font-medium">Explainability Ledger</span>
                  </div>
                </div>
              )}
            </GlassCard>
          )}

        </div>

      </div>
    </section>
  );
};
