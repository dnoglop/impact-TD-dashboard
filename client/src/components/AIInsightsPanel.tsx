
import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Brain, Lightbulb, TrendingUp, Target, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useGeminiInsights } from '@/hooks/useGeminiInsights';

interface AIInsight {
  id: string;
  insight_type: string;
  title: string;
  description: string;
  confidence_score: number;
  impact_score: number;
  created_at: string;
}

export const AIInsightsPanel = () => {
  const [insights, setInsights] = useState<AIInsight[]>([]);
  const [loading, setLoading] = useState(true);
  const { generateInsights, isLoading: isGenerating } = useGeminiInsights();

  useEffect(() => {
    fetchInsights();
  }, []);

  const fetchInsights = async () => {
    try {
      const { data, error } = await supabase
        .from('ai_insights')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) throw error;
      setInsights(data || []);
    } catch (error) {
      console.error('Erro ao buscar insights:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateInsights = async () => {
    await generateInsights();
    await fetchInsights();
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'correlation':
        return <TrendingUp className="w-4 h-4" />;
      case 'prediction':
        return <Target className="w-4 h-4" />;
      case 'recommendation':
        return <Lightbulb className="w-4 h-4" />;
      default:
        return <Brain className="w-4 h-4" />;
    }
  };

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'correlation':
        return 'bg-blue-100 text-blue-800';
      case 'prediction':
        return 'bg-purple-100 text-purple-800';
      case 'recommendation':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center p-6">
          <Loader2 className="w-6 h-6 animate-spin" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-purple-600" />
              Insights da IA
            </CardTitle>
            <CardDescription>
              Descobertas automáticas geradas pela IA Gemini
            </CardDescription>
          </div>
          <Button 
            onClick={handleGenerateInsights}
            disabled={isGenerating}
            size="sm"
          >
            {isGenerating ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Brain className="w-4 h-4 mr-2" />
            )}
            Gerar Insights
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {insights.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Brain className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Nenhum insight disponível.</p>
              <p className="text-sm">Clique em "Gerar Insights" para começar a análise.</p>
            </div>
          ) : (
            insights.map((insight) => (
              <div key={insight.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    {getInsightIcon(insight.insight_type)}
                    <h4 className="font-medium text-sm">{insight.title}</h4>
                  </div>
                  <Badge className={getInsightColor(insight.insight_type)}>
                    {insight.insight_type}
                  </Badge>
                </div>
                
                <p className="text-sm text-gray-600">{insight.description}</p>
                
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span>Confiança: {insight.confidence_score}%</span>
                  <span>Impacto: {insight.impact_score}%</span>
                  <span>{new Date(insight.created_at).toLocaleDateString('pt-BR')}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};
