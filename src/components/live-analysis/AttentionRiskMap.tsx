import React, { useRef, useEffect, useState } from 'react';
import { GlassCard } from '../common/GlassCard';
import { AnalysisResult } from '../../types';
import { 
  Eye, 
  Layers, 
  Columns, 
  Sparkles, 
  Scan, 
  Sliders, 
  Info,
  Maximize2
} from 'lucide-react';

interface AttentionRiskMapProps {
  result: AnalysisResult;
}

type ViewMode = 'original' | 'heatmap' | 'split' | 'difference';

export const AttentionRiskMap: React.FC<AttentionRiskMapProps> = ({ result }) => {
  const [viewMode, setViewMode] = useState<ViewMode>('heatmap');
  const [heatmapIntensity, setHeatmapIntensity] = useState(75);
  const [scanActive, setScanActive] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = result.imageUrl;

    img.onload = () => {
      canvas.width = 800;
      canvas.height = 500;

      // Draw base image
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      if (viewMode === 'original') {
        // Draw bounding boxes on original if available
        drawDetections(ctx, canvas.width, canvas.height);
        return;
      }

      if (viewMode === 'difference') {
        // Apply high pass / ELA edge filter
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imgData.data;
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          const diff = Math.abs(r - g) + Math.abs(g - b);
          data[i] = Math.min(255, diff * 3);
          data[i + 1] = Math.min(255, (255 - r) * 0.5);
          data[i + 2] = 255 - b;
        }
        ctx.putImageData(imgData, 0, 0);
        return;
      }

      // Draw Heatmap Overlay
      const alpha = (heatmapIntensity / 100) * 0.65;
      
      // Determine hotspot coordinates based on result anomalies
      const hotspots: { x: number; y: number; r: number; color: string }[] = [];

      if (result.scenarioId === 'adversarial') {
        // Hotspot centered on the adversarial stop sign
        hotspots.push({ x: 400, y: 220, r: 180, color: 'rgba(239, 68, 68, 1)' });
        hotspots.push({ x: 380, y: 200, r: 90, color: 'rgba(255, 0, 85, 1)' });
      } else if (result.scenarioId === 'manipulated') {
        // Hotspots on cloned car and altered sign
        hotspots.push({ x: 550, y: 340, r: 140, color: 'rgba(239, 68, 68, 1)' });
        hotspots.push({ x: 700, y: 250, r: 90, color: 'rgba(245, 158, 11, 1)' });
      } else if (result.scenarioId === 'low_quality') {
        // Glare & rain spread
        hotspots.push({ x: 580, y: 220, r: 190, color: 'rgba(245, 158, 11, 0.9)' });
        hotspots.push({ x: 360, y: 300, r: 120, color: 'rgba(56, 189, 248, 0.7)' });
      } else {
        // Normal scene: focused on valid detected vehicles
        hotspots.push({ x: 380, y: 320, r: 100, color: 'rgba(16, 185, 129, 0.8)' });
        hotspots.push({ x: 550, y: 350, r: 110, color: 'rgba(16, 185, 129, 0.8)' });
        hotspots.push({ x: 200, y: 330, r: 80, color: 'rgba(56, 189, 248, 0.7)' });
      }

      // Draw radial gradients
      ctx.save();
      ctx.globalCompositeOperation = 'screen';

      hotspots.forEach((spot) => {
        const grad = ctx.createRadialGradient(spot.x, spot.y, 0, spot.x, spot.y, spot.r);
        grad.addColorStop(0, spot.color.replace('1)', `${alpha})`));
        grad.addColorStop(0.5, spot.color.replace('1)', `${alpha * 0.5})`));
        grad.addColorStop(1, 'transparent');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(spot.x, spot.y, spot.r, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.restore();

      // If split view, wipe right half to show original
      if (viewMode === 'split') {
        ctx.save();
        ctx.beginPath();
        ctx.rect(canvas.width / 2, 0, canvas.width / 2, canvas.height);
        ctx.clip();
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        // Draw split line
        ctx.strokeStyle = '#00f0ff';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2, 0);
        ctx.lineTo(canvas.width / 2, canvas.height);
        ctx.stroke();
        ctx.restore();
      }

      drawDetections(ctx, canvas.width, canvas.height);
    };
  }, [result, viewMode, heatmapIntensity]);

  const drawDetections = (ctx: CanvasRenderingContext2D, w: number, h: number) => {
    result.detections.forEach((det) => {
      if (!det.bbox) return;
      const [bx, by, bw, bh] = det.bbox;
      const x = (bx / 100) * w;
      const y = (by / 100) * h;
      const width = (bw / 100) * w;
      const height = (bh / 100) * h;

      ctx.strokeStyle = det.anomalyFlag ? '#ef4444' : '#00f0ff';
      ctx.lineWidth = 2;
      ctx.strokeRect(x, y, width, height);

      // Label background
      ctx.fillStyle = det.anomalyFlag ? 'rgba(239, 68, 68, 0.85)' : 'rgba(14, 20, 34, 0.85)';
      ctx.fillRect(x, y - 18, width, 18);

      // Text label
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 10px monospace';
      ctx.fillText(`${det.label} [${det.confidence}%]`, x + 4, y - 5);
    });
  };

  return (
    <GlassCard className="p-6 border-cyan-500/30" glow>
      
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
              SPATIAL ATTENTION &amp; RISK HEATMAP
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950/80 text-cyan-300 border border-cyan-500/30">
              DEMO VISUALIZATION
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Synthesized activation gradients and anomaly hotspot distribution.
          </p>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800 text-xs">
          <button
            onClick={() => setViewMode('heatmap')}
            className={`px-3 py-1 rounded font-mono font-semibold transition-all ${viewMode === 'heatmap' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'text-slate-400 hover:text-white'}`}
          >
            Heatmap
          </button>
          <button
            onClick={() => setViewMode('split')}
            className={`px-3 py-1 rounded font-mono font-semibold transition-all ${viewMode === 'split' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'text-slate-400 hover:text-white'}`}
          >
            Split View
          </button>
          <button
            onClick={() => setViewMode('original')}
            className={`px-3 py-1 rounded font-mono font-semibold transition-all ${viewMode === 'original' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'text-slate-400 hover:text-white'}`}
          >
            Original
          </button>
          <button
            onClick={() => setViewMode('difference')}
            className={`px-3 py-1 rounded font-mono font-semibold transition-all ${viewMode === 'difference' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'text-slate-400 hover:text-white'}`}
          >
            ELA / High-Pass
          </button>
        </div>
      </div>

      {/* Canvas Viewport */}
      <div className="relative mt-4 rounded-xl overflow-hidden bg-slate-950 border border-slate-800 aspect-video flex items-center justify-center">
        <canvas
          ref={canvasRef}
          className="w-full h-full object-contain"
        />

        {/* Scan line effect */}
        {scanActive && <div className="scan-line-overlay" />}

        {/* Watermark Label */}
        <div className="absolute bottom-3 right-3 px-2 py-1 rounded bg-slate-950/85 border border-slate-800 text-[10px] font-mono text-slate-400 backdrop-blur-md">
          TRUSTVISION_RISK_MAP // {viewMode.toUpperCase()}
        </div>
      </div>

      {/* Footer Controls & Legend */}
      <div className="pt-4 mt-4 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono text-slate-400">
        
        {/* Heatmap intensity slider */}
        <div className="flex items-center gap-3">
          <Sliders className="w-3.5 h-3.5 text-cyan-400" />
          <span>Heatmap Intensity:</span>
          <input
            type="range"
            min="20"
            max="100"
            value={heatmapIntensity}
            onChange={(e) => setHeatmapIntensity(Number(e.target.value))}
            className="w-24 accent-cyan-400 cursor-pointer"
          />
          <span className="text-white font-bold">{heatmapIntensity}%</span>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 text-[11px]">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>Trusted Area</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-400"></span>
            <span>Caution Hotspot</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-rose-500"></span>
            <span>Anomaly / Threat</span>
          </div>
        </div>

      </div>

    </GlassCard>
  );
};
