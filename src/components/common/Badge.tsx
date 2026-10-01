import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'trusted' | 'caution' | 'threat' | 'cyan' | 'neutral' | 'demo';
  size?: 'sm' | 'md';
  icon?: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'cyan',
  size = 'sm',
  icon,
  className = ''
}) => {
  const variantStyles = {
    trusted: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
    caution: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
    threat: 'text-rose-400 bg-rose-500/10 border-rose-500/30',
    cyan: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30',
    neutral: 'text-slate-400 bg-slate-800/60 border-slate-700/60',
    demo: 'text-cyan-300 bg-cyan-950/40 border-cyan-500/40 uppercase tracking-widest font-mono text-[10px]'
  };

  const sizeStyles = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-xs'
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-medium border ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </span>
  );
};
