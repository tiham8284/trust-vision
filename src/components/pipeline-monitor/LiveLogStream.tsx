import React, { useState, useEffect } from 'react';
import { GlassCard } from '../common/GlassCard';
import { Terminal, Pause, Play, Trash2, Filter } from 'lucide-react';

interface LogEntry {
  id: string;
  time: string;
  level: 'INFO' | 'WARN' | 'ALERT' | 'DEBUG';
  source: string;
  message: string;
}

const INITIAL_LOGS: LogEntry[] = [
  { id: '1', time: '14:32:01.104', level: 'INFO', source: 'INGEST', message: 'Frame payload #849102 received from RTSP:cam_01 (1080p, 60fps)' },
  { id: '2', time: '14:32:01.118', level: 'INFO', source: 'PREPROC', message: 'Normalized tensor [1, 3, 640, 640] - SNR: 38.4 dB' },
  { id: '3', time: '14:32:01.236', level: 'INFO', source: 'MODEL', message: 'Inference pass complete: 4 candidates detected with avg conf 92.4%' },
  { id: '4', time: '14:32:01.258', level: 'INFO', source: 'TRUSTVISION', message: 'Integrity audit complete: Trust Score 94/100 (TRUSTED). Action: PROCEED' },
  { id: '5', time: '14:32:02.412', level: 'WARN', source: 'TRUSTVISION', message: 'Frame #849103: Minor illumination gradient anomaly (18% delta). Status: CAUTION' },
  { id: '6', time: '14:32:03.882', level: 'ALERT', source: 'TRUSTVISION', message: 'Frame #849104: High-frequency adversarial pattern detected in sign anchor. Quarantined!' }
];

export const LiveLogStream: React.FC = () => {
  const [logs, setLogs] = useState<LogEntry[]>(INITIAL_LOGS);
  const [isPaused, setIsPaused] = useState(false);
  const [filterLevel, setFilterLevel] = useState<string>('ALL');

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      const randomSeed = Math.random();
      const now = new Date();
      const timeStr = `${now.toTimeString().split(' ')[0]}.${String(now.getMilliseconds()).padStart(3, '0')}`;
      const frameNum = Math.floor(849105 + Math.random() * 1000);

      let newLog: LogEntry;

      if (randomSeed > 0.85) {
        newLog = {
          id: String(Date.now()),
          time: timeStr,
          level: 'ALERT',
          source: 'TRUSTVISION',
          message: `Frame #${frameNum}: Adversarial gradient perturbation flagged on object anchor. Overriding raw classification.`
        };
      } else if (randomSeed > 0.65) {
        newLog = {
          id: String(Date.now()),
          time: timeStr,
          level: 'WARN',
          source: 'PREPROC',
          message: `Frame #${frameNum}: Localized lens flare detected. Dynamic exposure compensation engaged.`
        };
      } else {
        newLog = {
          id: String(Date.now()),
          time: timeStr,
          level: 'INFO',
          source: 'TRUSTVISION',
          message: `Frame #${frameNum}: Ingestion verified. Trust Score: ${Math.floor(88 + Math.random() * 10)}/100 (TRUSTED)`
        };
      }

      setLogs((prev) => [newLog, ...prev.slice(0, 30)]);
    }, 2800);

    return () => clearInterval(interval);
  }, [isPaused]);

  const filteredLogs = logs.filter((log) => {
    if (filterLevel === 'ALL') return true;
    return log.level === filterLevel;
  });

  return (
    <GlassCard className="p-6 border-cyan-500/30 font-mono text-xs">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2 text-cyan-400 font-bold">
          <Terminal className="w-4 h-4" />
          <span>LIVE INGESTION &amp; AUDIT EVENT STREAM</span>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
        </div>

        <div className="flex items-center gap-2">
          {/* Level Filter */}
          <div className="flex items-center gap-1 bg-slate-900 px-2 py-1 rounded border border-slate-800 text-[11px]">
            <Filter className="w-3 h-3 text-slate-400" />
            <select
              value={filterLevel}
              onChange={(e) => setFilterLevel(e.target.value)}
              className="bg-transparent text-slate-200 border-none outline-none cursor-pointer"
            >
              <option value="ALL" className="bg-slate-900">All Levels</option>
              <option value="INFO" className="bg-slate-900">INFO</option>
              <option value="WARN" className="bg-slate-900">WARN</option>
              <option value="ALERT" className="bg-slate-900">ALERT</option>
            </select>
          </div>

          <button
            onClick={() => setIsPaused(!isPaused)}
            className="p-1.5 rounded bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300"
            title={isPaused ? 'Resume stream' : 'Pause stream'}
          >
            {isPaused ? <Play className="w-3.5 h-3.5 text-emerald-400" /> : <Pause className="w-3.5 h-3.5 text-amber-400" />}
          </button>

          <button
            onClick={() => setLogs([])}
            className="p-1.5 rounded bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-rose-400"
            title="Clear logs"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Logs Box */}
      <div className="mt-4 max-h-56 overflow-y-auto space-y-1.5 pr-2">
        {filteredLogs.length === 0 ? (
          <div className="py-8 text-center text-slate-600">No logs matching filter.</div>
        ) : (
          filteredLogs.map((log) => {
            const levelClass =
              log.level === 'ALERT'
                ? 'text-rose-400 bg-rose-950/20 border-rose-500/30'
                : log.level === 'WARN'
                ? 'text-amber-400 bg-amber-950/20 border-amber-500/30'
                : 'text-slate-300 bg-slate-950/40 border-slate-800/60';

            return (
              <div
                key={log.id}
                className={`p-2 rounded border flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] leading-relaxed transition-all ${levelClass}`}
              >
                <div className="flex items-start sm:items-center gap-2">
                  <span className="text-slate-500 shrink-0 font-mono">{log.time}</span>
                  <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold shrink-0 ${log.level === 'ALERT' ? 'bg-rose-500/20 text-rose-300' : log.level === 'WARN' ? 'bg-amber-500/20 text-amber-300' : 'bg-slate-800 text-cyan-300'}`}>
                    [{log.level}]
                  </span>
                  <span className="text-slate-400 font-bold shrink-0">[{log.source}]</span>
                  <span className="text-slate-200">{log.message}</span>
                </div>
              </div>
            );
          })
        )}
      </div>

    </GlassCard>
  );
};
