
import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { MetricsCards } from "@/components/MetricsCards";
import { PerformanceChart } from "@/components/PerformanceChart";
import { CorrelationChart } from "@/components/CorrelationChart";
import { SchedulePanel } from "@/components/SchedulePanel";
import { InsightsPanel } from "@/components/InsightsPanel";
import { TrainingList } from "@/components/TrainingList";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="flex-1 flex flex-col">
        <Header />
        
        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Welcome Section */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome back, Owen Santos!
              </h1>
              <p className="text-gray-600">
                Here's your training and development impact overview
              </p>
            </div>

            {/* Metrics Overview */}
            <MetricsCards />

            {/* Main Dashboard Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - Charts */}
              <div className="lg:col-span-2 space-y-6">
                <PerformanceChart />
                <CorrelationChart />
                <TrainingList />
              </div>

              {/* Right Column - Schedule & Insights */}
              <div className="space-y-6">
                <SchedulePanel />
                <InsightsPanel />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
