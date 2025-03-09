export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      cart_items: {
        Row: {
          id: string
          user_id: string
          pizza_id: string
          size: string
          quantity: number
          toppings: string[]
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          pizza_id: string
          size: string
          quantity: number
          toppings?: string[]
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          pizza_id?: string
          size?: string
          quantity?: number
          toppings?: string[]
          created_at?: string
        }
      }
      order_items: {
        Row: {
          id: string
          order_id: string
          pizza_id: string
          size: string
          quantity: number
          price: number
          toppings: string[]
          created_at: string
        }
        Insert: {
          id?: string
          order_id: string
          pizza_id: string
          size: string
          quantity: number
          price: number
          toppings?: string[]
          created_at?: string
        }
        Update: {
          id?: string
          order_id?: string
          pizza_id?: string
          size?: string
          quantity?: number
          price?: number
          toppings?: string[]
          created_at?: string
        }
      }
      orders: {
        Row: {
          id: string
          user_id: string
          status: Database['public']['Enums']['order_status']
          total: number
          stripe_payment_id: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          status?: Database['public']['Enums']['order_status']
          total: number
          stripe_payment_id?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          status?: Database['public']['Enums']['order_status']
          total?: number
          stripe_payment_id?: string | null
          created_at?: string
        }
      }
      pizzas: {
        Row: {
          id: string
          name: string
          description: string
          image_url: string
          prices: Json
          active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          description: string
          image_url: string
          prices: Json
          active?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string
          image_url?: string
          prices?: Json
          active?: boolean
          created_at?: string
        }
      }
      toppings: {
        Row: {
          id: string
          name: string
          category_id: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          category_id: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          category_id?: string
          created_at?: string
        }
      }
      topping_categories: {
        Row: {
          id: string
          name: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          created_at?: string
        }
      }
      sizes: {
        Row: {
          id: string
          name: string
          display_name: string
          product_type: Database['public']['Enums']['product_type']
          size_order: number
          dimensions: Json | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          display_name: string
          product_type: Database['public']['Enums']['product_type']
          size_order: number
          dimensions?: Json | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          display_name?: string
          product_type?: Database['public']['Enums']['product_type']
          size_order?: number
          dimensions?: Json | null
          created_at?: string
        }
      }
      product_topping_availability: {
        Row: {
          id: string
          topping_id: string | null
          product_type: string
          is_default: boolean | null
          created_at: string
        }
        Insert: {
          id?: string
          topping_id: string
          product_type: string
          is_default?: boolean | null
          created_at?: string
        }
        Update: {
          id?: string
          topping_id?: string
          product_type?: string
          is_default?: boolean | null
          created_at?: string
        }
      }
      topping_options: {
        Row: {
          id: string
          type: string
          value: string
          created_at: string
        }
        Insert: {
          id?: string
          type: string
          value: string
          created_at?: string
        }
        Update: {
          id?: string
          type?: string
          value?: string
          created_at?: string
        }
      }
      health_checks: {
        Row: Record<string, unknown>
        Insert: Record<string, unknown>
        Update: Record<string, unknown>
      }
      specials: {
        Row: {
          id: string
          name: string
          description: string
          price: number
          active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          description: string
          price: number
          active?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string
          price?: number
          active?: boolean
          created_at?: string
        }
      }
    }
    Enums: {
      order_status: 'pending' | 'paid' | 'preparing' | 'ready' | 'completed' | 'cancelled'
      product_type: 'pizza' | 'cheesesteak'
    }
  }
}