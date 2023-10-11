import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Home from "./pages/Home"
import Layout from "./components/Layout"
import Login from "./pages/Login"
import Register from "./pages/Register"


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
      path: "register",
      element: <Register />
    }
  ])

  return (
    <RouterProvider router={router} />
  )
}

export default App
