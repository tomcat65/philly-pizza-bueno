export interface CartItem {
  id: string
  pizzaId: string
  name: string
  size: 'personal' | 'regular' | 'family'
  quantity: number
  price: number
  image: string
  toppings: string[]
}

export interface CartStore {
  items: CartItem[]
  total: number
  addItem: (item: Omit<CartItem, 'id'>) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  fetchCart: () => Promise<void>
} 