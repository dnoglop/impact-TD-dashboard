
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Calendar, 
  Settings, 
  BarChart3,
  Brain
} from "lucide-react";

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Sidebar = ({ activeTab, setActiveTab }: SidebarProps) => {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "appointments", label: "Treinamentos", icon: Calendar },
    { id: "analytics", label: "Analytics & IA", icon: BarChart3 },
    { id: "settings", label: "Integrações", icon: Settings },
  ];

  return (
    <div className="w-64 bg-gray-900 text-white flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Brain className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-semibold">T&D Tracker</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6">
        <div className="space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors",
                activeTab === item.id
                  ? "bg-blue-600 text-white"
                  : "text-gray-300 hover:bg-gray-800 hover:text-white"
              )}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </div>

        {/* Performance Score */}
        <div className="mt-8 pt-6 border-t border-gray-700">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">
            Score T&D Atual
          </h3>
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-4">
            <div className="text-2xl font-bold text-white">87</div>
            <div className="text-xs text-blue-100">Impacto T&D (0-100)</div>
            <div className="mt-2 bg-white/20 rounded-full h-2">
              <div className="bg-white rounded-full h-2 w-[87%]"></div>
            </div>
          </div>
        </div>
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <span className="text-white font-semibold text-sm">AD</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">Admin T&D</p>
            <p className="text-xs text-gray-400 truncate">Gestor de Treinamento</p>
          </div>
        </div>
      </div>
    </div>
  );
};
