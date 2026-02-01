import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const WeatherChart = ({ data }) => {
  return (
    <div className="h-64 w-full bg-white p-4 rounded-xl shadow-sm">
      <h3 className="text-gray-600 mb-4 font-semibold">Temperature Trend</h3>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="time" />
          <YAxis unit="°" />
          <Tooltip />
          <Area 
            type="monotone" 
            dataKey="temp" 
            stroke="#8884d8" 
            fillOpacity={1} 
            fill="url(#colorTemp)" 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};