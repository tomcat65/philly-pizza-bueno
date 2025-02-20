export interface Pizza {
  name: string
  description: string
  prices: {
    personal: number
    regular: number
    family: number
  }
  image: string
  id?: string
  image_url?: string
  toppings?: string[]
  category?: string
  isAvailable?: boolean
  nutritionalInfo?: {
    calories: number
    protein: number
    carbs: number
    fat: number
  }
} 