import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
  hover?: boolean;
  onClick?: () => void;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = '',
  glow = false,
  hover = true,
  onClick
}) => {
  return (
    <div
      onClick={onClick}
      className={`
        relative rounded-xl overflow-hidden transition-all duration-300
        ${glow ? 'cyber-glass-glow' : 'cyber-glass'}
        ${hover ? 'hover:border-cyan-500/40 hover:shadow-[0_0_20px_rgba(0,240,255,0.12)]' : ''}
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
};
