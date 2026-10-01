import React from 'react';
import { ViewTab } from '../../types';
import { ShieldCheck, ArrowRight, Play, CheckCircle2, ShieldAlert, Cpu, Sparkles, Radio } from 'lucide-react';
import { GlassCard } from '../common/GlassCard';

interface HeroSectionProps {
  onStartAnalysis: () => void;
  onViewPipeline: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onStartAnalysis,
  onViewPipeline
}) => {
  return (
    <section className="relative pt-6 pb-12 overflow-hidden">
      {/* Background Cyber Glow & Radial Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-cyan-500/10 via-blue-600/5 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute -top-10 right-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Team & Integrity Pill */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-xs text-cyan-300 font-mono shadow-[0_0_15px_rgba(0,240,255,0.15)]">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>BUILT BY <strong className="text-white font-extrabold tracking-wide">BOOM BOOM</strong></span>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/80 border border-slate-700/60 text-xs text-slate-300 font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            HACKATHON LIVE DEMO READY
          </div>
        </div>

        {/* Hero Heading */}
        <div className="text-center max-w-4xl mx-auto space-y-5">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight font-display text-white">
            TRUST<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500">VISION</span>
          </h1>

          <div className="text-xl sm:text-2xl font-semibold text-slate-200 tracking-tight">
            AI Integrity Assurance for Computer Vision Pipelines
          </div>

          <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            "Verify what your vision models see. Detect anomalies, manipulation, and adversarial risks before they become decisions."
          </p>

          {/* Action CTAs */}
          <div className="pt-3 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={onStartAnalysis}
              className="group relative inline-flex items-center gap-3 px-8 py-3.5 rounded-xl font-bold text-sm text-slate-950 bg-gradient-to-r from-cyan-400 via-cyan-300 to-sky-400 hover:from-cyan-300 hover:to-sky-300 shadow-[0_0_30px_rgba(0,240,255,0.4)] transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <Play className="w-4 h-4 fill-current text-slate-950" />
              <span>START LIVE ANALYSIS</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={onViewPipeline}
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-semibold text-sm text-slate-200 bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 hover:border-cyan-500/40 transition-all hover:text-cyan-300"
            >
              <Radio className="w-4 h-4 text-cyan-400" />
              <span>VIEW PIPELINE</span>
            </button>
          </div>
        </div>

        {/* Live System Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-14">
          
          <GlassCard className="p-5 border-cyan-500/20" glow>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                SYSTEM STATUS
              </span>
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
            </div>
            <div className="text-2xl font-black font-display text-emerald-400 flex items-center gap-1.5">
              <ShieldCheck className="w-6 h-6 text-emerald-400" />
              Operational
            </div>
            <div className="text-[11px] text-slate-500 font-mono mt-1">
              Active Sentinel &bull; All 6 engines online
            </div>
          </GlassCard>

          <GlassCard className="p-5 border-cyan-500/20">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                PIPELINE HEALTH
              </span>
              <Cpu className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-2xl font-black font-mono text-cyan-300">
              98.7%
            </div>
            <div className="text-[11px] text-slate-500 font-mono mt-1">
              Avg latency: 142ms &bull; 0 packet drops
            </div>
          </GlassCard>

          <GlassCard className="p-5 border-cyan-500/20">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                ANALYSES TODAY
              </span>
              <CheckCircle2 className="w-4 h-4 text-sky-400" />
            </div>
            <div className="text-2xl font-black font-mono text-slate-100">
              1,284
            </div>
            <div className="text-[11px] text-slate-500 font-mono mt-1">
              +14.2% volume vs 24h baseline
            </div>
          </GlassCard>

          <GlassCard className="p-5 border-rose-500/20">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                THREATS INTERCEPTED
              </span>
              <ShieldAlert className="w-4 h-4 text-rose-400" />
            </div>
            <div className="text-2xl font-black font-mono text-rose-400">
              17
            </div>
            <div className="text-[11px] text-slate-500 font-mono mt-1">
              12 Splicing &bull; 5 Adversarial attacks
            </div>
          </GlassCard>

        </div>

      </div>
    </section>
  );
};
