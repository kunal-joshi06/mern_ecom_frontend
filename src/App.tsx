import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Home from "./pages/Home"
import Layout from "./components/Layout"
import Login from "./pages/Login"
import Register from "./pages/Register"
import { Toaster } from 'react-hot-toast';
import ProductDetail from "./pages/productPages/ProductDetail";
import { useAppDispatch } from "./store/hooks"
import { useEffect } from "react"
import { getAllProductsAsync } from "./store/features/products/productSlice"
import AllProducts from "./pages/productPages/allProducts"

function App() {

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAllProductsAsync({ page: "1", limit: "4" }))
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
