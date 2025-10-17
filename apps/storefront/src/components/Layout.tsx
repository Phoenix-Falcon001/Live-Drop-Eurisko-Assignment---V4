import React, { ReactNode } from "react"
import { Link } from "react-router-dom"
import { useCartStore } from "../lib/store"
import { motion } from "framer-motion"

type LayoutProps = { children: ReactNode }

export default function Layout({ children }: LayoutProps) {
  const { items } = useCartStore((state) => state)

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col">
      <header className="bg-white shadow p-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-600 hover:text-blue-800 transition">
          Shoplite
        </Link>
        <Link to="/cart" className="relative text-xl">
          🛒
          {items.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {items.length}
            </span>
          )}
        </Link>
      </header>

      <motion.main
        className="flex-1 p-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.main>

      <footer className="bg-white p-4 text-center text-gray-500 text-sm shadow-inner">
        &copy; {new Date().getFullYear()} Shoplite. All rights reserved.
      </footer>
    </div>
  )
}
