import React, { useState } from 'react';
import { X, Sliders, Key, Shield, RefreshCw, CheckCircle, Copy } from 'lucide-react';
import { clearHistory } from '../../services/historyStorage';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const [passThreshold, setPassThreshold] = useState(80);
  const [cautionThreshold, setCautionThreshold] = useState(50);
  const [sensitivity, setSensitivity] = useState<'normal' | 'high' | 'paranoid'>('high');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const mockApiKey = 'tv_live_sec_99482f81903e1a0b552';

  const handleCopyKey = () => {
    navigator.clipboard.writeText(mockApiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleResetData = () => {
    if (confirm('Clear local history cache and reset configuration?')) {
      clearHistory();
      alert('Local storage cache reset.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg rounded-2xl bg-[#090d16] border border-cyan-500/40 p-6 shadow-[0_0_40px_rgba(0,240,255,0.2)] font-mono text-xs">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5 text-cyan-400 font-bold">
            <Sliders className="w-5 h-5" />
            <span className="text-base font-sans text-white">TrustVision System Configuration</span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Controls */}
        <div className="py-5 space-y-5">
          
          {/* Policy Thresholds */}
          <div className="space-y-3 p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="text-slate-200 font-bold uppercase tracking-wider text-[11px] flex items-center gap-2">
              <Shield className="w-4 h-4 text-cyan-400" />
              POLICY ENFORCEMENT THRESHOLDS
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-slate-300">
                <span>Auto-Pass Threshold (TRUSTED):</span>
                <span className="text-emerald-400 font-bold">&ge; {passThreshold} pts</span>
              </div>
              <input
                type="range"
                min="65"
                max="95"
                value={passThreshold}
                onChange={(e) => setPassThreshold(Number(e.target.value))}
                className="w-full accent-emerald-400 cursor-pointer"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-slate-300">
                <span>Quarantine Threshold (HIGH RISK):</span>
                <span className="text-rose-400 font-bold">&lt; {cautionThreshold} pts</span>
              </div>
              <input
                type="range"
                min="30"
                max="70"
                value={cautionThreshold}
                onChange={(e) => setCautionThreshold(Number(e.target.value))}
                className="w-full accent-rose-400 cursor-pointer"
              />
            </div>
          </div>

          {/* Adversarial Sensitivity */}
          <div className="space-y-2 p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="text-slate-200 font-bold uppercase tracking-wider text-[11px]">
              ADVERSARIAL FREQUENCY SCAN SENSITIVITY
            </div>
            <div className="grid grid-cols-3 gap-2">
              {(['normal', 'high', 'paranoid'] as const).map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setSensitivity(lvl)}
                  className={`p-2 rounded-lg font-bold uppercase text-[10px] transition-all border ${
                    sensitivity === lvl
                      ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400 shadow-[0_0_10px_rgba(0,240,255,0.2)]'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>

          {/* API Credentials */}
          <div className="space-y-2 p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="text-slate-200 font-bold uppercase tracking-wider text-[11px] flex items-center gap-2">
              <Key className="w-4 h-4 text-cyan-400" />
              INTEGRATION API CREDENTIALS
            </div>
            <div className="flex items-center gap-2">
              <input
                type="password"
                readOnly
                value={mockApiKey}
                className="w-full px-3 py-1.5 rounded bg-slate-950 border border-slate-800 text-slate-400 text-xs select-all"
              />
              <button
                onClick={handleCopyKey}
                className="px-3 py-1.5 rounded bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/30 flex items-center gap-1 shrink-0"
              >
                {copied ? <CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'COPIED' : 'COPY'}</span>
              </button>
            </div>
          </div>

          {/* Cache Reset */}
          <div className="pt-2 flex justify-between items-center text-[11px]">
            <span className="text-slate-500">Local storage audit cache:</span>
            <button
              onClick={handleResetData}
              className="text-rose-400 hover:underline flex items-center gap-1"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Purge Cache</span>
            </button>
          </div>

        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold transition-all shadow-[0_0_15px_rgba(0,240,255,0.3)]"
          >
            SAVE &amp; CLOSE
          </button>
        </div>

      </div>
    </div>
  );
};
