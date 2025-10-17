import React from "react"
import { Link } from "react-router-dom"

export default function Checkout() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      <p>Order summary here...</p>
      <Link to="/order/ABC1234567" className="text-green-600 mt-4 block">
        Place Order
      </Link>
    </div>
  )
}