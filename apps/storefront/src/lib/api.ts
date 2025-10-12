
import catalogData from "../../public/mock-catalog.json"

// ----- Types -----
export interface Product {
  id: string
  title: string
  price: number
  image?: string
  tags: string[]
  stockQty: number
}

export interface Order {
  status: string
}

// ----- Products -----
export function listProducts(): Product[] {
  return catalogData
}

export function getProduct(id: string): Product | undefined {
  return catalogData.find((p) => p.id === id)
}

// ----- Mock Orders -----
const orders: Record<string, Order> = {}

/**
 * Place an order with current cart items
 */
export function placeOrder(cart: Product[]): { orderId: string } {
  const orderId = Math.random().toString(36).substring(2, 12).toUpperCase()
  orders[orderId] = { status: "Placed" }
  return { orderId }
}

/**
 * Get status of an order
 */
export function getOrderStatus(orderId: string): string {
  return orders[orderId]?.status || "Unknown"
}
