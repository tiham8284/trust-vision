import React from 'react';
import { AnalysisResult, ViewTab } from '../../types';
import { ScoreGauge } from '../common/ScoreGauge';
import { MetricBar } from '../common/MetricBar';
import { GlassCard } from '../common/GlassCard';
import { AttentionRiskMap } from './AttentionRiskMap';
import { RiskWaterfallChart } from './RiskWaterfallChart';
import { printAnalysisReport } from '../../services/reportGenerator';
import { 
  ShieldCheck, 
  AlertTriangle, 
  ShieldAlert, 
  FileText, 
  RotateCcw, 
  Flame, 
  ExternalLink, 
  CheckCircle2, 
  Info, 
  Crosshair, 
  HelpCircle,
  Sparkles,
  Printer
} from 'lucide-react';

interface AnalysisResultViewProps {
  result: AnalysisResult;
  onReset: () => void;
  onNavigateTab: (tab: ViewTab) => void;
}

export const AnalysisResultView: React.FC<AnalysisResultViewProps> = ({
  result,
  onReset,
  onNavigateTab
}) => {
  const isTrusted = result.metrics.status === 'TRUSTED';
  const isCaution = result.metrics.status === 'CAUTION';

  const statusBg = isTrusted
    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
    : isCaution
    ? 'bg-amber-500/10 border-amber-500/30 text-amber-400'
    : 'bg-rose-500/10 border-rose-500/30 text-rose-400';

  const actionBg = result.recommendation.action === 'PROCEED'
    ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300'
    : result.recommendation.action === 'REVIEW'
    ? 'bg-amber-950/60 border-amber-500/40 text-amber-300'
    : 'bg-rose-950/60 border-rose-500/40 text-rose-300';

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Top Banner with Trust Score & Main Directives */}
      <GlassCard className="p-6 md:p-8 border-cyan-500/30" glow>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left: Animated Score Gauge */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center p-4 bg-slate-950/60 rounded-2xl border border-slate-800">
            <ScoreGauge
              score={result.metrics.trustScore}
              status={result.metrics.status}
              size={190}
            />
            <div className="text-center mt-3">
              <span className="text-xs font-mono text-slate-400 font-bold uppercase tracking-wider block">
                TRUSTVISION INTEGRITY SCORE
              </span>
              <span className="text-[11px] text-slate-500">
                Deterministic 6-Vector Calculation
              </span>
            </div>
          </div>

          {/* Right: Policy Decision & Key Findings Summary */}
          <div className="lg:col-span-8 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold uppercase border ${statusBg}`}>
                    STATUS: {result.metrics.status.replace('_', ' ')}
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    ID: <strong className="text-slate-200">{result.id}</strong>
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => printAnalysisReport(result)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-600 transition-all hover:border-cyan-400"
                    title="Export Printable PDF Security Certificate"
                  >
                    <Printer className="w-3.5 h-3.5 text-cyan-400" />
                    <span>EXPORT REPORT</span>
                  </button>

                  <button
                    onClick={onReset}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 transition-all"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>ANALYZE NEW</span>
                  </button>
                </div>
              </div>

              <h2 className="text-2xl font-black text-white font-display">
                {result.recommendation.summary}
              </h2>
              <p className="text-xs font-mono text-slate-400 mt-1">
                Target: <span className="text-cyan-300 font-semibold">{result.imageName}</span> &bull; Processed in {result.processingTimeMs}ms
              </p>
            </div>

            {/* Recommendation Box */}
            <div className={`p-4 rounded-xl border ${actionBg}`}>
              <div className="flex items-center gap-2 font-mono text-xs font-bold mb-2 uppercase">
                {isTrusted ? <ShieldCheck className="w-4 h-4" /> : isCaution ? <AlertTriangle className="w-4 h-4" /> : <ShieldAlert className="w-4 h-4" />}
                RECOMMENDED ACTION: {result.recommendation.action}
              </div>
              <ul className="space-y-1 text-xs text-slate-300">
                {result.recommendation.details.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-cyan-400 mt-0.5">&bull;</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

        </div>
      </GlassCard>

      {/* 6 Submetrics Grid */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            INTEGRITY &amp; RISK SUB-METRICS
          </h3>
          <span className="text-[10px] font-mono text-slate-500">6 VECTOR DECOMPOSITION</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          
          <GlassCard className="p-4">
            <MetricBar
              label="Input Quality"
              value={result.metrics.imageQuality}
              type="positive"
              subtitle="Resolution, pixel SNR, and dynamic range integrity"
            />
          </GlassCard>

          <GlassCard className="p-4">
            <MetricBar
              label="Model Confidence"
              value={result.metrics.modelConfidence}
              type="positive"
              subtitle="Softmax class probability & logit separation"
            />
          </GlassCard>

          <GlassCard className="p-4">
            <MetricBar
              label="Visual Consistency"
              value={result.metrics.consistencyScore}
              type="positive"
              subtitle="Spatial crop invariance and multi-scale stability"
            />
          </GlassCard>

          <GlassCard className="p-4">
            <MetricBar
              label="Anomaly Risk"
              value={result.metrics.anomalyRisk}
              type="risk"
              subtitle="Out-of-distribution visual pattern indicators"
            />
          </GlassCard>

          <GlassCard className="p-4">
            <MetricBar
              label="Manipulation Risk"
              value={result.metrics.manipulationRisk}
              type="risk"
              subtitle="Error Level Analysis (ELA) & splicing boundaries"
            />
          </GlassCard>

          <GlassCard className="p-4">
            <MetricBar
              label="Adversarial Risk"
              value={result.metrics.adversarialRisk}
              type="risk"
              subtitle="High-frequency gradient perturbations & FGSM signature"
            />
          </GlassCard>

        </div>
      </div>

      {/* Two Column Layout: Attention Heatmap & Vision Model Detections */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Spatial Attention & Risk Map */}
        <div className="lg:col-span-7">
          <AttentionRiskMap result={result} />
        </div>

        {/* Right: Vision Model Output & Anchors */}
        <div className="lg:col-span-5">
          <GlassCard className="p-6 h-full flex flex-col justify-between border-cyan-500/30">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-200 flex items-center gap-2">
                  <Crosshair className="w-4 h-4 text-cyan-400" />
                  VISION MODEL OUTPUT
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950/80 text-cyan-300 border border-cyan-500/30">
                  SAMPLE MODEL OUTPUT
                </span>
              </div>

              <div className="mt-4 space-y-3">
                <div className="text-xs text-slate-400">
                  Detected Objects &amp; Inferred Anchors:
                </div>

                <div className="space-y-2.5">
                  {result.detections.map((det) => (
                    <div
                      key={det.id}
                      className={`
                        p-3 rounded-lg border text-xs font-mono flex items-center justify-between
                        ${det.anomalyFlag
                          ? 'bg-rose-950/30 border-rose-500/40 text-rose-300'
                          : 'bg-slate-900/60 border-slate-800 text-slate-200'}
                      `}
                    >
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${det.anomalyFlag ? 'bg-rose-500 animate-pulse' : 'bg-cyan-400'}`}></span>
                        <span className="font-bold">{det.label}</span>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="font-bold text-white">{det.confidence}%</span>
                        <span className={`text-[10px] px-2 py-0.5 rounded ${det.anomalyFlag ? 'bg-rose-500/20 text-rose-300' : 'bg-emerald-500/20 text-emerald-300'}`}>
                          {det.anomalyFlag ? 'ANOMALY' : 'PASS'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Link to Adversarial Lab */}
            <div className="pt-4 mt-6 border-t border-slate-800">
              <button
                onClick={() => onNavigateTab('threats')}
                className="w-full py-2.5 px-4 rounded-lg bg-slate-900 hover:bg-slate-800 border border-cyan-500/30 hover:border-cyan-400 text-xs font-mono font-bold text-cyan-300 flex items-center justify-center gap-2 transition-all"
              >
                <Flame className="w-3.5 h-3.5 text-rose-400" />
                TEST THIS IMAGE IN ADVERSARIAL LAB
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </GlassCard>
        </div>

      </div>

      {/* Explainability Section: WHY DID TRUSTVISION GIVE THIS SCORE? */}
      <GlassCard className="p-6 md:p-8 border-cyan-500/30">
        
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
              <HelpCircle className="w-4 h-4" />
              EXPLAINABILITY &amp; AUDIT RATIONALE
            </div>
            <h3 className="text-xl font-bold text-white font-display mt-0.5">
              Why Did TrustVision Give This Score?
            </h3>
          </div>
        </div>

        {/* Explainability Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 my-6">
          {result.riskFactors.map((factor, idx) => (
            <div
              key={idx}
              className={`p-3.5 rounded-xl border text-xs ${
                factor.status === 'passed'
                  ? 'bg-slate-900/50 border-emerald-500/30'
                  : factor.status === 'warning'
                  ? 'bg-amber-950/20 border-amber-500/30'
                  : 'bg-rose-950/20 border-rose-500/30'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-bold text-white font-mono flex items-center gap-1.5">
                  {factor.status === 'passed' && <span className="text-emerald-400">✓</span>}
                  {factor.status === 'warning' && <span className="text-amber-400">⚠</span>}
                  {factor.status === 'failed' && <span className="text-rose-400">✗</span>}
                  {factor.name}
                </span>
                <span className={`font-mono font-bold ${factor.impact >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {factor.impact >= 0 ? `+${factor.impact}` : factor.impact}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                {factor.description}
              </p>
            </div>
          ))}
        </div>

        {/* Waterfall Contribution Chart */}
        <div className="pt-4 border-t border-slate-800">
          <RiskWaterfallChart
            riskFactors={result.riskFactors}
            finalScore={result.metrics.trustScore}
          />
        </div>

        {/* Natural Language Key Findings */}
        <div className="mt-8 pt-6 border-t border-slate-800">
          <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 mb-3">
            KEY SYSTEM FINDINGS (NATURAL LANGUAGE SYNTHESIS)
          </h4>
          <div className="space-y-2">
            {result.keyFindings.map((finding, idx) => (
              <div key={idx} className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 text-xs text-slate-300 font-sans flex items-start gap-2.5">
                <span className="text-cyan-400 font-mono font-bold">&gt;</span>
                <span>{finding}</span>
              </div>
            ))}
          </div>
        </div>

      </GlassCard>

    </div>
  );
};
