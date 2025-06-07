export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      ai_insights: {
        Row: {
          confidence_score: number | null
          created_at: string
          description: string | null
          id: string
          impact_score: number | null
          insight_type: string
          related_employee_ids: string[] | null
          related_training_ids: string[] | null
          title: string
        }
        Insert: {
          confidence_score?: number | null
          created_at?: string
          description?: string | null
          id?: string
          impact_score?: number | null
          insight_type: string
          related_employee_ids?: string[] | null
          related_training_ids?: string[] | null
          title: string
        }
        Update: {
          confidence_score?: number | null
          created_at?: string
          description?: string | null
          id?: string
          impact_score?: number | null
          insight_type?: string
          related_employee_ids?: string[] | null
          related_training_ids?: string[] | null
          title?: string
        }
        Relationships: []
      }
      employee_trainings: {
        Row: {
          completion_date: string | null
          created_at: string
          employee_id: string | null
          feedback: string | null
          id: string
          score: number | null
          training_id: string | null
        }
        Insert: {
          completion_date?: string | null
          created_at?: string
          employee_id?: string | null
          feedback?: string | null
          id?: string
          score?: number | null
          training_id?: string | null
        }
        Update: {
          completion_date?: string | null
          created_at?: string
          employee_id?: string | null
          feedback?: string | null
          id?: string
          score?: number | null
          training_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employee_trainings_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employee_trainings_training_id_fkey"
            columns: ["training_id"]
            isOneToOne: false
            referencedRelation: "trainings"
            referencedColumns: ["id"]
          },
        ]
      }
      employees: {
        Row: {
          created_at: string
          department: string | null
          employee_id: string
          hire_date: string | null
          id: string
          name: string
          position: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          department?: string | null
          employee_id: string
          hire_date?: string | null
          id?: string
          name: string
          position?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          department?: string | null
          employee_id?: string
          hire_date?: string | null
          id?: string
          name?: string
          position?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      google_sheets_sync: {
        Row: {
          created_at: string
          error_message: string | null
          id: string
          last_sync_at: string | null
          sheet_id: string
          sheet_name: string | null
          sync_status: string | null
          sync_type: string
        }
        Insert: {
          created_at?: string
          error_message?: string | null
          id?: string
          last_sync_at?: string | null
          sheet_id: string
          sheet_name?: string | null
          sync_status?: string | null
          sync_type: string
        }
        Update: {
          created_at?: string
          error_message?: string | null
          id?: string
          last_sync_at?: string | null
          sheet_id?: string
          sheet_name?: string | null
          sync_status?: string | null
          sync_type?: string
        }
        Relationships: []
      }
      performance_metrics: {
        Row: {
          created_at: string
          employee_id: string | null
          id: string
          metric_date: string | null
          metric_type: string
          metric_value: number | null
          period_type: string | null
        }
        Insert: {
          created_at?: string
          employee_id?: string | null
          id?: string
          metric_date?: string | null
          metric_type: string
          metric_value?: number | null
          period_type?: string | null
        }
        Update: {
          created_at?: string
          employee_id?: string | null
          id?: string
          metric_date?: string | null
          metric_type?: string
          metric_value?: number | null
          period_type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "performance_metrics_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
        ]
      }
      roi_calculations: {
        Row: {
          calculated_at: string
          calculation_period_months: number | null
          id: string
          investment_amount: number | null
          return_amount: number | null
          roi_percentage: number | null
          training_id: string | null
        }
        Insert: {
          calculated_at?: string
          calculation_period_months?: number | null
          id?: string
          investment_amount?: number | null
          return_amount?: number | null
          roi_percentage?: number | null
          training_id?: string | null
        }
        Update: {
          calculated_at?: string
          calculation_period_months?: number | null
          id?: string
          investment_amount?: number | null
          return_amount?: number | null
          roi_percentage?: number | null
          training_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "roi_calculations_training_id_fkey"
            columns: ["training_id"]
            isOneToOne: false
            referencedRelation: "trainings"
            referencedColumns: ["id"]
          },
        ]
      }
      trainings: {
        Row: {
          category: string | null
          cost: number | null
          created_at: string
          duration_hours: number | null
          id: string
          provider: string | null
          training_date: string | null
          training_name: string
          updated_at: string
        }
        Insert: {
          category?: string | null
          cost?: number | null
          created_at?: string
          duration_hours?: number | null
          id?: string
          provider?: string | null
          training_date?: string | null
          training_name: string
          updated_at?: string
        }
        Update: {
          category?: string | null
          cost?: number | null
          created_at?: string
          duration_hours?: number | null
          id?: string
          provider?: string | null
          training_date?: string | null
          training_name?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
