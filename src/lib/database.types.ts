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
    }
    Enums: {
      order_status: 'pending' | 'paid' | 'preparing' | 'ready' | 'completed' | 'cancelled'
    }
  }
}