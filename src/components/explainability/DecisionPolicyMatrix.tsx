import React from 'react';
import { GlassCard } from '../common/GlassCard';
import { ShieldCheck, AlertTriangle, ShieldAlert, CheckCircle, Info } from 'lucide-react';

export const DecisionPolicyMatrix: React.FC = () => {
  const policies = [
    {
      range: '80 – 100',
      status: 'TRUSTED',
      action: 'PROCEED',
      color: 'border-emerald-500/30 text-emerald-400 bg-emerald-950/20',
      badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
      icon: <ShieldCheck className="w-5 h-5 text-emerald-400" />,
      description: 'Image SNR, model softmax entropy, and frequency spectrum passed all baseline safety envelopes.',
      directive: 'Allow visual payload to proceed directly into downstream actuation & vehicle trajectory planning without manual intervention.'
    },
    {
      range: '50 – 79',
      status: 'CAUTION',
      action: 'REVIEW / SENSOR FUSION',
      color: 'border-amber-500/30 text-amber-400 bg-amber-950/20',
      badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
      icon: <AlertTriangle className="w-5 h-5 text-amber-400" />,
      description: 'Degraded visual conditions (glare, rain, fog, compression) or localized semantic uncertainty detected.',
      directive: 'Request cross-validation from auxiliary sensors (RADAR/LiDAR/Depth) before irreversible actuation.'
    },
    {
      range: '0 – 49',
      status: 'HIGH RISK',
      action: 'QUARANTINE / SAFE-STOP',
      color: 'border-rose-500/30 text-rose-400 bg-rose-950/20',
      badgeColor: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
      icon: <ShieldAlert className="w-5 h-5 text-rose-400" />,
      description: 'Active adversarial perturbation (FGSM/PGD), synthetic splicing, or critical model misclassification detected.',
      directive: 'Immediately suppress downstream prediction. Trigger safe-stop fallback protocol and dispatch security alert to SOC.'
    }
  ];

  return (
    <div className="space-y-6 pt-6">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div>
          <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-white">
            POLICY ENFORCEMENT &amp; THRESHOLD MATRIX
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Deterministic mapping of Trust Score tiers to automated security policies.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {policies.map((p, idx) => (
          <GlassCard key={idx} className={`p-6 border ${p.color} flex flex-col justify-between`}>
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  {p.icon}
                  <span className="font-bold font-mono text-sm">{p.status}</span>
                </div>
                <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded border ${p.badgeColor}`}>
                  {p.range}
                </span>
              </div>

              <div className="text-xs font-mono font-bold text-white mb-2">
                ACTION: {p.action}
              </div>

              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                {p.description}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-800/80 text-[11px] text-slate-400 leading-normal">
              <strong className="text-slate-200">Enforcement: </strong>{p.directive}
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
};
