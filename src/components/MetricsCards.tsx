
import { Card } from "@/components/ui/card";
import { ArrowUp, ArrowDown } from "lucide-react";

export const MetricsCards = () => {
  const metrics = [
    {
      title: "Last Month Training",
      value: "72,040",
      change: "+4.87%",
      trend: "up",
      color: "bg-green-50 text-green-700",
      icon: "📚"
    },
    {
      title: "Average Training Score",
      value: "32,890",
      change: "+12.78%",
      trend: "up",
      color: "bg-blue-50 text-blue-700",
      icon: "📊"
    },
    {
      title: "Last Training Result",
      value: "31,058",
      change: "-8.45%",
      trend: "down",
      color: "bg-purple-50 text-purple-700",
      icon: "🎯"
    },
    {
      title: "Annual Spend",
      value: "$95,458",
      change: "+23.12%",
      trend: "up",
      color: "bg-orange-50 text-orange-700",
      icon: "💰"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric, index) => (
        <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 rounded-xl ${metric.color} flex items-center justify-center text-xl`}>
              {metric.icon}
            </div>
            <div className={`flex items-center space-x-1 text-sm font-medium ${
              metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
            }`}>
              {metric.trend === 'up' ? (
                <ArrowUp className="w-4 h-4" />
              ) : (
                <ArrowDown className="w-4 h-4" />
              )}
              <span>{metric.change}</span>
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</h3>
            <p className="text-sm text-gray-600">{metric.title}</p>
          </div>
        </Card>
      ))}
    </div>
  );
};
