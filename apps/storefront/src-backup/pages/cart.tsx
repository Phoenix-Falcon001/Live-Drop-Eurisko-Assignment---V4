import React from "react"
import { Link, useNavigate } from "react-router-dom"
import Layout from "../components/Layout"
import { useCartStore } from "../lib/store"
import { formatCurrency } from "../lib/format"

export default function Cart() {
  const { items, addItem, removeItem, clearCart } = useCartStore((state) => state)
  const navigate = useNavigate()

  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0)

  if (!items.length)
    return (
      <Layout>
        <p className="mt-10 text-center">
          Your cart is empty. <Link to="/">Add items first</Link>.
        </p>
      </Layout>
    )

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-4">Your Cart</h1>
      <ul className="space-y-2">
        {items.map((i) => (
          <li key={i.id} className="flex justify-between items-center bg-white p-2 rounded shadow">
            <span>{i.title} x{i.qty}</span>
            <div className="flex items-center gap-2">
              <button onClick={() => removeItem(i.id)} className="px-2 bg-red-500 text-white rounded hover:bg-red-600">
                -
              </button>
              <button onClick={() => addItem(i)} className="px-2 bg-green-500 text-white rounded hover:bg-green-600">
                +
              </button>
              <span>{formatCurrency(i.price * i.qty)}</span>
            </div>
          </li>
        ))}
      </ul>

      <p className="mt-4 font-semibold">Total: {formatCurrency(total)}</p>

      <div className="flex gap-2 mt-4">
        <button
          onClick={() => clearCart()}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
        >
          Clear Cart
        </button>

        <Link
          to="/checkout"
          className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Proceed to Checkout
        </Link>
      </div>
    </Layout>
  )
}
