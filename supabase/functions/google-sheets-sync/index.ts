// supabase/functions/google-sheets-sync/index.ts

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
// O import do cliente Supabase deve ser sempre da URL do ESM
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// Define os cabeçalhos CORS para permitir requisições do seu app
const corsHeaders = {
  "Access-Control-Allow-Origin": "*", // Em produção, restrinja para o seu domínio
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

// Função principal que será executada
serve(async (req) => {
  // Trata a requisição pre-flight OPTIONS do navegador
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // 1. Valida as variáveis de ambiente (segredos) da função
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY");
    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error(
        "Supabase URL ou Anon Key não configuradas nos segredos da função.",
      );
    }

    // 2. Cria o cliente Supabase que age em nome do usuário logado.
    // A autenticação é repassada pelo front-end através do header 'Authorization'
    const supabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: req.headers.get("Authorization")! } },
    });

    // LINHA DE DEPURAÇÃO PARA VERIFICAR O USUÁRIO
    const {
      data: { user },
    } = await supabaseClient.auth.getUser();
    console.log(
      "A função 'google-sheets-sync' está rodando como o usuário:",
      user,
    );

    // 3. Extrai e valida os parâmetros do corpo da requisição
    const body = await req.json();
    const { sheetId, sheetName, syncType } = body;
    if (!sheetId || !sheetName || !syncType) {
      throw new Error(
        "Parâmetros obrigatórios ausentes: sheetId, sheetName ou syncType.",
      );
    }

    // 4. Simula os dados (mantido como está)
    let data = [];
    if (syncType === "employees") {
      data = [
        {
          employee_id: "EMP001",
          name: "João Silva",
          department: "Vendas",
          position: "Vendedor Sênior",
          hire_date: "2022-01-15",
        },
        {
          employee_id: "EMP002",
          name: "Maria Santos",
          department: "Marketing",
          position: "Analista de Marketing",
          hire_date: "2021-03-20",
        },
      ];
    } else {
      throw new Error(`Tipo de sincronização inválido: '${syncType}'.`);
    }

    // 5. Inserção no banco
    let result;
    if (syncType === "employees") {
      result = await supabaseClient
        .from("employees")
        .upsert(data, { onConflict: "employee_id" });
    }

    if (result?.error) {
      throw result.error;
    }

    // 6. Atualiza a tabela de controle
    const { error: syncError } = await supabaseClient
      .from("google_sheets_sync")
      .upsert(
        {
          sheet_id: sheetId,
          sheet_name: sheetName,
          sync_type: syncType,
          last_sync_at: new Date().toISOString(),
          sync_status: "active",
        },
        { onConflict: "sheet_id,sync_type" },
      );
    if (syncError) throw syncError;

    // 7. Retorna sucesso
    return new Response(
      JSON.stringify({ success: true, syncedRecords: data.length }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      },
    );
  } catch (error) {
    console.error("Erro em google-sheets-sync:", error);
    return new Response(
      JSON.stringify({ error: "Falha na requisição.", details: error.message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      },
    );
  }
});
