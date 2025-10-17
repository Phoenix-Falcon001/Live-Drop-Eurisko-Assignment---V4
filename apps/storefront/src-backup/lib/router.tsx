import React from "react"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Catalog from "../pages/catalog"
import Product from "../pages/product"
import Cart from "../pages/cart"
import Checkout from "../pages/checkout"
import OrderStatus from "../pages/order-status"

const router = createBrowserRouter([
  { path: "/", element: <Catalog /> },
  { path: "/p/:id", element: <Product /> },
  { path: "/cart", element: <Cart /> },
  { path: "/checkout", element: <Checkout /> },
  { path: "/order/:id", element: <OrderStatus /> },
])

export default function AppRouter() {
  return <RouterProvider router={router} />
}