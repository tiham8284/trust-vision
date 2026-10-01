import React, { useEffect, useState } from 'react';
import { TrustStatus } from '../../types';
import { ShieldCheck, AlertTriangle, ShieldAlert } from 'lucide-react';

interface ScoreGaugeProps {
  score: number;
  status: TrustStatus;
  size?: number;
  strokeWidth?: number;
  animate?: boolean;
}

export const ScoreGauge: React.FC<ScoreGaugeProps> = ({
  score,
  status,
  size = 180,
  strokeWidth = 14,
  animate = true
}) => {
  const [displayScore, setDisplayScore] = useState(animate ? 0 : score);

  useEffect(() => {
    if (!animate) {
      setDisplayScore(score);
      return;
    }

    let start = 0;
    const duration = 1200; // ms
    const stepTime = 20;
    const steps = duration / stepTime;
    const increment = score / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= score) {
        setDisplayScore(score);
        clearInterval(timer);
      } else {
        setDisplayScore(Math.round(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [score, animate]);

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = (displayScore / 100) * circumference;
  const strokeDashoffset = circumference - progress;

  // Colors based on status
  const isTrusted = status === 'TRUSTED';
  const isCaution = status === 'CAUTION';

  const strokeColor = isTrusted
    ? '#10b981' // emerald-500
    : isCaution
    ? '#f59e0b' // amber-500
    : '#ef4444'; // rose-500

  const glowColor = isTrusted
    ? 'rgba(16, 185, 129, 0.4)'
    : isCaution
    ? 'rgba(245, 158, 11, 0.4)'
    : 'rgba(239, 68, 68, 0.4)';

  const statusLabel = isTrusted ? 'TRUSTED' : isCaution ? 'CAUTION' : 'HIGH RISK';

  const StatusIcon = isTrusted ? ShieldCheck : isCaution ? AlertTriangle : ShieldAlert;

  return (
    <div className="relative flex flex-col items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="rotate-[-90deg]">
        {/* Background Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#1e293b"
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Animated Active Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          fill="none"
          style={{
            transition: 'stroke-dashoffset 0.8s ease-out, stroke 0.4s ease',
            filter: `drop-shadow(0 0 10px ${glowColor})`
          }}
        />
      </svg>

      {/* Center Score & Info */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-2 pointer-events-none">
        <StatusIcon
          className="w-5 h-5 mb-0.5"
          style={{ color: strokeColor }}
        />
        <div className="text-4xl font-extrabold font-mono tracking-tight text-white flex items-baseline">
          {displayScore}
          <span className="text-xs font-sans text-slate-400 font-normal ml-0.5">/100</span>
        </div>
        <div
          className="text-[11px] font-bold tracking-wider mt-0.5 px-2 py-0.5 rounded-full uppercase"
          style={{
            color: strokeColor,
            backgroundColor: `${strokeColor}18`,
            border: `1px solid ${strokeColor}40`
          }}
        >
          {statusLabel}
        </div>
      </div>
    </div>
  );
};
