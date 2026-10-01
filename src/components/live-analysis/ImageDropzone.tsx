import React, { useRef, useState } from 'react';
import { DemoScenarioId } from '../../types';
import { DEMO_SCENARIOS } from '../../services/trustVisionEngine';
import { GlassCard } from '../common/GlassCard';
import { 
  UploadCloud, 
  Image as ImageIcon, 
  Sparkles, 
  ShieldCheck, 
  AlertTriangle, 
  ShieldAlert, 
  Play,
  FileCheck,
  CheckCircle
} from 'lucide-react';

interface ImageDropzoneProps {
  selectedScenario: DemoScenarioId | 'custom';
  customImage: { name: string; url: string; width: number; height: number; sizeKb: number } | null;
  onSelectScenario: (scenario: DemoScenarioId) => void;
  onCustomImageUpload: (image: { name: string; url: string; width: number; height: number; sizeKb: number }) => void;
  onStartAnalysis: () => void;
  isAnalyzing: boolean;
}

export const ImageDropzone: React.FC<ImageDropzoneProps> = ({
  selectedScenario,
  customImage,
  onSelectScenario,
  onCustomImageUpload,
  onStartAnalysis,
  isAnalyzing,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file: File) => {
    if (!file.type.match(/^image\/(jpeg|png|webp|jpg)$/i)) {
      alert('Please upload a valid image file (JPG, PNG, or WEBP).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const url = event.target?.result as string;
      const img = new Image();
      img.onload = () => {
        onCustomImageUpload({
          name: file.name,
          url,
          width: img.width,
          height: img.height,
          sizeKb: Math.round(file.size / 1024)
        });
      };
      img.src = url;
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  // Current preview image
  const currentImageUrl = selectedScenario === 'custom' && customImage
    ? customImage.url
    : DEMO_SCENARIOS[selectedScenario as DemoScenarioId]?.imageUrl;

  const currentImageName = selectedScenario === 'custom' && customImage
    ? customImage.name
    : `${DEMO_SCENARIOS[selectedScenario as DemoScenarioId]?.title}.svg`;

  return (
    <div className="space-y-6">
      
      {/* Preset Demo Scenarios Selector */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            SELECT PRESET DEMO SCENARIO (OR UPLOAD YOUR OWN)
          </label>
          <span className="text-[11px] text-cyan-400 font-mono">100% OFFLINE READY</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {(Object.keys(DEMO_SCENARIOS) as DemoScenarioId[]).map((scenarioKey) => {
            const scenario = DEMO_SCENARIOS[scenarioKey];
            const isSelected = selectedScenario === scenarioKey;

            return (
              <div
                key={scenario.id}
                onClick={() => onSelectScenario(scenario.id)}
                className={`
                  relative p-3.5 rounded-xl cursor-pointer transition-all duration-200 border text-left flex flex-col justify-between
                  ${isSelected
                    ? 'bg-gradient-to-b from-cyan-950/60 to-slate-900 border-cyan-400 shadow-[0_0_15px_rgba(0,240,255,0.25)] ring-1 ring-cyan-400'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-800/40'}
                `}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${scenario.badgeColor}`}>
                      {scenario.badge}
                    </span>
                    <span className="text-xs font-mono font-bold text-white">
                      Score: {scenario.expectedTrustScore}
                    </span>
                  </div>

                  <h4 className="text-xs font-bold text-white mb-1">
                    {scenario.title}
                  </h4>
                  <p className="text-[11px] text-slate-400 leading-tight">
                    {scenario.subtitle}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-500 font-mono">
                  <span>{scenario.expectedStatus}</span>
                  {isSelected && <CheckCircle className="w-3.5 h-3.5 text-cyan-400" />}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Drag & Drop Upload Zone & Visual Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Dropzone Upload Area */}
        <div className="lg:col-span-5">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".jpg,.jpeg,.png,.webp"
            className="hidden"
          />

          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`
              h-full min-h-[220px] rounded-xl border-2 border-dashed p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-200
              ${isDragging
                ? 'border-cyan-400 bg-cyan-950/40 shadow-[0_0_20px_rgba(0,240,255,0.3)]'
                : 'border-slate-700 hover:border-cyan-500/60 bg-slate-900/40 hover:bg-slate-900/80'}
            `}
          >
            <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-cyan-400 mb-3 shadow-inner">
              <UploadCloud className="w-6 h-6" />
            </div>

            <div className="text-sm font-bold text-white mb-1">
              DROP IMAGE HERE
            </div>
            <div className="text-xs text-slate-400 mb-3">
              or <span className="text-cyan-400 underline font-semibold">Browse files</span> from your computer
            </div>

            <div className="text-[10px] font-mono text-slate-500 flex items-center gap-2">
              <span>JPG</span> &bull; <span>PNG</span> &bull; <span>WEBP</span> (Max 15MB)
            </div>

            {selectedScenario === 'custom' && customImage && (
              <div className="mt-4 px-3 py-1.5 rounded-md bg-cyan-950/60 border border-cyan-500/40 text-[11px] text-cyan-300 font-mono flex items-center gap-2">
                <FileCheck className="w-3.5 h-3.5" />
                Custom image uploaded: {customImage.name}
              </div>
            )}
          </div>
        </div>

        {/* Selected Image Preview with Active HUD Frame */}
        <div className="lg:col-span-7">
          <GlassCard className="h-full p-4 flex flex-col justify-between border-cyan-500/30">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs">
                <span className="text-slate-300 font-mono font-bold flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-cyan-400" />
                  INPUT BUFFER PREVIEW: <span className="text-white">{currentImageName}</span>
                </span>
                <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/30">
                  READY FOR INGESTION
                </span>
              </div>

              {/* Image Container with Scan Line Effect */}
              <div className="relative mt-3 rounded-lg overflow-hidden bg-slate-950 border border-slate-800 aspect-video flex items-center justify-center">
                {currentImageUrl ? (
                  <img
                    src={currentImageUrl}
                    alt="Input buffer preview"
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div className="text-slate-600 text-xs font-mono">No image loaded</div>
                )}
                
                {/* Subtle Scan Overlay */}
                <div className="scan-line-overlay" />
                
                {/* Corner reticles */}
                <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-cyan-400 opacity-60"></div>
                <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-cyan-400 opacity-60"></div>
                <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-cyan-400 opacity-60"></div>
                <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-cyan-400 opacity-60"></div>
              </div>
            </div>

            {/* Launch Pipeline Button */}
            <div className="pt-4 mt-3 border-t border-slate-800/80 flex items-center justify-between gap-4">
              <div className="text-[11px] text-slate-400 font-mono">
                PIPELINE STATUS: <span className="text-emerald-400 font-bold">READY</span>
              </div>

              <button
                onClick={onStartAnalysis}
                disabled={isAnalyzing}
                className={`
                  inline-flex items-center gap-2.5 px-6 py-3 rounded-xl font-bold text-xs text-slate-950 transition-all transform active:scale-95 shadow-[0_0_25px_rgba(0,240,255,0.4)]
                  ${isAnalyzing
                    ? 'bg-slate-600 text-slate-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-cyan-400 via-cyan-300 to-sky-400 hover:from-cyan-300 hover:to-sky-300 hover:shadow-[0_0_35px_rgba(0,240,255,0.6)]'}
                `}
              >
                <Play className="w-4 h-4 fill-current" />
                <span>{isAnalyzing ? 'ANALYZING PIPELINE...' : 'ANALYZE IMAGE'}</span>
              </button>
            </div>
          </GlassCard>
        </div>

      </div>

    </div>
  );
};
