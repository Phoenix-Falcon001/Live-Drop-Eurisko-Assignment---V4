import React from "react"
import { useParams } from "react-router-dom"
import { getProduct, listProducts } from "../lib/api"
import { formatCurrency } from "../lib/format"
import { useCartStore } from "../lib/store"
import Layout from "../components/Layout"
import GoBackButton from "../components/GoBackButton"

export default function Product() {
  const { id } = useParams<{ id: string }>()
  const product = getProduct(id!)
  const addToCart = useCartStore((state) => state.addItem)

  if (!product) return <Layout>Product not found.</Layout>

  const related = listProducts().filter(
    (p) => p.id !== product.id && p.tags.some((t) => product.tags.includes(t))
  )

  return (
    <Layout>
      <div className="mb-4"><GoBackButton /></div>
      <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={product.image || "https://via.placeholder.com/400x400?text=Product"}
          alt={product.title}
          className="w-full md:w-1/2 h-80 object-cover rounded shadow hover:scale-105 transition-transform duration-300"
        />
        <div className="flex-1 flex flex-col">
          <p className="text-gray-700 mb-2">{formatCurrency(product.price)}</p>
          <p className="mb-4">Stock: {product.stockQty}</p>
          <button
            onClick={() => addToCart(product)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Add to Cart
          </button>
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-2">Related Products</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {related.map((p) => (
              <a
                key={p.id}
                href={`/p/${p.id}`}
                className="block bg-white rounded shadow p-2 hover:shadow-lg transition transform hover:-translate-y-1"
              >
                <img
                  src={p.image || "https://via.placeholder.com/400x400?text=Product"}
                  alt={p.title}
                  className="w-full h-32 object-cover rounded mb-1"
                />
                <p className="text-sm font-medium">{p.title}</p>
                <p className="text-gray-700 text-sm">{formatCurrency(p.price)}</p>
              </a>
            ))}
          </div>
        </div>
      )}
    </Layout>
  )
}
