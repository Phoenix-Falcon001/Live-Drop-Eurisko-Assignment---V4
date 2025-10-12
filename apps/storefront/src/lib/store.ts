import create from "zustand"
import { persist } from "zustand/middleware"

export interface CartItem {
  id: string
  title: string
  price: number
  qty: number
}

interface CartState {
  items: CartItem[]
  addItem: (item: any) => void
  updateQty: (id: string, qty: number) => void
  removeItem: (id: string) => void
  clearCart: () => void
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => {
        const exist = get().items.find((i) => i.id === item.id)
        if (exist) {
          set({
            items: get().items.map((i) =>
              i.id === item.id ? { ...i, qty: i.qty + 1 } : i
            ),
          })
        } else {
          set({ items: [...get().items, { ...item, qty: 1 }] })
        }
      },
      updateQty: (id, qty) => {
        if (qty < 1) return
        set({
          items: get().items.map((i) => (i.id === id ? { ...i, qty } : i)),
        })
      },
      removeItem: (id) => {
        set({ items: get().items.filter((i) => i.id !== id) })
      },
      clearCart: () => set({ items: [] }),
    }),
    { name: "storefront-cart" }
  )
)
