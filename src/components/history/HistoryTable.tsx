import React, { useState, useEffect } from 'react';
import { AnalysisHistoryItem, DemoScenarioId } from '../../types';
import { getHistory, deleteHistoryItem, clearHistory } from '../../services/historyStorage';
import { GlassCard } from '../common/GlassCard';
import { HistoryDetailModal } from './HistoryDetailModal';
import { 
  History as HistoryIcon, 
  Search, 
  Filter, 
  Trash2, 
  Eye, 
  ShieldCheck, 
  AlertTriangle, 
  ShieldAlert, 
  RefreshCw,
  FileSpreadsheet
} from 'lucide-react';

interface HistoryTableProps {
  onLoadScenario: (scenarioId: DemoScenarioId) => void;
}

export const HistoryTable: React.FC<HistoryTableProps> = ({ onLoadScenario }) => {
  const [history, setHistory] = useState<AnalysisHistoryItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [selectedItem, setSelectedItem] = useState<AnalysisHistoryItem | null>(null);

  useEffect(() => {
    setHistory(getHistory());
  }, []);

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = deleteHistoryItem(id);
    setHistory(updated);
  };

  const handleClear = () => {
    if (confirm('Reset history to initial sample records?')) {
      clearHistory();
      setHistory(getHistory());
    }
  };

  const filteredHistory = history.filter((item) => {
    const matchesSearch =
      item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.imageName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'ALL' || item.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleReplay = (item: AnalysisHistoryItem) => {
    setSelectedItem(null);
    if (item.scenarioId) {
      onLoadScenario(item.scenarioId);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-xs font-mono text-cyan-300 uppercase tracking-widest mb-2">
            <HistoryIcon className="w-3.5 h-3.5" />
            COMPLIANCE AUDIT LOG
          </div>
          <h2 className="text-3xl font-extrabold text-white font-display tracking-tight">
            Analysis History &amp; Integrity Records
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Persisted verification records stored in local audit ledger.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleClear}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-rose-400 text-xs font-mono transition-all"
          >
            <RefreshCw className="w-3 h-3" />
            <span>RESET AUDIT LOG</span>
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <GlassCard className="p-4 border-cyan-500/20">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Search box */}
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search by ID (e.g. TV-1048) or filename..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-500/60"
            />
          </div>

          {/* Status filter pills */}
          <div className="flex items-center gap-1.5 text-xs font-mono w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
            {['ALL', 'TRUSTED', 'CAUTION', 'HIGH_RISK'].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all shrink-0 ${
                  statusFilter === st
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-[0_0_10px_rgba(0,240,255,0.2)]'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {st.replace('_', ' ')}
              </button>
            ))}
          </div>

        </div>
      </GlassCard>

      {/* History Table */}
      <GlassCard className="p-0 overflow-hidden border-cyan-500/20">
        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs">
            <thead>
              <tr className="bg-slate-950/80 border-b border-slate-800 text-slate-400 uppercase tracking-wider text-[11px]">
                <th className="py-3.5 px-4 font-bold">Analysis ID</th>
                <th className="py-3.5 px-4 font-bold">Timestamp</th>
                <th className="py-3.5 px-4 font-bold">Visual Input</th>
                <th className="py-3.5 px-4 font-bold text-center">Trust Score</th>
                <th className="py-3.5 px-4 font-bold">Risk Level</th>
                <th className="py-3.5 px-4 font-bold">Status</th>
                <th className="py-3.5 px-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredHistory.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-500">
                    No matching analysis records found.
                  </td>
                </tr>
              ) : (
                filteredHistory.map((item) => {
                  const isTrusted = item.status === 'TRUSTED';
                  const isCaution = item.status === 'CAUTION';

                  const badgeStyle = isTrusted
                    ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30'
                    : isCaution
                    ? 'text-amber-400 bg-amber-500/10 border-amber-500/30'
                    : 'text-rose-400 bg-rose-500/10 border-rose-500/30';

                  return (
                    <tr
                      key={item.id}
                      onClick={() => setSelectedItem(item)}
                      className="hover:bg-slate-900/50 cursor-pointer transition-colors"
                    >
                      <td className="py-3.5 px-4 font-bold text-cyan-300">
                        {item.id}
                      </td>
                      <td className="py-3.5 px-4 text-slate-400">
                        {item.timestamp}
                      </td>
                      <td className="py-3.5 px-4 text-slate-200 font-sans font-medium">
                        {item.imageName}
                      </td>
                      <td className="py-3.5 px-4 text-center font-black text-sm">
                        <span className={isTrusted ? 'text-emerald-400' : isCaution ? 'text-amber-400' : 'text-rose-400'}>
                          {item.trustScore}
                        </span>
                        <span className="text-slate-600 text-[10px] font-normal">/100</span>
                      </td>
                      <td className="py-3.5 px-4 text-slate-300">
                        {item.riskLevel}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${badgeStyle}`}>
                          {item.status.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                          <button
                            onClick={() => setSelectedItem(item)}
                            className="p-1.5 rounded hover:bg-slate-800 text-slate-400 hover:text-cyan-300 transition-colors"
                            title="Inspect details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={(e) => handleDelete(item.id, e)}
                            className="p-1.5 rounded hover:bg-slate-800 text-slate-500 hover:text-rose-400 transition-colors"
                            title="Delete log"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </GlassCard>

      {/* History Detail Modal */}
      <HistoryDetailModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
        onReplay={handleReplay}
      />

    </div>
  );
};
