import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const Chart = ({ data, type = 'area', dataKey, color, title, unit = '' }) => {
  return (
    <div className="glass-panel" style={{ padding: '1.5rem', height: '400px' }}>
      <h3 style={{ margin: '0 0 1.5rem', fontSize: '1.25rem', color: 'var(--text-secondary)', fontWeight: 500 }}>{title}</h3>
      <div style={{ width: '100%', height: 'calc(100% - 40px)' }}>
        <ResponsiveContainer>
          {type === 'area' ? (
            <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id={`gradient-${dataKey}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={color} stopOpacity={0.6}/>
                  <stop offset="95%" stopColor={color} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis 
                dataKey="time" 
                stroke="var(--text-muted)" 
                fontSize={12} 
                tickLine={false}
                axisLine={false}
                dy={10}
              />
              <YAxis 
                stroke="var(--text-muted)" 
                fontSize={12} 
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}${unit}`}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(15, 23, 42, 0.9)', 
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '12px',
                  color: '#f8fafc',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
                  padding: '12px'
                }}
                itemStyle={{ color: '#fff' }}
                cursor={{ stroke: 'rgba(255,255,255,0.2)', strokeWidth: 2 }}
              />
              <Area 
                type="monotone" 
                dataKey={dataKey} 
                stroke={color} 
                strokeWidth={3}
                fillOpacity={1} 
                fill={`url(#gradient-${dataKey})`} 
              />
            </AreaChart>
          ) : (
            <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
               <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
               <XAxis 
                dataKey="time" 
                stroke="var(--text-muted)" 
                fontSize={12} 
                tickLine={false}
                axisLine={false}
                dy={10}
              />
              <YAxis 
                stroke="var(--text-muted)" 
                fontSize={12} 
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}${unit}`}
              />
              <Tooltip 
                cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                contentStyle={{ 
                  backgroundColor: 'rgba(15, 23, 42, 0.9)', 
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '12px',
                  color: '#f8fafc',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
                  padding: '12px'
                }}
              />
               <Bar dataKey={dataKey} fill={color} radius={[6, 6, 0, 0]} />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Chart;
