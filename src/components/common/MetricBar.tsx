import React from 'react';

interface MetricBarProps {
  label: string;
  value: number; // 0 to 100
  type?: 'positive' | 'risk'; // positive: higher is better; risk: lower is better
  icon?: React.ReactNode;
  subtitle?: string;
}

export const MetricBar: React.FC<MetricBarProps> = ({
  label,
  value,
  type = 'positive',
  icon,
  subtitle
}) => {
  // Determine color based on value and type
  let colorClass = 'bg-cyan-500 text-cyan-400';
  let glowStyle = 'rgba(6, 182, 212, 0.4)';

  if (type === 'positive') {
    if (value >= 80) {
      colorClass = 'bg-emerald-500 text-emerald-400';
      glowStyle = 'rgba(16, 185, 129, 0.4)';
    } else if (value >= 50) {
      colorClass = 'bg-amber-500 text-amber-400';
      glowStyle = 'rgba(245, 158, 11, 0.4)';
    } else {
      colorClass = 'bg-rose-500 text-rose-400';
      glowStyle = 'rgba(239, 68, 68, 0.4)';
    }
  } else {
    // Risk metric: lower is better
    if (value <= 20) {
      colorClass = 'bg-emerald-500 text-emerald-400';
      glowStyle = 'rgba(16, 185, 129, 0.4)';
    } else if (value <= 45) {
      colorClass = 'bg-amber-500 text-amber-400';
      glowStyle = 'rgba(245, 158, 11, 0.4)';
    } else {
      colorClass = 'bg-rose-500 text-rose-400';
      glowStyle = 'rgba(239, 68, 68, 0.4)';
    }
  }

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-xs">
        <span className="text-slate-300 font-medium flex items-center gap-1.5">
          {icon && <span className="text-slate-400">{icon}</span>}
          {label}
        </span>
        <span className="font-mono font-bold text-slate-100 flex items-center gap-1">
          {value}%
        </span>
      </div>

      {/* Progress Track */}
      <div className="h-2 w-full bg-slate-800/80 rounded-full overflow-hidden p-0.5 border border-slate-700/40">
        <div
          className={`h-full rounded-full transition-all duration-700 ease-out ${colorClass.split(' ')[0]}`}
          style={{
            width: `${Math.max(3, Math.min(100, value))}%`,
            boxShadow: `0 0 8px ${glowStyle}`
          }}
        />
      </div>

      {subtitle && (
        <p className="text-[11px] text-slate-500 font-normal leading-tight">{subtitle}</p>
      )}
    </div>
  );
};
