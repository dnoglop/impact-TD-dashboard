
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
    )

    const { sheetId, sheetName, syncType } = await req.json()

    // Simular dados do Google Sheets para demonstração
    let data = []
    
    if (syncType === 'employees') {
      data = [
        { employee_id: 'EMP001', name: 'João Silva', department: 'Vendas', position: 'Vendedor Sênior', hire_date: '2022-01-15' },
        { employee_id: 'EMP002', name: 'Maria Santos', department: 'Marketing', position: 'Analista de Marketing', hire_date: '2021-03-20' },
        { employee_id: 'EMP003', name: 'Pedro Costa', department: 'TI', position: 'Desenvolvedor', hire_date: '2020-08-10' },
        { employee_id: 'EMP004', name: 'Ana Oliveira', department: 'RH', position: 'Especialista em RH', hire_date: '2021-11-05' },
      ]
    } else if (syncType === 'trainings') {
      data = [
        { training_name: 'Técnicas de Vendas Avançadas', category: 'Vendas', duration_hours: 16, cost: 1500.00, provider: 'TrainCorp', training_date: '2024-01-15' },
        { training_name: 'Liderança e Gestão de Equipes', category: 'Liderança', duration_hours: 24, cost: 2500.00, provider: 'LeadershipPro', training_date: '2024-02-10' },
        { training_name: 'Marketing Digital', category: 'Marketing', duration_hours: 20, cost: 1800.00, provider: 'DigitalAcademy', training_date: '2024-03-05' },
        { training_name: 'Desenvolvimento em React', category: 'Tecnologia', duration_hours: 32, cost: 3000.00, provider: 'TechSkills', training_date: '2024-01-20' },
      ]
    } else if (syncType === 'performance') {
      data = [
        { employee_id: 'EMP001', metric_type: 'sales', metric_value: 45000, metric_date: '2024-01-31', period_type: 'monthly' },
        { employee_id: 'EMP001', metric_type: 'sales', metric_value: 52000, metric_date: '2024-02-29', period_type: 'monthly' },
        { employee_id: 'EMP002', metric_type: 'productivity', metric_value: 85, metric_date: '2024-01-31', period_type: 'monthly' },
        { employee_id: 'EMP002', metric_type: 'productivity', metric_value: 92, metric_date: '2024-02-29', period_type: 'monthly' },
        { employee_id: 'EMP003', metric_type: 'quality', metric_value: 95, metric_date: '2024-01-31', period_type: 'monthly' },
        { employee_id: 'EMP004', metric_type: 'productivity', metric_value: 88, metric_date: '2024-01-31', period_type: 'monthly' },
      ]
    }

    // Inserir dados no Supabase
    let result
    if (syncType === 'employees') {
      result = await supabaseClient.from('employees').upsert(data, { onConflict: 'employee_id' })
    } else if (syncType === 'trainings') {
      result = await supabaseClient.from('trainings').insert(data)
    } else if (syncType === 'performance') {
      // Primeiro, precisamos buscar os IDs dos employees
      const { data: employees } = await supabaseClient.from('employees').select('id, employee_id')
      const employeeMap = employees?.reduce((acc, emp) => {
        acc[emp.employee_id] = emp.id
        return acc
      }, {} as Record<string, string>) || {}

      const performanceData = data.map(item => ({
        ...item,
        employee_id: employeeMap[item.employee_id] || null
      })).filter(item => item.employee_id)

      result = await supabaseClient.from('performance_metrics').insert(performanceData)
    }

    if (result?.error) {
      throw result.error
    }

    // Atualizar status de sincronização
    await supabaseClient.from('google_sheets_sync').upsert({
      sheet_id: sheetId,
      sheet_name: sheetName,
      sync_type: syncType,
      last_sync_at: new Date().toISOString(),
      sync_status: 'active'
    }, { onConflict: 'sheet_id,sync_type' })

    return new Response(
      JSON.stringify({ success: true, syncedRecords: data.length }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Error in google-sheets-sync:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
    )
  }
})
