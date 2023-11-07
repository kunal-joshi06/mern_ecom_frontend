import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Home from "./pages/Home"
import Layout from "./components/Layout"
import Login from "./pages/Login"
import Register from "./pages/Register"
import { Toaster } from 'react-hot-toast';
import ProductDetail from "./pages/productPages/ProductDetail";
import PaymentCancel from "./pages/payments/paymentFailed"
import PaymentSuccess from "./pages/payments/PaymentSuccess"
import AccountSettings from "./pages/AccountSettings"
import Checkout from "./pages/Checkout"
import AllProducts from "./pages/productPages/Products"
import ErrorPage  from "./components/ErrorPage"


function App() {
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
      path: "/products/:pId",
      element: <Layout><ProductDetail /></Layout>
    },
    {
      path: "/payment-success",
      element: <PaymentSuccess />
    },
    {
      path: "/payment-cancel",
      element: <PaymentCancel />
    },
    {
      path: "/account-settings",
      element: <Layout><AccountSettings /></Layout>
    },
    {
      path: "/checkout",
      element: <Checkout />
    },
    { path: "*",
      element: <ErrorPage />
    }
  ])

  return (<>
    <RouterProvider router={router} />
    <Toaster position="top-center" />
  </>

  )
}

export default App
