import React from 'react';
import { GlassCard } from '../common/GlassCard';
import { 
  AlertOctagon, 
  Layers, 
  EyeOff, 
  Flame, 
  SlidersHorizontal, 
  ShieldCheck,
  Binary
} from 'lucide-react';

export const WhyTrustVision: React.FC = () => {
  const vulnerabilities = [
    {
      icon: <Layers className="w-5 h-5 text-rose-400" />,
      title: 'Manipulated Inputs',
      description: 'Digital splicing, clone-region pasting, and synthetic object insertions can mislead object detectors without human-visible cues.'
    },
    {
      icon: <Flame className="w-5 h-5 text-rose-400" />,
      title: 'Adversarial Perturbations',
      description: 'Subtle high-frequency noise patterns (e.g. FGSM/PGD attacks) cause state-of-the-art neural networks to misclassify critical road signs.'
    },
    {
      icon: <EyeOff className="w-5 h-5 text-amber-400" />,
      title: 'Unexpected Image Conditions',
      description: 'Severe weather, lens glare, sensor noise, and low SNR degrade vision model accuracy without alerting the downstream control loop.'
    },
    {
      icon: <AlertOctagon className="w-5 h-5 text-amber-400" />,
      title: 'Overconfident Model Failures',
      description: 'Standard softmax outputs frequently exhibit 90%+ confidence even on completely out-of-distribution or perturbed inputs.'
    },
    {
      icon: <Binary className="w-5 h-5 text-cyan-400" />,
      title: 'Data Integrity Degradation',
      description: 'Corrupted color channels, compression artifacts, and inconsistent frame headers go undetected in naive vision ingestion pipelines.'
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-emerald-400" />,
      title: 'The TrustVision Solution',
      description: 'An external integrity envelope that evaluates inputs before, during, and after inference, outputting an actionable Trust Score & rationale.'
    }
  ];

  return (
    <section className="py-12 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-xs font-mono text-cyan-300 uppercase tracking-widest mb-3">
            THE INTEGRITY PROBLEM
          </div>
          <h2 className="text-3xl font-extrabold text-white font-display tracking-tight">
            Why Vision Models Should Not Blindly Trust What They See
          </h2>
          <p className="text-slate-400 text-sm mt-3 leading-relaxed">
            Computer vision pipelines operate on raw pixels. When those pixels are compromised, poisoned, or degraded, automated systems make dangerous decisions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {vulnerabilities.map((item, idx) => (
            <GlassCard key={idx} className="p-6">
              <div className="w-10 h-10 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center mb-4">
                {item.icon}
              </div>
              <h3 className="text-base font-bold text-white mb-2">
                {item.title}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {item.description}
              </p>
            </GlassCard>
          ))}
        </div>

      </div>
    </section>
  );
};
