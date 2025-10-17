import React from "react"
import { useNavigate } from "react-router-dom"
import Layout from "../components/Layout"
import { useCartStore } from "../lib/store"
import { placeOrder } from "../lib/api"

export default function Checkout() {
  const { items, clearCart } = useCartStore((state) => state)
  const navigate = useNavigate()

  const handlePlaceOrder = async () => {
    const order = await placeOrder(items)
    clearCart()
    navigate(`/order/${order.orderId}`)
  }

  if (!items.length)
    return (
      <Layout>
        <p className="text-center mt-10">
          Your cart is empty. <a href="/" className="text-blue-600 underline">Add items first</a>.
        </p>
      </Layout>
    )

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-4">Checkout</h1>
      <div className="bg-white p-4 rounded shadow">
        <ul className="space-y-2">
          {items.map((i) => (
            <li key={i.id} className="flex justify-between">
              <span>{i.title} x{i.qty}</span>
              <span>${(i.price * i.qty).toFixed(2)}</span>
            </li>
          ))}
        </ul>

        <button
          onClick={handlePlaceOrder}
          className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          Place Order
        </button>
      </div>
    </Layout>
  )
}
