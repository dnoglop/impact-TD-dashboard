
import { Search, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Header = () => {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Navigation Tabs */}
        <div className="flex items-center space-x-8">
          <button className="px-4 py-2 bg-gray-900 text-white rounded-full text-sm font-medium">
            Dashboard
          </button>
          <button className="px-4 py-2 text-gray-600 hover:text-gray-900 text-sm font-medium">
            Appointment
          </button>
          <button className="px-4 py-2 text-gray-600 hover:text-gray-900 text-sm font-medium">
            Patients
          </button>
          <button className="px-4 py-2 text-gray-600 hover:text-gray-900 text-sm font-medium">
            Telemedicine
          </button>
        </div>

        {/* Search and Actions */}
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <Input
              placeholder="Search..."
              className="pl-10 w-64 bg-gray-50 border-0"
            />
          </div>
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Add New
          </Button>
        </div>
      </div>
    </header>
  );
};
