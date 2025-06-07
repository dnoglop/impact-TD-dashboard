
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const TrainingList = () => {
  const trainings = [
    {
      id: "72306",
      student: "Sarah Scott",
      course: "Introduction to Python Programming",
      price: "$247.00",
      method: "Credit Card",
      status: "Completed",
      statusColor: "bg-green-100 text-green-800"
    },
    {
      id: "72305", 
      student: "Mark Blue",
      course: "Machine Learning and Applications",
      price: "$657.00",
      method: "Bank Transfer",
      status: "In Progress",
      statusColor: "bg-blue-100 text-blue-800"
    },
    {
      id: "72304",
      student: "Betty Wilson",
      course: "Everything About Frontend Machine Learning",
      price: "$867.00", 
      method: "Credit Card",
      status: "Pending",
      statusColor: "bg-yellow-100 text-yellow-800"
    }
  ];

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Transaction</h3>
        <button className="text-sm text-blue-600 hover:text-blue-700">View All</button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-sm text-gray-500 border-b">
              <th className="pb-3 font-medium">Customer Name</th>
              <th className="pb-3 font-medium">Course</th>
              <th className="pb-3 font-medium">Price</th>
              <th className="pb-3 font-medium">Payment Method</th>
              <th className="pb-3 font-medium">Status</th>
              <th className="pb-3 font-medium">Action</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {trainings.map((training, index) => (
              <tr key={training.id} className="border-b border-gray-100">
                <td className="py-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-semibold">
                        {training.student.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{training.student}</div>
                      <div className="text-gray-500">#{training.id}</div>
                    </div>
                  </div>
                </td>
                <td className="py-4">
                  <div className="max-w-xs truncate text-gray-900">{training.course}</div>
                </td>
                <td className="py-4 font-medium text-gray-900">{training.price}</td>
                <td className="py-4 text-gray-600">{training.method}</td>
                <td className="py-4">
                  <Badge className={training.statusColor}>
                    {training.status}
                  </Badge>
                </td>
                <td className="py-4">
                  <div className="flex space-x-2">
                    <button className="w-8 h-8 rounded-lg bg-green-100 text-green-600 flex items-center justify-center text-xs">
                      ✓
                    </button>
                    <button className="w-8 h-8 rounded-lg bg-red-100 text-red-600 flex items-center justify-center text-xs">
                      ✕
                    </button>
                    <button className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center text-xs">
                      👁
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};
