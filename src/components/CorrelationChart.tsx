
import { Card } from "@/components/ui/card";
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';

export const CorrelationChart = () => {
  const correlationData = [
    { x: 65, y: 78, name: 'Technical Training', size: 20 },
    { x: 72, y: 82, name: 'Leadership Program', size: 35 },
    { x: 68, y: 75, name: 'Soft Skills', size: 25 },
    { x: 85, y: 88, name: 'Sales Training', size: 40 },
    { x: 92, y: 94, name: 'Digital Skills', size: 30 },
    { x: 78, y: 85, name: 'Compliance', size: 15 },
    { x: 45, y: 52, name: 'Basic Training', size: 18 },
    { x: 88, y: 91, name: 'Advanced Tech', size: 28 },
  ];

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Visit Statistics</h3>
          <div className="flex items-center space-x-6 mt-2">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">89</div>
              <div className="text-sm text-gray-600">In Person</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">20</div>
              <div className="text-sm text-gray-600">Video Call</div>
            </div>
          </div>
        </div>
        <select className="text-sm border rounded-lg px-3 py-1 bg-white">
          <option>Today</option>
          <option>This Week</option>
          <option>This Month</option>
        </select>
      </div>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart data={correlationData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              type="number" 
              dataKey="x" 
              domain={['dataMin - 5', 'dataMax + 5']}
              axisLine={false} 
              tickLine={false}
            />
            <YAxis 
              type="number" 
              dataKey="y" 
              domain={['dataMin - 5', 'dataMax + 5']}
              axisLine={false} 
              tickLine={false}
            />
            <Tooltip 
              formatter={(value, name) => [value, name]}
              labelFormatter={(label) => `Point: ${label}`}
            />
            <Scatter 
              dataKey="y" 
              fill="#3b82f6"
              fillOpacity={0.6}
            />
            <Scatter 
              dataKey="y" 
              fill="#ef4444"
              fillOpacity={0.6}
            />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
