
import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { MetricsCards } from "@/components/MetricsCards";
import { PerformanceChart } from "@/components/PerformanceChart";
import { CorrelationChart } from "@/components/CorrelationChart";
import { SchedulePanel } from "@/components/SchedulePanel";
import { InsightsPanel } from "@/components/InsightsPanel";
import { TrainingList } from "@/components/TrainingList";
import { GoogleSheetsIntegration } from "@/components/GoogleSheetsIntegration";
import { AIInsightsPanel } from "@/components/AIInsightsPanel";
import { ROICalculator } from "@/components/ROICalculator";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <div className="space-y-6">
            {/* Welcome Section */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                T&D Impact Tracker
              </h1>
              <p className="text-gray-600">
                Dashboard inteligente de ROI para Treinamento e Desenvolvimento
              </p>
            </div>

            {/* Metrics Overview */}
            <MetricsCards />

            {/* ROI Calculator */}
            <ROICalculator />

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
        );

      case "analytics":
        return (
          <div className="space-y-6">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Analytics & Insights
              </h1>
              <p className="text-gray-600">
                Análises avançadas e insights gerados por IA
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-6">
                <GoogleSheetsIntegration />
                <PerformanceChart />
              </div>
              <div className="space-y-6">
                <AIInsightsPanel />
                <CorrelationChart />
              </div>
            </div>
          </div>
        );

      case "settings":
        return (
          <div className="space-y-6">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Configurações
              </h1>
              <p className="text-gray-600">
                Gerencie integrações e configurações do sistema
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <GoogleSheetsIntegration />
              <AIInsightsPanel />
            </div>
          </div>
        );

      default:
        return (
          <div className="space-y-6">
            <MetricsCards />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <PerformanceChart />
                <TrainingList />
              </div>
              <div className="space-y-6">
                <SchedulePanel />
                <InsightsPanel />
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="flex-1 flex flex-col">
        <Header />
        
        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
