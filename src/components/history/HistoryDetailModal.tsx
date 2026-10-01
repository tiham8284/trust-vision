import React from 'react';
import { AnalysisHistoryItem } from '../../types';
import { ScoreGauge } from '../common/ScoreGauge';
import { X, ShieldCheck, AlertTriangle, ShieldAlert, Calendar, Clock, FileText, Image as ImageIcon } from 'lucide-react';

interface HistoryDetailModalProps {
  item: AnalysisHistoryItem | null;
  onClose: () => void;
  onReplay: (item: AnalysisHistoryItem) => void;
}

export const HistoryDetailModal: React.FC<HistoryDetailModalProps> = ({ item, onClose, onReplay }) => {
  if (!item) return null;

  const isTrusted = item.status === 'TRUSTED';
  const isCaution = item.status === 'CAUTION';

  const statusColor = isTrusted ? 'text-emerald-400' : isCaution ? 'text-amber-400' : 'text-rose-400';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl rounded-2xl bg-[#090d16] border border-cyan-500/40 p-6 shadow-[0_0_40px_rgba(0,240,255,0.2)]">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-wider">
                AUDIT RECORD DETAILS
              </div>
              <h3 className="text-xl font-bold text-white font-display">
                {item.id} &mdash; {item.imageName}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="py-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          
          {/* Image preview */}
          <div className="md:col-span-5 rounded-xl overflow-hidden bg-slate-950 border border-slate-800 aspect-video flex items-center justify-center">
            <img
              src={item.imageUrl}
              alt={item.imageName}
              className="w-full h-full object-contain"
            />
          </div>

          {/* Quick Metrics */}
          <div className="md:col-span-7 space-y-3 text-xs font-mono">
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900 border border-slate-800">
              <span className="text-slate-400">Trust Score:</span>
              <span className={`text-base font-bold ${statusColor}`}>{item.trustScore}/100</span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900 border border-slate-800">
              <span className="text-slate-400">Status &amp; Risk:</span>
              <span className={`font-bold ${statusColor}`}>{item.status} ({item.riskLevel} Risk)</span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900 border border-slate-800">
              <span className="text-slate-400">Enforced Action:</span>
              <span className="text-cyan-300 font-bold">{item.actionTaken}</span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900 border border-slate-800">
              <span className="text-slate-400">Model Softmax:</span>
              <span className="text-white font-bold">{item.modelConfidence}%</span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900 border border-slate-800">
              <span className="text-slate-400">Timestamp:</span>
              <span className="text-slate-300 font-bold">{item.timestamp}</span>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
          <span className="text-[11px] font-mono text-slate-500">
            Recorded by TrustVision Audit Ledger
          </span>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onReplay(item)}
              className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-mono font-bold transition-all shadow-[0_0_12px_rgba(0,240,255,0.3)]"
            >
              LOAD IN LIVE ANALYSIS
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono font-bold transition-all"
            >
              CLOSE
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
