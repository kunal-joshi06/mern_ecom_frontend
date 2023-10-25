import { RouterProvider, createBrowserRouter } from "react-router-dom"
import {  useEffect } from "react";
import Home from "./pages/Home"
import Layout from "./components/Layout"
import Login from "./pages/Login"
import Register from "./pages/Register"
import AllProducts from "./pages/productPages/AllProducts";
import { useAppDispatch} from "./store/hooks"
import { getAllProductsAsync } from "./store/features/products/productSlice";
import  { Toaster } from 'react-hot-toast';

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAllProductsAsync())
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
      path: "register",
      element: <Register />
    },
    {
      path: "products",
      element: <AllProducts />
    }
  ])

  return (<>
          <RouterProvider router={router} />
          <Toaster position="top-center"/>
          </>
    
    )
}

export default App
