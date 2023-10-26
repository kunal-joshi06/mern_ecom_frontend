import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { useEffect } from "react";
import Home from "./pages/Home"
import Layout from "./components/Layout"
import Login from "./pages/Login"
import Register from "./pages/Register"
import { useAppDispatch } from "./store/hooks"
import { getAllProductsAsync } from "./store/features/products/productSlice";
import { Toaster } from 'react-hot-toast';

import ProductDetail from "./pages/productPages/ProductDetail";
import AllProducts from "./pages/productPages/allProducts";

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAllProductsAsync({ page: "1" }))
  }, [dispatch])


  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout><Home /></Layout>
    },
    {
      path: "/login",
      element: <Login />
    },
    {
      path: "/register",
      element: <Register />
    },
    {
      path: "/products",
      element: <Layout><AllProducts /></Layout>
    },
    {
      path: "products/:pId",
      element: <Layout><ProductDetail /></Layout>
    }
  ])

  return (<>
    <RouterProvider router={router} />
    <Toaster position="top-center" />
  </>

  )
}

export default App
