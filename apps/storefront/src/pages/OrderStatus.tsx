import React from "react"
import { useParams, Link } from "react-router-dom"
import Layout from "../components/Layout"
import { getOrderStatus } from "../lib/api"

export default function OrderStatus() {
  const { id } = useParams<{ id: string }>()
  const status = getOrderStatus(id!)

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-4">Order Status</h1>

      <div className="bg-white p-4 rounded shadow">
        <p className="mb-2">
          Order ID: {id?.slice(-4).padStart(id!.length, "*")}
        </p>
        <p className="mb-2">Status: {status.status}</p>

        {(status.status === "Shipped" || status.status === "Delivered") && (
          <p>Carrier: FedEx | ETA: 2-4 days</p>
        )}

        <Link to="/" className="mt-4 inline-block text-blue-600 underline">
          Back to Shop
        </Link>
      </div>
    </Layout>
  )
}
