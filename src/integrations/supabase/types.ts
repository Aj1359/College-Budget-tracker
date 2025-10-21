export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      budget_allocations: {
        Row: {
          entity_id: string
          entity_type: string
          equipment_allocated: number | null
          external_funding: number | null
          fund_booking: number | null
          funds_allocated: number | null
          id: string
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          entity_id: string
          entity_type: string
          equipment_allocated?: number | null
          external_funding?: number | null
          fund_booking?: number | null
          funds_allocated?: number | null
          id?: string
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          entity_id?: string
          entity_type?: string
          equipment_allocated?: number | null
          external_funding?: number | null
          fund_booking?: number | null
          funds_allocated?: number | null
          id?: string
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: []
      }
      expenses: {
        Row: {
          account_name: string | null
          account_number: string | null
          activity_type: string
          amount: number
          approved_at: string | null
          bill_url: string | null
          branch: string | null
          club_id: string
          council_name: string | null
          created_at: string
          date: string
          description: string | null
          expense_type: Database["public"]["Enums"]["expense_type"]
          id: string
          ifsc_code: string | null
          item_type: Database["public"]["Enums"]["item_type"]
          paid_at: string | null
          paid_by: string | null
          paid_to: string | null
          remarks: string | null
          requisition_url: string | null
          status: Database["public"]["Enums"]["expense_status"]
          updated_at: string
        }
        Insert: {
          account_name?: string | null
          account_number?: string | null
          activity_type: string
          amount: number
          approved_at?: string | null
          bill_url?: string | null
          branch?: string | null
          club_id: string
          council_name?: string | null
          created_at?: string
          date: string
          description?: string | null
          expense_type: Database["public"]["Enums"]["expense_type"]
          id?: string
          ifsc_code?: string | null
          item_type: Database["public"]["Enums"]["item_type"]
          paid_at?: string | null
          paid_by?: string | null
          paid_to?: string | null
          remarks?: string | null
          requisition_url?: string | null
          status?: Database["public"]["Enums"]["expense_status"]
          updated_at?: string
        }
        Update: {
          account_name?: string | null
          account_number?: string | null
          activity_type?: string
          amount?: number
          approved_at?: string | null
          bill_url?: string | null
          branch?: string | null
          club_id?: string
          council_name?: string | null
          created_at?: string
          date?: string
          description?: string | null
          expense_type?: Database["public"]["Enums"]["expense_type"]
          id?: string
          ifsc_code?: string | null
          item_type?: Database["public"]["Enums"]["item_type"]
          paid_at?: string | null
          paid_by?: string | null
          paid_to?: string | null
          remarks?: string | null
          requisition_url?: string | null
          status?: Database["public"]["Enums"]["expense_status"]
          updated_at?: string
        }
        Relationships: []
      }
      external_funding: {
        Row: {
          amount: number
          club_id: string
          council_name: string | null
          created_at: string
          date: string
          description: string | null
          id: string
          proof_url: string | null
          source: string
          updated_at: string
        }
        Insert: {
          amount: number
          club_id: string
          council_name?: string | null
          created_at?: string
          date: string
          description?: string | null
          id?: string
          proof_url?: string | null
          source: string
          updated_at?: string
        }
        Update: {
          amount?: number
          club_id?: string
          council_name?: string | null
          created_at?: string
          date?: string
          description?: string | null
          id?: string
          proof_url?: string | null
          source?: string
          updated_at?: string
        }
        Relationships: []
      }
      fund_asked: {
        Row: {
          created_at: string
          entity_id: string
          entity_type: string
          id: string
          sheet_url: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          entity_id: string
          entity_type: string
          id?: string
          sheet_url: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          entity_id?: string
          entity_type?: string
          id?: string
          sheet_url?: string
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string | null
          full_name: string | null
          id: string
        }
        Insert: {
          created_at?: string | null
          full_name?: string | null
          id: string
        }
        Update: {
          created_at?: string | null
          full_name?: string | null
          id?: string
        }
        Relationships: []
      }
      sources_of_fund: {
        Row: {
          created_at: string
          fees_collected: number
          id: string
          month: string
          others: number
          sponsorship: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          fees_collected?: number
          id?: string
          month: string
          others?: number
          sponsorship?: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          fees_collected?: number
          id?: string
          month?: string
          others?: number
          sponsorship?: number
          updated_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "viewer" | "admin" | "super_admin"
      expense_status:
        | "pending_approval"
        | "approved"
        | "awaiting_bill"
        | "pending_payment"
        | "paid"
        | "rejected"
      expense_type: "reimbursement" | "party_payment"
      item_type: "consumable" | "non_consumable"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["viewer", "admin", "super_admin"],
      expense_status: [
        "pending_approval",
        "approved",
        "awaiting_bill",
        "pending_payment",
        "paid",
        "rejected",
      ],
      expense_type: ["reimbursement", "party_payment"],
      item_type: ["consumable", "non_consumable"],
    },
  },
} as const
