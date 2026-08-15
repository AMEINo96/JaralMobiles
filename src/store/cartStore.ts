import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type CartItem = {
  _id: string
  title: string
  price: number
  image: any
  quantity: number
}

type CartState = {
  items: CartItem[]
  isDrawerOpen: boolean
  addItem: (item: Omit<CartItem, 'quantity'>) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  toggleDrawer: () => void
  openDrawer: () => void
  closeDrawer: () => void
  getTotal: () => number
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isDrawerOpen: false,
      
      addItem: (item) => {
        set((state) => {
          const existingItem = state.items.find((i) => i._id === item._id)
          if (existingItem) {
            return {
              items: state.items.map((i) =>
                i._id === item._id ? { ...i, quantity: i.quantity + 1 } : i
              ),
            }
          }
          return { items: [...state.items, { ...item, quantity: 1 }] }
        })
        get().openDrawer()
      },

      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((i) => i._id !== id),
        })),

      updateQuantity: (id, quantity) =>
        set((state) => ({
          items: state.items.map((i) =>
            i._id === id ? { ...i, quantity: Math.max(1, quantity) } : i
          ),
        })),

      clearCart: () => set({ items: [] }),

      toggleDrawer: () => set((state) => ({ isDrawerOpen: !state.isDrawerOpen })),
      openDrawer: () => set({ isDrawerOpen: true }),
      closeDrawer: () => set({ isDrawerOpen: false }),

      getTotal: () => {
        const { items } = get()
        return items.reduce((total, item) => total + item.price * item.quantity, 0)
      },
    }),
    {
      name: 'mobile-shop-cart',
    }
  )
)
