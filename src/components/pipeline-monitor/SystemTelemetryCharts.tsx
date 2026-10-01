import React from 'react';
import { GlassCard } from '../common/GlassCard';
import { 
  AreaChart, 
  Area, 
  PieChart, 
  Pie, 
  Cell, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  CartesianGrid, 
  Legend 
} from 'recharts';
import { Activity, Clock, ShieldCheck, AlertOctagon, Cpu } from 'lucide-react';

export const SystemTelemetryCharts: React.FC = () => {
  // 24 Hour Activity Data
  const activityData = [
    { hour: '00:00', analyses: 32, threats: 0 },
    { hour: '02:00', analyses: 24, threats: 0 },
    { hour: '04:00', analyses: 18, threats: 1 },
    { hour: '06:00', analyses: 45, threats: 0 },
    { hour: '08:00', analyses: 88, threats: 2 },
    { hour: '10:00', analyses: 142, threats: 3 },
    { hour: '12:00', analyses: 198, threats: 4 },
    { hour: '14:00', analyses: 184, threats: 2 },
    { hour: '16:00', analyses: 165, threats: 3 },
    { hour: '18:00', analyses: 130, threats: 1 },
    { hour: '20:00', analyses: 95, threats: 1 },
    { hour: '22:00', analyses: 64, threats: 0 },
  ];

  // Risk Distribution Data (Donut)
  const riskDistributionData = [
    { name: 'Trusted (Low Risk)', value: 1128, color: '#10b981' },
    { name: 'Caution (Medium Risk)', value: 139, color: '#f59e0b' },
    { name: 'Blocked (High Risk / Threat)', value: 17, color: '#ef4444' },
  ];

  // Pipeline Latency Trends
  const latencyData = [
    { time: '12:00', avgLatency: 142, p95Latency: 188 },
    { time: '12:10', avgLatency: 138, p95Latency: 180 },
    { time: '12:20', avgLatency: 145, p95Latency: 192 },
    { time: '12:30', avgLatency: 152, p95Latency: 205 },
    { time: '12:40', avgLatency: 141, p95Latency: 184 },
    { time: '12:50', avgLatency: 139, p95Latency: 181 },
  ];

  return (
    <div className="space-y-6">
      
      {/* Top 5 System Health Counters */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        
        <GlassCard className="p-4 border-cyan-500/20">
          <div className="text-[10px] font-mono text-slate-400 font-bold uppercase mb-1">PIPELINE HEALTH</div>
          <div className="text-xl font-black font-mono text-emerald-400">98.7%</div>
          <div className="text-[10px] text-slate-500 mt-1">0 packet drops</div>
        </GlassCard>

        <GlassCard className="p-4 border-cyan-500/20">
          <div className="text-[10px] font-mono text-slate-400 font-bold uppercase mb-1">AVG INFERENCE LATENCY</div>
          <div className="text-xl font-black font-mono text-cyan-300">182 ms</div>
          <div className="text-[10px] text-slate-500 mt-1">p95: 205 ms</div>
        </GlassCard>

        <GlassCard className="p-4 border-cyan-500/20">
          <div className="text-[10px] font-mono text-slate-400 font-bold uppercase mb-1">INTEGRITY CHECKS</div>
          <div className="text-xl font-black font-mono text-slate-100">1,284</div>
          <div className="text-[10px] text-slate-500 mt-1">24h rolling total</div>
        </GlassCard>

        <GlassCard className="p-4 border-amber-500/20">
          <div className="text-[10px] font-mono text-slate-400 font-bold uppercase mb-1">ANOMALIES FLAGGED</div>
          <div className="text-xl font-black font-mono text-amber-400">17</div>
          <div className="text-[10px] text-slate-500 mt-1">1.3% anomaly rate</div>
        </GlassCard>

        <GlassCard className="p-4 border-rose-500/20">
          <div className="text-[10px] font-mono text-slate-400 font-bold uppercase mb-1">CRITICAL ALERTS</div>
          <div className="text-xl font-black font-mono text-rose-400">2</div>
          <div className="text-[10px] text-slate-500 mt-1">Adversarial quarantined</div>
        </GlassCard>

      </div>

      {/* Main Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* 24-Hour Activity Area Chart */}
        <div className="lg:col-span-8">
          <GlassCard className="p-6 border-cyan-500/30">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white flex items-center gap-2">
                  <Activity className="w-4 h-4 text-cyan-400" />
                  24-HOUR ANALYSIS &amp; THREAT ACTIVITY
                </h4>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Visual frame ingestion volume vs intercepted integrity hazards.
                </p>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                SAMPLE DATA
              </span>
            </div>

            <div className="h-64 w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={activityData} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="analysesGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stop-color="#0284c7" stop-opacity={0.4}/>
                      <stop offset="95%" stop-color="#0284c7" stop-opacity={0}/>
                    </linearGradient>
                    <linearGradient id="threatsGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stop-color="#ef4444" stop-opacity={0.6}/>
                      <stop offset="95%" stop-color="#ef4444" stop-opacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="hour" stroke="#64748b" fontSize={11} />
                  <YAxis stroke="#64748b" fontSize={11} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#090d16', borderColor: '#334155', borderRadius: '8px', fontSize: '11px', fontFamily: 'monospace' }}
                  />
                  <Legend wrapperStyle={{ fontSize: '11px', fontFamily: 'monospace', paddingTop: '10px' }} />
                  <Area type="monotone" dataKey="analyses" name="Ingested Frames" stroke="#38bdf8" fillOpacity={1} fill="url(#analysesGrad)" />
                  <Area type="monotone" dataKey="threats" name="Threats Intercepted" stroke="#ef4444" fillOpacity={1} fill="url(#threatsGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>
        </div>

        {/* Risk Distribution Donut Chart */}
        <div className="lg:col-span-4">
          <GlassCard className="p-6 border-cyan-500/30 flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
                  RISK DISTRIBUTION
                </h4>
                <span className="text-[10px] font-mono text-cyan-400">TOTAL: 1,284</span>
              </div>

              <div className="h-48 w-full mt-3 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={riskDistributionData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={75}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {riskDistributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{ backgroundColor: '#090d16', borderColor: '#334155', borderRadius: '8px', fontSize: '11px', fontFamily: 'monospace' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Legend Breakdown */}
            <div className="space-y-2 pt-2 border-t border-slate-800 text-xs font-mono">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-slate-300">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                  Trusted
                </span>
                <span className="text-slate-100 font-bold">1,128 (87.8%)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-slate-300">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
                  Caution
                </span>
                <span className="text-slate-100 font-bold">139 (10.8%)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-slate-300">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                  High Risk
                </span>
                <span className="text-slate-100 font-bold">17 (1.3%)</span>
              </div>
            </div>
          </GlassCard>
        </div>

      </div>

    </div>
  );
};
