
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useGoogleSheetsSync = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const syncGoogleSheets = async (sheetId: string, sheetName: string, syncType: 'employees' | 'trainings' | 'performance') => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('google-sheets-sync', {
        body: { sheetId, sheetName, syncType }
      });

      if (error) throw error;

      toast({
        title: "Sincronização concluída",
        description: `${data.syncedRecords} registros sincronizados com sucesso.`,
      });

      return data;
    } catch (error) {
      console.error('Erro na sincronização:', error);
      toast({
        title: "Erro na sincronização",
        description: "Não foi possível sincronizar os dados do Google Sheets.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { syncGoogleSheets, isLoading };
};
