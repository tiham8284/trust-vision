import React from 'react';
import { X, Shield, Sparkles, Cpu, Code, CheckCircle, Terminal, Layers } from 'lucide-react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#090d16] border border-cyan-500/40 p-6 sm:p-8 shadow-[0_0_40px_rgba(0,240,255,0.25)] font-mono text-xs">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-400 shadow-[0_0_15px_rgba(0,240,255,0.3)]">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-black font-display text-white">TRUST<span className="text-cyan-400">VISION</span></span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/40">HACKATHON BUILD</span>
              </div>
              <p className="text-[11px] text-slate-400 font-sans">
                "See Clearly. Verify Confidently." &bull; An integrity layer for computer vision.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="py-5 space-y-6 font-sans">
          
          {/* Team BOOM BOOM Showcase */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-cyan-950/40 via-blue-950/40 to-slate-900 border border-cyan-500/30">
            <div className="flex items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-2 font-mono text-xs font-bold text-cyan-300">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                HACKATHON PROJECT CREATORS
              </div>
              <span className="text-xs font-mono font-black text-white px-2.5 py-1 rounded bg-slate-900 border border-slate-700">
                TEAM: BOOM BOOM
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Created for the AI &amp; Cybersecurity Hackathon to solve the critical "blind trust" vulnerability in modern computer-vision applications.
            </p>
          </div>

          {/* Product Overview */}
          <div className="space-y-2">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-200">
              CORE PHILOSOPHY
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Standard deep neural networks are brittle: they output confident predictions even when poisoned with adversarial perturbations, digital splicing, or degraded sensor SNR. TrustVision wraps vision backends with a 6-vector defensive envelope to verify image integrity before decisions are committed.
            </p>
          </div>

          {/* Python SDK Mock snippet */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-slate-300">
              <span className="font-bold flex items-center gap-1.5">
                <Code className="w-3.5 h-3.5 text-cyan-400" />
                PYTHON SDK INTEGRATION (PREVIEW)
              </span>
              <span className="text-[10px] text-cyan-400">pip install trustvision-sdk</span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-[11px] text-cyan-300 overflow-x-auto leading-relaxed">
              <span className="text-purple-400">import</span> trustvision <span className="text-purple-400">as</span> tv<br/><br/>
              <span className="text-slate-500"># Wrap your existing PyTorch/YOLO pipeline</span><br/>
              sentinel = tv.IntegritySentinel(api_key=<span className="text-emerald-300">"tv_live_sec_..."</span>)<br/><br/>
              result = sentinel.verify_frame(image_buffer=<span className="text-emerald-300">"frame_01.jpg"</span>)<br/>
              <span className="text-purple-400">if</span> result.trust_score &gt;= <span className="text-amber-300">80</span>:<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;autonomous_planner.execute(result.verified_inferences)<br/>
              <span className="text-purple-400">else</span>:<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;emergency_system.trigger_safe_stop(reason=result.key_findings)
            </div>
          </div>

          {/* Compliance & Honesty note */}
          <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 text-[11px] text-slate-400 space-y-1 font-mono">
            <span className="text-cyan-400 font-bold block">AUDIT COMPLIANCE STATEMENT:</span>
            <span>All demo visualizations, heatmaps, and adversarial test scenarios are deterministic client-side simulations crafted for live hackathon demonstration.</span>
          </div>

        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-slate-800 flex justify-between items-center text-xs font-mono text-slate-500">
          <div>Built by <span className="text-cyan-400 font-bold">BOOM BOOM</span></div>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-bold transition-all"
          >
            CLOSE
          </button>
        </div>

      </div>
    </div>
  );
};
