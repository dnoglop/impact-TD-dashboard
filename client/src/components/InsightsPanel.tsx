
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const InsightsPanel = () => {
  const insights = [
    {
      date: "4th Jan 2024",
      title: "The Efficiency of Economics in cold weather is good..",
      category: "Tech Ads",
      color: "bg-purple-100",
      image: "💊"
    },
    {
      title: "Goals for 2024:",
      items: [
        "Improve patient care",
        "Increase efficiency", 
        "Work-life balance",
        "Community involvement"
      ],
      color: "bg-blue-100"
    }
  ];

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Notes</h3>
        <Button variant="ghost" size="sm">
          View All
        </Button>
      </div>

      <div className="space-y-4">
        {/* First Insight */}
        <div className={`p-4 rounded-xl ${insights[0].color}`}>
          <div className="flex items-start space-x-3">
            <div className="text-2xl">{insights[0].image}</div>
            <div className="flex-1">
              <div className="text-xs text-gray-500 mb-1">{insights[0].date}</div>
              <div className="text-sm font-medium text-gray-900 mb-2">
                {insights[0].title}
              </div>
              <div className="text-xs bg-white px-2 py-1 rounded-full inline-block">
                {insights[0].category}
              </div>
            </div>
          </div>
        </div>

        {/* Second Insight */}
        <div className={`p-4 rounded-xl ${insights[1].color}`}>
          <div className="text-sm font-medium text-gray-900 mb-3">
            {insights[1].title}
          </div>
          <ul className="space-y-2">
            {insights[1].items?.map((item, index) => (
              <li key={index} className="flex items-center space-x-2 text-sm text-gray-700">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Team Photo */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-4 text-white">
          <div className="flex items-center space-x-3 mb-3">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 bg-white rounded-full border-2 border-white"></div>
              <div className="w-8 h-8 bg-white rounded-full border-2 border-white"></div>
              <div className="w-8 h-8 bg-white rounded-full border-2 border-white"></div>
            </div>
          </div>
          <div className="text-sm font-medium">Team Performance</div>
          <div className="text-xs opacity-90 mt-1">Monthly review completed</div>
        </div>
      </div>
    </Card>
  );
};
