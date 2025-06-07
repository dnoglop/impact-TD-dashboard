
import { Card } from "@/components/ui/card";
import { Calendar } from "lucide-react";

export const SchedulePanel = () => {
  const appointments = [
    {
      name: "John Dominique",
      time: "10:00-10:30 am",
      status: "scheduled",
      avatar: "JD"
    },
    {
      name: "Jane Dominique", 
      time: "10:00-10:30 am",
      status: "scheduled",
      avatar: "JD"
    },
    {
      name: "John Dominique",
      time: "10:00-10:30 am", 
      status: "scheduled",
      avatar: "JD"
    }
  ];

  const calendarDays = [
    { day: 'Mon', date: '04', active: false },
    { day: 'Tue', date: '05', active: false },
    { day: 'Wed', date: '06', active: true },
    { day: 'Thu', date: '07', active: false },
    { day: 'Fri', date: '08', active: false },
    { day: 'Sat', date: '09', active: false },
    { day: 'Sun', date: '10', active: false },
  ];

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Schedule</h3>
        <div className="text-sm text-gray-600">Jan 2024</div>
      </div>

      {/* Calendar */}
      <div className="mb-6">
        <div className="grid grid-cols-7 gap-2 mb-4">
          {calendarDays.map((day, index) => (
            <div key={index} className="text-center">
              <div className="text-xs text-gray-500 mb-1">{day.day}</div>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                day.active 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}>
                {day.date}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Today's Appointments */}
      <div>
        <h4 className="text-sm font-semibold text-gray-900 mb-3">Today's Appointment</h4>
        <div className="space-y-3">
          {appointments.map((appointment, index) => (
            <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-semibold">{appointment.avatar}</span>
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-900">{appointment.name}</div>
                <div className="text-xs text-gray-500">{appointment.time}</div>
              </div>
              <Calendar className="w-4 h-4 text-gray-400" />
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};
