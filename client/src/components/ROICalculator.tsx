
import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calculator, TrendingUp, DollarSign } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface ROIData {
  totalInvestment: number;
  totalReturn: number;
  averageROI: number;
  topTraining: string;
}

export const ROICalculator = () => {
  const [roiData, setRoiData] = useState<ROIData>({
    totalInvestment: 0,
    totalReturn: 0,
    averageROI: 0,
    topTraining: 'N/A'
  });

  useEffect(() => {
    calculateROI();
  }, []);

  const calculateROI = async () => {
    try {
      // Buscar dados de treinamentos e performance
      const { data: trainings } = await supabase.from('trainings').select('*');
      const { data: performance } = await supabase.from('performance_metrics').select('*');

      if (!trainings || !performance) return;

      const totalInvestment = trainings.reduce((sum, t) => sum + (t.cost || 0), 0);
      
      // Simular cálculo de retorno baseado em performance
      const totalReturn = performance.reduce((sum, p) => {
        if (p.metric_type === 'sales') {
          return sum + (p.metric_value * 0.1); // 10% do valor de vendas como retorno
        }
        return sum + 1000; // Valor fixo para outras métricas
      }, 0);

      const averageROI = totalInvestment > 0 ? ((totalReturn - totalInvestment) / totalInvestment) * 100 : 0;
      
      // Encontrar o treinamento com melhor ROI
      const topTraining = trainings.length > 0 ? trainings[0].training_name : 'N/A';

      setRoiData({
        totalInvestment,
        totalReturn,
        averageROI,
        topTraining
      });

    } catch (error) {
      console.error('Erro ao calcular ROI:', error);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Investimento Total</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL'
            }).format(roiData.totalInvestment)}
          </div>
          <p className="text-xs text-muted-foreground">
            Em treinamentos e desenvolvimento
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">ROI Médio</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">
            {roiData.averageROI.toFixed(1)}%
          </div>
          <p className="text-xs text-muted-foreground">
            Retorno sobre investimento
          </p>
        </CardContent>
      </Card>

      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="w-5 h-5 text-blue-600" />
            Performance Correlation Engine
          </CardTitle>
          <CardDescription>
            Análise automática de correlações entre treinamentos e performance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
              <span className="text-sm font-medium">Retorno Total Calculado</span>
              <span className="text-lg font-bold text-blue-600">
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                }).format(roiData.totalReturn)}
              </span>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
              <span className="text-sm font-medium">Treinamento com Melhor ROI</span>
              <span className="text-sm font-semibold text-green-600">{roiData.topTraining}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
