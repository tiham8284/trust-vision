import React from 'react';
import { RiskFactor } from '../../types';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  Cell, 
  ReferenceLine 
} from 'recharts';

interface RiskWaterfallChartProps {
  riskFactors: RiskFactor[];
  finalScore: number;
}

export const RiskWaterfallChart: React.FC<RiskWaterfallChartProps> = ({
  riskFactors,
  finalScore
}) => {
  const chartData = riskFactors.map((rf) => ({
    name: rf.name,
    impact: rf.impact,
    description: rf.description,
    category: rf.category,
    fillColor: rf.impact >= 0 ? '#10b981' : '#ef4444'
  }));

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="p-3 rounded-lg bg-slate-900 border border-slate-700 shadow-xl text-xs font-mono">
          <div className="font-bold text-white mb-1">{data.name}</div>
          <div className={`font-bold ${data.impact >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
            Contribution: {data.impact >= 0 ? `+${data.impact}` : data.impact} pts
          </div>
          <div className="text-[11px] text-slate-400 mt-1 max-w-xs">{data.description}</div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-xs font-mono">
        <span className="text-slate-400 font-bold uppercase tracking-wider">
          SCORE CONTRIBUTION BREAKDOWN (POINTS)
        </span>
        <span className="text-cyan-400 font-bold">
          SUM TOTAL: {finalScore}/100
        </span>
      </div>

      <div className="h-52 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
          >
            <XAxis
              type="number"
              domain={[-30, 30]}
              stroke="#64748b"
              fontSize={10}
              tickLine={false}
              tickFormatter={(val) => `${val > 0 ? '+' : ''}${val}`}
            />
            <YAxis
              type="category"
              dataKey="name"
              stroke="#94a3b8"
              fontSize={11}
              width={140}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine x={0} stroke="#475569" strokeDasharray="3 3" />
            <Bar dataKey="impact" radius={[4, 4, 4, 4]}>
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.fillColor}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center justify-center gap-6 text-[11px] font-mono text-slate-400 pt-1 border-t border-slate-800">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500"></span>
          <span>Positive Integrity Trust (+)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-sm bg-rose-500"></span>
          <span>Penalty Risk Factor (-)</span>
        </div>
      </div>
    </div>
  );
};
