import React from 'react';
import { PipelineStageInfo } from '../../types';
import { X, CheckCircle, Clock, AlertTriangle, ShieldCheck, Cpu } from 'lucide-react';

interface StageDetailModalProps {
  stage: PipelineStageInfo | null;
  onClose: () => void;
}

export const StageDetailModal: React.FC<StageDetailModalProps> = ({ stage, onClose }) => {
  if (!stage) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-xl rounded-2xl bg-[#090d16] border border-cyan-500/40 p-6 shadow-[0_0_40px_rgba(0,240,255,0.2)]">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-wider">
                STAGE TELEMETRY INSPECTOR
              </div>
              <h3 className="text-xl font-bold text-white font-display">
                {stage.name}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Overview content */}
        <div className="py-4 space-y-4 text-xs font-mono">
          <p className="text-slate-300 font-sans leading-relaxed">
            {stage.description}
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
              <div className="text-slate-500 text-[10px]">STAGE STATUS</div>
              <div className="text-sm font-bold text-emerald-400 mt-0.5">{stage.status}</div>
            </div>

            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
              <div className="text-slate-500 text-[10px]">LATENCY</div>
              <div className="text-sm font-bold text-cyan-300 mt-0.5">{stage.latencyMs} ms</div>
            </div>

            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
              <div className="text-slate-500 text-[10px]">THROUGHPUT</div>
              <div className="text-sm font-bold text-slate-200 mt-0.5">{stage.details.throughput}</div>
            </div>

            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
              <div className="text-slate-500 text-[10px]">ERROR RATE</div>
              <div className="text-sm font-bold text-slate-200 mt-0.5">{stage.details.errorRate}</div>
            </div>

            {stage.confidence && (
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                <div className="text-slate-500 text-[10px]">CONFIDENCE</div>
                <div className="text-sm font-bold text-cyan-400 mt-0.5">{stage.confidence}%</div>
              </div>
            )}

            {stage.riskLevel && (
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                <div className="text-slate-500 text-[10px]">RISK LEVEL</div>
                <div className="text-sm font-bold text-emerald-400 mt-0.5">{stage.riskLevel}</div>
              </div>
            )}
          </div>

          {/* Subtasks executed */}
          <div className="pt-2">
            <div className="text-slate-400 text-[11px] font-bold mb-2 uppercase">
              ACTIVE SUBTASKS &amp; ENGINES:
            </div>
            <div className="space-y-1.5">
              {stage.details.subtasks.map((task, idx) => (
                <div key={idx} className="flex items-center gap-2 p-2 rounded bg-slate-900/60 border border-slate-800 text-slate-300">
                  <CheckCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>{task}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono font-bold transition-all"
          >
            CLOSE INSPECTOR
          </button>
        </div>

      </div>
    </div>
  );
};
