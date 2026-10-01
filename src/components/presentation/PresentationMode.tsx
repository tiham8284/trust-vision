import React, { useState } from 'react';
import { DemoScenarioId } from '../../types';
import { DEMO_SCENARIOS, PIPELINE_STEPS } from '../../services/trustVisionEngine';
import { ScoreGauge } from '../common/ScoreGauge';
import { MetricBar } from '../common/MetricBar';
import { AttentionRiskMap } from '../live-analysis/AttentionRiskMap';
import { 
  X, 
  RotateCcw, 
  Sparkles, 
  ShieldCheck, 
  ShieldAlert, 
  AlertTriangle, 
  Play, 
  Flame, 
  Cpu, 
  Radio,
  CheckCircle2
} from 'lucide-react';

interface PresentationModeProps {
  onExit: () => void;
}

export const PresentationMode: React.FC<PresentationModeProps> = ({ onExit }) => {
  const [activeScenarioId, setActiveScenarioId] = useState<DemoScenarioId>('normal');
  const [isSimulating, setIsSimulating] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'heatmap' | 'adversarial'>('overview');
  const [adversarialStrength, setAdversarialStrength] = useState(60);

  const scenario = DEMO_SCENARIOS[activeScenarioId];

  const handleSelectScenario = (id: DemoScenarioId) => {
    setIsSimulating(true);
    setActiveScenarioId(id);
    setTimeout(() => {
      setIsSimulating(false);
    }, 600);
  };

  const handleResetDemo = () => {
    handleSelectScenario('normal');
    setAdversarialStrength(0);
    setActiveTab('overview');
  };

  // Convert scenario to an AnalysisResult format for AttentionRiskMap
  const resultData = {
    id: `TV-PRES-${activeScenarioId.toUpperCase()}`,
    timestamp: 'LIVE DEMO',
    imageName: `${scenario.title}.svg`,
    imageUrl: scenario.imageUrl,
    scenarioId: scenario.id,
    metrics: scenario.metrics,
    detections: scenario.detections,
    riskFactors: scenario.riskFactors,
    keyFindings: scenario.keyFindings,
    recommendation: scenario.recommendation,
    processingTimeMs: 142
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#030509] text-slate-100 overflow-y-auto antialiased p-4 sm:p-6 lg:p-8 flex flex-col justify-between cyber-grid-bg">
      
      {/* Top Presentation Bar */}
      <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-cyan-500/30">
        
        {/* Brand & Team */}
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/30 border border-cyan-400/50 flex items-center justify-center text-cyan-400 shadow-[0_0_20px_rgba(0,240,255,0.3)]">
            <ShieldCheck className="w-7 h-7" />
          </div>

          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-display text-white">
                TRUST<span className="text-cyan-400">VISION</span>
              </h1>
              <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-xs font-mono font-bold text-cyan-300">
                JUDGES LIVE PITCH
              </span>
            </div>
            <div className="text-xs text-slate-400 font-medium">
              AI Integrity Assurance for Computer Vision &bull; Built by <strong className="text-cyan-300">BOOM BOOM</strong>
            </div>
          </div>
        </div>

        {/* Status & Exit Controls */}
        <div className="flex items-center gap-3 self-start md:self-auto">
          <div className="px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs font-mono text-emerald-400 font-bold flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            SYSTEM OPERATIONAL
          </div>

          <button
            onClick={handleResetDemo}
            className="px-3.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-mono text-slate-300 flex items-center gap-1.5 transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>RESET DEMO</span>
          </button>

          <button
            onClick={onExit}
            className="px-4 py-1.5 rounded-lg bg-rose-950/60 hover:bg-rose-900 border border-rose-500/40 text-rose-300 text-xs font-mono font-bold flex items-center gap-1.5 transition-all"
          >
            <X className="w-4 h-4" />
            <span>EXIT FULLSCREEN</span>
          </button>
        </div>

      </div>

      {/* Main Pitch Dashboard */}
      <div className="w-full max-w-7xl mx-auto my-6 space-y-6">
        
        {/* 1-Click Scenario Quick Switcher for Judges */}
        <div className="p-3 rounded-2xl bg-slate-900/80 border border-cyan-500/30 flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs font-mono font-bold text-slate-300 flex items-center gap-2 pl-2">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>DEMONSTRATION SCENARIOS:</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {(Object.keys(DEMO_SCENARIOS) as DemoScenarioId[]).map((scKey) => {
              const sc = DEMO_SCENARIOS[scKey];
              const isSelected = activeScenarioId === scKey;

              return (
                <button
                  key={sc.id}
                  onClick={() => handleSelectScenario(sc.id)}
                  className={`
                    px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2
                    ${isSelected
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-[0_0_20px_rgba(0,240,255,0.4)] ring-1 ring-cyan-300'
                      : 'bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800'}
                  `}
                >
                  <span>{sc.title}</span>
                  <span className="text-[10px] opacity-80 font-normal">({sc.expectedTrustScore} pts)</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Left Column: Visual Input & Detection Anchor */}
          <div className="lg:col-span-6 space-y-4">
            <div className="p-5 rounded-2xl bg-slate-900/60 border border-cyan-500/20 backdrop-blur-md">
              
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs font-mono">
                <span className="text-slate-300 font-bold">
                  INPUT FEED: <span className="text-cyan-300">{scenario.title}</span>
                </span>
                <span className={`px-2.5 py-0.5 rounded border ${scenario.badgeColor} font-bold text-[10px]`}>
                  {scenario.badge}
                </span>
              </div>

              {/* Image Preview with HUD overlay */}
              <div className="relative mt-3 rounded-xl overflow-hidden bg-slate-950 border border-slate-800 aspect-video flex items-center justify-center">
                <img
                  src={scenario.imageUrl}
                  alt={scenario.title}
                  className="w-full h-full object-contain"
                />
                <div className="scan-line-overlay" />
                
                <div className="absolute top-2 left-2 px-2 py-1 rounded bg-slate-950/80 border border-slate-800 text-[10px] font-mono text-cyan-300">
                  TRUSTVISION SENTINEL // ACTIVE
                </div>
              </div>

              {/* Detected Objects List */}
              <div className="mt-4 pt-3 border-t border-slate-800 space-y-2">
                <div className="text-xs font-mono text-slate-400 font-bold uppercase">
                  RAW VISION MODEL CANDIDATES:
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {scenario.detections.slice(0, 4).map((d) => (
                    <div
                      key={d.id}
                      className={`p-2 rounded-lg border text-[11px] font-mono flex items-center justify-between ${
                        d.anomalyFlag ? 'bg-rose-950/30 border-rose-500/40 text-rose-300' : 'bg-slate-950 border-slate-800 text-slate-300'
                      }`}
                    >
                      <span className="truncate">{d.label}</span>
                      <span className="font-bold">{d.confidence}%</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Trust Score Gauge & Directives */}
          <div className="lg:col-span-6 space-y-4">
            <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900/80 via-slate-900/60 to-cyan-950/30 border border-cyan-500/40 backdrop-blur-md shadow-[0_0_30px_rgba(0,240,255,0.15)] flex flex-col justify-between">
              
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
                    INTEGRITY VERIFICATION ENGINE
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    STATUS: <strong className="text-white">{scenario.expectedStatus}</strong>
                  </span>
                </div>

                {/* Score Gauge & Summary */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6 my-4 p-4 bg-slate-950/60 rounded-xl border border-slate-800">
                  <ScoreGauge
                    score={scenario.expectedTrustScore}
                    status={scenario.expectedStatus}
                    size={160}
                    animate={true}
                  />

                  <div className="text-left space-y-2 max-w-xs">
                    <div className="text-sm font-bold text-white leading-tight">
                      {scenario.recommendation.summary}
                    </div>
                    <div className={`text-xs font-mono font-bold px-2.5 py-1 rounded inline-block uppercase ${
                      scenario.expectedStatus === 'TRUSTED' ? 'bg-emerald-500/20 text-emerald-300' : scenario.expectedStatus === 'CAUTION' ? 'bg-amber-500/20 text-amber-300' : 'bg-rose-500/20 text-rose-300'
                    }`}>
                      DECISION: {scenario.recommendation.action}
                    </div>
                  </div>
                </div>

                {/* Submetrics Bars */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <MetricBar label="Quality" value={scenario.metrics.imageQuality} type="positive" />
                  <MetricBar label="Confidence" value={scenario.metrics.modelConfidence} type="positive" />
                  <MetricBar label="Anomaly Risk" value={scenario.metrics.anomalyRisk} type="risk" />
                  <MetricBar label="Adversarial Risk" value={scenario.metrics.adversarialRisk} type="risk" />
                </div>
              </div>

              {/* Key Pitch Takeaway */}
              <div className="mt-4 pt-3 border-t border-slate-800/80 text-xs font-mono text-slate-300">
                <span className="text-cyan-400 font-bold block mb-1">&gt;&gt; PITCH TAKEAWAY:</span>
                <span className="italic text-slate-400">"{scenario.keyFindings[0]}"</span>
              </div>

            </div>
          </div>

        </div>

      </div>

      {/* Bottom Footer for Presentation */}
      <div className="w-full max-w-7xl mx-auto pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs font-mono text-slate-500">
        <div>
          TRUSTVISION &bull; AI Integrity Assurance for Computer Vision Pipelines
        </div>
        <div className="text-cyan-400 font-bold">
          TEAM BOOM BOOM &bull; HACKATHON LIVE DEMO
        </div>
      </div>

    </div>
  );
};
