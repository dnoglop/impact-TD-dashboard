
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useGeminiInsights = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const generateInsights = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('gemini-insights');

      if (error) throw error;

      toast({
        title: "Insights gerados",
        description: `${data.insights} novos insights foram gerados pela IA.`,
      });

      return data;
    } catch (error) {
      console.error('Erro ao gerar insights:', error);
      toast({
        title: "Erro ao gerar insights",
        description: "Não foi possível gerar insights com a IA Gemini.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { generateInsights, isLoading };
};
