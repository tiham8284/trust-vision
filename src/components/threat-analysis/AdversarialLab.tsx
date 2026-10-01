import React, { useRef, useEffect, useState } from 'react';
import { GlassCard } from '../common/GlassCard';
import { DEMO_SCENARIOS } from '../../services/trustVisionEngine';
import { 
  Flame, 
  Sliders, 
  Play, 
  ShieldAlert, 
  AlertTriangle, 
  ShieldCheck, 
  Activity, 
  Zap, 
  Sparkles,
  Info
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  CartesianGrid,
  Legend
} from 'recharts';

export const AdversarialLab: React.FC = () => {
  const [perturbationStrength, setPerturbationStrength] = useState<number>(45);
  const [attackType, setAttackType] = useState<'fgsm' | 'pgd' | 'patch' | 'noise'>('fgsm');
  const [isSimulating, setIsSimulating] = useState(false);
  const [hasRun, setHasRun] = useState(true);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Compute metrics based on strength and attack type
  const baseConfidence = 96;
  const confidenceDropFactor = attackType === 'fgsm' ? 0.65 : attackType === 'pgd' ? 0.78 : attackType === 'patch' ? 0.55 : 0.45;
  const perturbedConfidence = Math.max(12, Math.round(baseConfidence - (perturbationStrength * confidenceDropFactor)));
  const confidenceDelta = perturbedConfidence - baseConfidence;
  
  // TrustVision detection score: as perturbation rises, TrustVision flags it with higher adversarial risk
  const adversarialRisk = Math.min(96, Math.round(perturbationStrength * 0.9 + 5));
  const trustScore = Math.max(18, Math.round(94 - (perturbationStrength * 0.75)));
  const integrityImpact = trustScore >= 80 ? 'OPTIMAL' : trustScore >= 50 ? 'WARNING' : 'HIGH_RISK_ATTACK';

  // Chart curve data across 0% to 100%
  const chartData = [0, 20, 40, 60, 80, 100].map((strength) => {
    const rawConf = Math.max(10, Math.round(baseConfidence - (strength * confidenceDropFactor)));
    const trust = Math.max(18, Math.round(94 - (strength * 0.75)));
    const risk = Math.min(96, Math.round(strength * 0.9 + 5));
    return {
      strength: `${strength}%`,
      'Raw Model Confidence': rawConf,
      'TrustVision Trust Score': trust,
      'Adversarial Risk Detected': risk
    };
  });

  // Render perturbed canvas in real time
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = DEMO_SCENARIOS.normal.imageUrl;

    img.onload = () => {
      canvas.width = 600;
      canvas.height = 380;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      if (perturbationStrength > 0) {
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imgData.data;
        const factor = (perturbationStrength / 100) * 80;

        for (let i = 0; i < data.length; i += 4) {
          if (attackType === 'fgsm') {
            // High frequency alternating noise
            const noise = ((i % 7) - 3) * (factor / 12);
            data[i] = Math.min(255, Math.max(0, data[i] + noise));
            data[i + 1] = Math.min(255, Math.max(0, data[i + 1] - noise));
            data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + (noise * 1.2)));
          } else if (attackType === 'pgd') {
            // Iterative gradient pattern
            const p = Math.sin(i * 0.05) * factor;
            data[i] = Math.min(255, Math.max(0, data[i] + p));
            data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + p * 0.8));
          } else if (attackType === 'patch') {
            // Adversarial sticker in center
            const pixelIndex = i / 4;
            const x = pixelIndex % canvas.width;
            const y = Math.floor(pixelIndex / canvas.width);
            if (x > 260 && x < 380 && y > 160 && y < 280) {
              data[i] = (data[i] + (Math.random() * 255 * (perturbationStrength / 100))) % 255;
              data[i + 1] = (data[i + 1] + 128) % 255;
              data[i + 2] = 255;
            }
          } else {
            // Gaussian jitter
            const jitter = (Math.random() - 0.5) * factor * 1.5;
            data[i] = Math.min(255, Math.max(0, data[i] + jitter));
            data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + jitter));
            data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + jitter));
          }
        }
        ctx.putImageData(imgData, 0, 0);
      }
    };
  }, [perturbationStrength, attackType]);

  const handleRunSimulation = () => {
    setIsSimulating(true);
    setTimeout(() => {
      setIsSimulating(false);
      setHasRun(true);
    }, 700);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-950/40 border border-rose-500/30 text-xs font-mono text-rose-400 uppercase tracking-widest mb-2">
            <Flame className="w-3.5 h-3.5" />
            ADVERSARIAL ROBUSTNESS LAB
          </div>
          <h2 className="text-3xl font-extrabold text-white font-display tracking-tight">
            Adversarial Perturbation Simulation &amp; Stress Testing
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            "Explore how subtle input changes can affect computer-vision predictions."
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="px-3 py-1.5 rounded-lg bg-cyan-950/60 border border-cyan-500/30 text-cyan-300">
            SIMULATION ENGINE ACTIVE
          </span>
        </div>
      </div>

      {/* Control Sandbox Panel */}
      <GlassCard className="p-6 border-cyan-500/30" glow>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          
          {/* Attack Type Selector */}
          <div className="md:col-span-5 space-y-2">
            <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-cyan-400" />
              SELECT ATTACK VECTOR
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setAttackType('fgsm')}
                className={`p-2.5 rounded-lg text-xs font-mono font-semibold text-left transition-all border ${
                  attackType === 'fgsm' ? 'bg-rose-950/50 border-rose-400 text-rose-300 shadow-[0_0_12px_rgba(239,68,68,0.25)]' : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <div className="font-bold">FGSM Attack</div>
                <div className="text-[10px] text-slate-500">Fast Gradient Sign</div>
              </button>

              <button
                onClick={() => setAttackType('pgd')}
                className={`p-2.5 rounded-lg text-xs font-mono font-semibold text-left transition-all border ${
                  attackType === 'pgd' ? 'bg-rose-950/50 border-rose-400 text-rose-300 shadow-[0_0_12px_rgba(239,68,68,0.25)]' : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <div className="font-bold">PGD Attack</div>
                <div className="text-[10px] text-slate-500">Projected Gradient</div>
              </button>

              <button
                onClick={() => setAttackType('patch')}
                className={`p-2.5 rounded-lg text-xs font-mono font-semibold text-left transition-all border ${
                  attackType === 'patch' ? 'bg-rose-950/50 border-rose-400 text-rose-300 shadow-[0_0_12px_rgba(239,68,68,0.25)]' : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <div className="font-bold">Patch Sticker</div>
                <div className="text-[10px] text-slate-500">Physical Occlusion</div>
              </button>

              <button
                onClick={() => setAttackType('noise')}
                className={`p-2.5 rounded-lg text-xs font-mono font-semibold text-left transition-all border ${
                  attackType === 'noise' ? 'bg-rose-950/50 border-rose-400 text-rose-300 shadow-[0_0_12px_rgba(239,68,68,0.25)]' : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <div className="font-bold">Spatial Jitter</div>
                <div className="text-[10px] text-slate-500">High-Freq Noise</div>
              </button>
            </div>
          </div>

          {/* Perturbation Strength Slider */}
          <div className="md:col-span-4 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-slate-300 font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-cyan-400" />
                PERTURBATION STRENGTH
              </span>
              <span className="text-cyan-400 font-bold text-sm">{perturbationStrength}%</span>
            </div>

            <input
              type="range"
              min="0"
              max="100"
              step="5"
              value={perturbationStrength}
              onChange={(e) => setPerturbationStrength(Number(e.target.value))}
              className="w-full accent-cyan-400 h-2 bg-slate-800 rounded-lg cursor-pointer"
            />

            <div className="flex justify-between text-[10px] font-mono text-slate-500">
              <span onClick={() => setPerturbationStrength(0)} className="cursor-pointer hover:text-cyan-400">0%</span>
              <span onClick={() => setPerturbationStrength(25)} className="cursor-pointer hover:text-cyan-400">25%</span>
              <span onClick={() => setPerturbationStrength(50)} className="cursor-pointer hover:text-cyan-400">50%</span>
              <span onClick={() => setPerturbationStrength(75)} className="cursor-pointer hover:text-cyan-400">75%</span>
              <span onClick={() => setPerturbationStrength(100)} className="cursor-pointer hover:text-cyan-400">100%</span>
            </div>
          </div>

          {/* Run Button */}
          <div className="md:col-span-3 flex flex-col justify-center">
            <button
              onClick={handleRunSimulation}
              disabled={isSimulating}
              className="w-full py-3.5 px-4 rounded-xl font-bold text-xs text-slate-950 bg-gradient-to-r from-cyan-400 to-sky-400 hover:from-cyan-300 hover:to-sky-300 shadow-[0_0_20px_rgba(0,240,255,0.35)] flex items-center justify-center gap-2 transition-all transform active:scale-95"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>{isSimulating ? 'SIMULATING...' : 'RUN SIMULATION'}</span>
            </button>
          </div>

        </div>
      </GlassCard>

      {/* Side-by-Side Comparison: Original vs Perturbed */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Left: Original Image */}
        <GlassCard className="p-5 border-cyan-500/20">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs font-mono">
            <span className="font-bold text-slate-200">ORIGINAL UNTOUCHED INPUT</span>
            <span className="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              BASELINE: 96% CONF
            </span>
          </div>

          <div className="relative mt-3 rounded-lg overflow-hidden bg-slate-950 border border-slate-800 aspect-video flex items-center justify-center">
            <img
              src={DEMO_SCENARIOS.normal.imageUrl}
              alt="Original unperturbed visual"
              className="w-full h-full object-contain"
            />
            <div className="absolute top-2 left-2 px-2 py-1 rounded bg-slate-950/80 border border-slate-800 text-[10px] font-mono text-emerald-400">
              PREDICTION: "Person (96%)"
            </div>
          </div>
        </GlassCard>

        {/* Right: Live Simulated Perturbed Image */}
        <GlassCard className="p-5 border-rose-500/30" glow>
          <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs font-mono">
            <span className="font-bold text-rose-400 flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5" />
              SIMULATED PERTURBED IMAGE ({perturbationStrength}%)
            </span>
            <span className="px-2 py-0.5 rounded bg-rose-500/10 border border-rose-500/30 text-rose-400">
              CONFIDENCE: {perturbedConfidence}%
            </span>
          </div>

          <div className="relative mt-3 rounded-lg overflow-hidden bg-slate-950 border border-rose-500/30 aspect-video flex items-center justify-center">
            <canvas
              ref={canvasRef}
              className="w-full h-full object-contain"
            />
            
            <div className="absolute top-2 left-2 px-2 py-1 rounded bg-slate-950/85 border border-rose-500/50 text-[10px] font-mono text-rose-400">
              {perturbationStrength > 50
                ? 'RAW MODEL FOOLED: "Background / Speed 80"'
                : `DEGRADED: "Person (${perturbedConfidence}%)"`}
            </div>

            <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-slate-950/90 text-[10px] font-mono text-cyan-300 border border-cyan-500/30">
              TRUSTVISION INTERCEPT: ACTIVE
            </div>
          </div>
        </GlassCard>

      </div>

      {/* Stress Test Telemetry Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        <GlassCard className="p-4">
          <div className="text-[11px] font-mono text-slate-400 mb-1">ORIGINAL CONFIDENCE</div>
          <div className="text-2xl font-black font-mono text-emerald-400">{baseConfidence}%</div>
          <div className="text-[10px] text-slate-500 mt-1">Unperturbed baseline</div>
        </GlassCard>

        <GlassCard className="p-4">
          <div className="text-[11px] font-mono text-slate-400 mb-1">SIMULATED CONFIDENCE</div>
          <div className={`text-2xl font-black font-mono ${perturbedConfidence < 60 ? 'text-rose-400' : 'text-amber-400'}`}>
            {perturbedConfidence}%
          </div>
          <div className="text-[10px] text-slate-500 mt-1">Under {attackType.toUpperCase()} stress</div>
        </GlassCard>

        <GlassCard className="p-4">
          <div className="text-[11px] font-mono text-slate-400 mb-1">CONFIDENCE DELTA</div>
          <div className="text-2xl font-black font-mono text-rose-400">{confidenceDelta}%</div>
          <div className="text-[10px] text-slate-500 mt-1">Softmax probability loss</div>
        </GlassCard>

        <GlassCard className="p-4 border-rose-500/30">
          <div className="text-[11px] font-mono text-slate-400 mb-1">INTEGRITY IMPACT</div>
          <div className={`text-xl font-black font-mono ${integrityImpact === 'OPTIMAL' ? 'text-emerald-400' : integrityImpact === 'WARNING' ? 'text-amber-400' : 'text-rose-400'}`}>
            {integrityImpact}
          </div>
          <div className="text-[10px] text-slate-500 mt-1">Trust Score: {trustScore}/100</div>
        </GlassCard>

      </div>

      {/* Degradation Chart: Original vs Perturbed Confidence Curve */}
      <GlassCard className="p-6 border-cyan-500/30">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div>
            <h3 className="text-sm font-mono font-bold text-white uppercase tracking-wider">
              ROBUSTNESS DEGRADATION CURVE (0% → 100% PERTURBATION)
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Comparison between standard model decay and TrustVision threat interception sensitivity.
            </p>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
            SIMULATION
          </span>
        </div>

        <div className="h-64 w-full mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="strength" stroke="#64748b" fontSize={11} />
              <YAxis domain={[0, 100]} stroke="#64748b" fontSize={11} />
              <Tooltip
                contentStyle={{ backgroundColor: '#090d16', borderColor: '#334155', borderRadius: '8px', fontSize: '11px', fontFamily: 'monospace' }}
              />
              <Legend wrapperStyle={{ fontSize: '11px', fontFamily: 'monospace', paddingTop: '10px' }} />
              <Line type="monotone" dataKey="Raw Model Confidence" stroke="#ef4444" strokeWidth={2.5} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="TrustVision Trust Score" stroke="#38bdf8" strokeWidth={2.5} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="Adversarial Risk Detected" stroke="#f59e0b" strokeWidth={2} strokeDasharray="4 4" dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>

    </div>
  );
};
