import React from "react"
import { Link } from "react-router-dom"
import catalogData from "../../public/mock-catalog.json"
import { formatCurrency } from "../lib/format"
import { useCartStore } from "../lib/store"
import Layout from "../components/Layout"
import { motion } from "framer-motion"

export default function Catalog() {
  const addToCart = useCartStore((state) => state.addItem)

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6">Shoplite Catalog</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {catalogData.map((p) => (
          <motion.div
            key={p.id}
            className="bg-white rounded shadow p-4 flex flex-col hover:-translate-y-1 hover:shadow-lg transition-transform duration-300"
            whileHover={{ scale: 1.02 }}
          >
            <Link to={`/p/${p.id}`}>
              <img
                src={p.image || "https://via.placeholder.com/400x400?text=Product"}
                alt={p.title}
                className="w-full h-48 object-cover rounded mb-2"
                loading="lazy"
              />
              <h2 className="font-semibold">{p.title}</h2>
            </Link>
            <p className="text-gray-700">{formatCurrency(p.price)}</p>
            <button
              onClick={() => addToCart(p)}
              className="mt-auto bg-blue-600 text-white rounded py-1 px-2 hover:bg-blue-700 transition"
            >
              Add to Cart
            </button>
          </motion.div>
        ))}
      </div>
    </Layout>
  )
}
