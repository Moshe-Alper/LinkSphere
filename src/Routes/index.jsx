import { createBrowserRouter } from "react-router-dom"
import Login from "../pages/Login"
import Register from "../pages/Register"
import { HomeLayout } from "../layouts/HomeLayout"
import { ProfileLayout } from "../layouts/ProfileLayout"
import { ConnectionsLayout } from "../layouts/ConnectionsLayout"

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/home",
      element: <HomeLayout />,
    },
    {
      path: "/profile",
      element: <ProfileLayout />,
    },
    {
      path: "/connections",
      element: <ConnectionsLayout />,
    },
  ],
  {
    basename: import.meta.env.DEV ? "/" : "/LinkSphere",
  }
)
