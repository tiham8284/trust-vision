import React, { useState } from 'react';
import { GlassCard } from '../common/GlassCard';
import { ScoreGauge } from '../common/ScoreGauge';
import { getTrustStatus } from '../../services/trustVisionEngine';
import { Sliders, Sparkles, HelpCircle, RotateCcw, CheckCircle2, ShieldCheck, AlertTriangle } from 'lucide-react';

export const ScoringFormulaExplainer: React.FC = () => {
  // Sandbox inputs
  const [imageQuality, setImageQuality] = useState(90);
  const [modelConfidence, setModelConfidence] = useState(85);
  const [consistencyScore, setConsistencyScore] = useState(88);
  const [anomalyRisk, setAnomalyRisk] = useState(12);
  const [manipulationRisk, setManipulationRisk] = useState(8);
  const [adversarialRisk, setAdversarialRisk] = useState(10);

  // Weights (default)
  const [weights, setWeights] = useState({
    quality: 0.15,
    confidence: 0.25,
    consistency: 0.20,
    anomaly: 0.15,
    manipulation: 0.10,
    adversarial: 0.15
  });

  const computedScore = Math.round(
    Math.min(
      100,
      Math.max(
        0,
        imageQuality * weights.quality +
        modelConfidence * weights.confidence +
        consistencyScore * weights.consistency +
        (100 - anomalyRisk) * weights.anomaly +
        (100 - manipulationRisk) * weights.manipulation +
        (100 - adversarialRisk) * weights.adversarial
      )
    )
  );

  const status = getTrustStatus(computedScore);

  const handleResetDefaults = () => {
    setImageQuality(90);
    setModelConfidence(85);
    setConsistencyScore(88);
    setAnomalyRisk(12);
    setManipulationRisk(8);
    setAdversarialRisk(10);
    setWeights({
      quality: 0.15,
      confidence: 0.25,
      consistency: 0.20,
      anomaly: 0.15,
      manipulation: 0.10,
      adversarial: 0.15
    });
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-xs font-mono text-cyan-300 uppercase tracking-widest mb-2">
            <HelpCircle className="w-3.5 h-3.5" />
            EXPLAINABILITY ENGINE
          </div>
          <h2 className="text-3xl font-extrabold text-white font-display tracking-tight">
            Trust Score Formula &amp; Weight Tuning Sandbox
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            "Understand how the 6 visual integrity vectors synthesize into a deterministic Trust Score."
          </p>
        </div>

        <button
          onClick={handleResetDefaults}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-mono text-slate-300 transition-all self-start md:self-auto"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>RESET DEFAULTS</span>
        </button>
      </div>

      {/* Formula Specification Card */}
      <GlassCard className="p-6 border-cyan-500/30" glow>
        <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 mb-3">
          DETERMINISTIC TRUSTVISION FORMULA SPECIFICATION
        </h3>

        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-200 overflow-x-auto leading-relaxed">
          <span className="text-cyan-400 font-bold">trustScore</span> = <br className="sm:hidden" />
          (imageQuality &times; <span className="text-emerald-400">0.15</span>) + <br className="hidden sm:inline" />
          (modelConfidence &times; <span className="text-emerald-400">0.25</span>) + <br className="hidden sm:inline" />
          (consistencyScore &times; <span className="text-emerald-400">0.20</span>) + <br className="hidden sm:inline" />
          ((100 - anomalyRisk) &times; <span className="text-emerald-400">0.15</span>) + <br className="hidden sm:inline" />
          ((100 - manipulationRisk) &times; <span className="text-emerald-400">0.10</span>) + <br className="hidden sm:inline" />
          ((100 - adversarialRisk) &times; <span className="text-emerald-400">0.15</span>)
        </div>

        <p className="text-xs text-slate-400 mt-3 font-mono">
          &bull; Clamped between <strong className="text-white">0 and 100</strong>. Evaluates both raw sensor telemetry and adversarial robustness.
        </p>
      </GlassCard>

      {/* Interactive Sandbox Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Input Sliders */}
        <div className="lg:col-span-8 space-y-4">
          <GlassCard className="p-6 border-cyan-500/20">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white mb-4 flex items-center gap-2">
              <Sliders className="w-4 h-4 text-cyan-400" />
              INTERACTIVE TEST PARAMETERS
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 font-mono text-xs">
              
              {/* Image Quality */}
              <div className="space-y-1.5 p-3 rounded-lg bg-slate-900/60 border border-slate-800">
                <div className="flex justify-between text-slate-300">
                  <span>Image Quality (15%)</span>
                  <span className="text-cyan-300 font-bold">{imageQuality}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={imageQuality}
                  onChange={(e) => setImageQuality(Number(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
              </div>

              {/* Model Confidence */}
              <div className="space-y-1.5 p-3 rounded-lg bg-slate-900/60 border border-slate-800">
                <div className="flex justify-between text-slate-300">
                  <span>Model Confidence (25%)</span>
                  <span className="text-cyan-300 font-bold">{modelConfidence}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={modelConfidence}
                  onChange={(e) => setModelConfidence(Number(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
              </div>

              {/* Consistency */}
              <div className="space-y-1.5 p-3 rounded-lg bg-slate-900/60 border border-slate-800">
                <div className="flex justify-between text-slate-300">
                  <span>Visual Consistency (20%)</span>
                  <span className="text-cyan-300 font-bold">{consistencyScore}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={consistencyScore}
                  onChange={(e) => setConsistencyScore(Number(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
              </div>

              {/* Anomaly Risk */}
              <div className="space-y-1.5 p-3 rounded-lg bg-slate-900/60 border border-slate-800">
                <div className="flex justify-between text-slate-300">
                  <span>Anomaly Risk (15%)</span>
                  <span className="text-rose-400 font-bold">{anomalyRisk}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={anomalyRisk}
                  onChange={(e) => setAnomalyRisk(Number(e.target.value))}
                  className="w-full accent-rose-400 cursor-pointer"
                />
              </div>

              {/* Manipulation Risk */}
              <div className="space-y-1.5 p-3 rounded-lg bg-slate-900/60 border border-slate-800">
                <div className="flex justify-between text-slate-300">
                  <span>Manipulation Risk (10%)</span>
                  <span className="text-rose-400 font-bold">{manipulationRisk}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={manipulationRisk}
                  onChange={(e) => setManipulationRisk(Number(e.target.value))}
                  className="w-full accent-rose-400 cursor-pointer"
                />
              </div>

              {/* Adversarial Risk */}
              <div className="space-y-1.5 p-3 rounded-lg bg-slate-900/60 border border-slate-800">
                <div className="flex justify-between text-slate-300">
                  <span>Adversarial Risk (15%)</span>
                  <span className="text-rose-400 font-bold">{adversarialRisk}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={adversarialRisk}
                  onChange={(e) => setAdversarialRisk(Number(e.target.value))}
                  className="w-full accent-rose-400 cursor-pointer"
                />
              </div>

            </div>
          </GlassCard>
        </div>

        {/* Right: Live Recalculated Score Gauge */}
        <div className="lg:col-span-4">
          <GlassCard className="p-6 border-cyan-500/30 flex flex-col items-center justify-center text-center" glow>
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 mb-4">
              LIVE SYNTHESIZED SCORE
            </div>

            <ScoreGauge
              score={computedScore}
              status={status}
              size={180}
              animate={false}
            />

            <div className="mt-4 pt-4 border-t border-slate-800 w-full space-y-2 text-xs font-mono text-left">
              <div className="flex justify-between">
                <span className="text-slate-400">Computed Output:</span>
                <span className="text-white font-bold">{computedScore}/100</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Enforced Status:</span>
                <span className={`font-bold ${status === 'TRUSTED' ? 'text-emerald-400' : status === 'CAUTION' ? 'text-amber-400' : 'text-rose-400'}`}>
                  {status}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Policy Directive:</span>
                <span className="text-cyan-300 font-bold">
                  {status === 'TRUSTED' ? 'PROCEED' : status === 'CAUTION' ? 'REVIEW' : 'QUARANTINE'}
                </span>
              </div>
            </div>
          </GlassCard>
        </div>

      </div>

    </div>
  );
};
