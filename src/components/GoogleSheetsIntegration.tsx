
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, Sheet, RefreshCw } from 'lucide-react';
import { useGoogleSheetsSync } from '@/hooks/useGoogleSheetsSync';

export const GoogleSheetsIntegration = () => {
  const [sheetId, setSheetId] = useState('');
  const [sheetName, setSheetName] = useState('');
  const [syncType, setSyncType] = useState<'employees' | 'trainings' | 'performance'>('employees');
  const { syncGoogleSheets, isLoading } = useGoogleSheetsSync();

  const handleSync = async () => {
    if (!sheetId || !sheetName) {
      return;
    }
    await syncGoogleSheets(sheetId, sheetName, syncType);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sheet className="w-5 h-5 text-green-600" />
          Integração Google Sheets
        </CardTitle>
        <CardDescription>
          Sincronize dados de funcionários, treinamentos e performance automaticamente
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-medium mb-2 block">ID da Planilha</label>
          <Input
            placeholder="1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms"
            value={sheetId}
            onChange={(e) => setSheetId(e.target.value)}
          />
        </div>
        
        <div>
          <label className="text-sm font-medium mb-2 block">Nome da Aba</label>
          <Input
            placeholder="Funcionários"
            value={sheetName}
            onChange={(e) => setSheetName(e.target.value)}
          />
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">Tipo de Dados</label>
          <Select value={syncType} onValueChange={(value: any) => setSyncType(value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="employees">Funcionários</SelectItem>
              <SelectItem value="trainings">Treinamentos</SelectItem>
              <SelectItem value="performance">Métricas de Performance</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button 
          onClick={handleSync} 
          disabled={isLoading || !sheetId || !sheetName}
          className="w-full"
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <RefreshCw className="w-4 h-4 mr-2" />
          )}
          Sincronizar Dados
        </Button>
      </CardContent>
    </Card>
  );
};
