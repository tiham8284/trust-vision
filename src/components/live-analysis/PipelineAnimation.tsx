import React, { useEffect, useState } from 'react';
import { PIPELINE_STEPS, PipelineStep } from '../../services/trustVisionEngine';
import { GlassCard } from '../common/GlassCard';
import { 
  CheckCircle2, 
  Loader2, 
  Radio, 
  ShieldAlert, 
  Cpu, 
  Activity,
  Layers,
  Sparkles
} from 'lucide-react';

interface PipelineAnimationProps {
  onComplete: () => void;
  targetImageName: string;
}

export const PipelineAnimation: React.FC<PipelineAnimationProps> = ({
  onComplete,
  targetImageName
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [progressPercent, setProgressPercent] = useState(0);

  useEffect(() => {
    let active = true;
    let step = 0;

    const runSteps = async () => {
      for (let i = 0; i < PIPELINE_STEPS.length; i++) {
        if (!active) return;
        step = i;
        setCurrentStepIndex(i);

        const currentStep = PIPELINE_STEPS[i];
        
        // Progress smoothly inside step
        const stepProgressStart = Math.round((i / PIPELINE_STEPS.length) * 100);
        const stepProgressEnd = Math.round(((i + 1) / PIPELINE_STEPS.length) * 100);
        
        setProgressPercent(stepProgressStart);

        await new Promise((resolve) => setTimeout(resolve, currentStep.durationMs));

        if (!active) return;
        setCompletedSteps((prev) => [...prev, currentStep.id]);
        setProgressPercent(stepProgressEnd);
      }

      // Small delay at 100%
      await new Promise((resolve) => setTimeout(resolve, 350));
      if (active) {
        onComplete();
      }
    };

    runSteps();

    return () => {
      active = false;
    };
  }, [onComplete]);

  const currentStep = PIPELINE_STEPS[currentStepIndex] || PIPELINE_STEPS[PIPELINE_STEPS.length - 1];

  // Visual ASCII bar representation for cybersecurity look
  const barLength = 24;
  const filledBars = Math.round((progressPercent / 100) * barLength);
  const asciiBar = '█'.repeat(filledBars) + '░'.repeat(Math.max(0, barLength - filledBars));

  return (
    <GlassCard className="p-8 border-cyan-500/40 my-6 shadow-[0_0_30px_rgba(0,240,255,0.15)]" glow>
      
      {/* Header telemetry */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-bold mb-1">
            <Radio className="w-4 h-4 animate-pulse" />
            REAL-TIME INFERENCE PIPELINE
          </div>
          <h3 className="text-xl font-black text-white font-display">
            Analyzing Target: <span className="text-cyan-300 font-mono">{targetImageName}</span>
          </h3>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-mono text-slate-300">
            ENGINE: <span className="text-cyan-400 font-bold">TRUSTVISION-CORE</span>
          </div>
          <div className="px-3 py-1.5 rounded-lg bg-cyan-950/60 border border-cyan-500/30 text-xs font-mono text-cyan-300 font-bold">
            STAGE {currentStepIndex + 1}/{PIPELINE_STEPS.length}
          </div>
        </div>
      </div>

      {/* Progress Bar & Status Text */}
      <div className="my-8 space-y-3">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-slate-300 font-bold uppercase tracking-wider flex items-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin text-cyan-400" />
            ANALYZING PIPELINE
          </span>
          <span className="text-cyan-400 font-bold text-sm">
            {progressPercent}%
          </span>
        </div>

        {/* Progress Visual Bar */}
        <div className="h-3 w-full bg-slate-900 rounded-full overflow-hidden p-0.5 border border-cyan-500/30">
          <div
            className="h-full bg-gradient-to-r from-cyan-500 via-sky-400 to-blue-500 rounded-full transition-all duration-300 shadow-[0_0_12px_rgba(0,240,255,0.6)]"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* ASCII & Terminal status line */}
        <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="text-slate-400 truncate">
            <span className="text-cyan-400 font-bold">&gt;&gt;</span> Current stage: <span className="text-white font-semibold">"{currentStep.statusDescription}"</span>
          </div>
          <div className="text-cyan-400 font-mono text-[11px] shrink-0 tracking-wider">
            [{asciiBar}]
          </div>
        </div>
      </div>

      {/* Sequential Steps Grid / Stepper */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {PIPELINE_STEPS.map((step, idx) => {
          const isDone = completedSteps.includes(step.id);
          const isCurrent = currentStepIndex === idx;

          return (
            <div
              key={step.id}
              className={`
                p-3 rounded-lg border text-left transition-all duration-200 text-xs font-mono flex items-start gap-2.5
                ${isCurrent 
                  ? 'bg-cyan-950/50 border-cyan-400 shadow-[0_0_15px_rgba(0,240,255,0.25)]' 
                  : isDone
                  ? 'bg-slate-900/60 border-emerald-500/30 text-slate-300'
                  : 'bg-slate-950/40 border-slate-800/80 text-slate-600'}
              `}
            >
              <div className="mt-0.5 shrink-0">
                {isDone ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : isCurrent ? (
                  <Loader2 className="w-4 h-4 text-cyan-400 animate-spin" />
                ) : (
                  <div className="w-4 h-4 rounded-full border border-slate-700 flex items-center justify-center text-[10px] text-slate-600">
                    {idx + 1}
                  </div>
                )}
              </div>

              <div className="truncate">
                <div className={`font-bold uppercase tracking-tight ${isCurrent ? 'text-cyan-300' : isDone ? 'text-white' : 'text-slate-500'}`}>
                  {step.label}
                </div>
                <div className="text-[10px] text-slate-400 truncate mt-0.5">
                  {step.subDescription}
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </GlassCard>
  );
};
