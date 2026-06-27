import { createBrowserRouter } from "react-router";

import RootLayout from "./root";

// Top-level layouts.
import PublicLayout from "@/routes/public-layout";
import ProtectedLayout from "../routes/protected-layout";

import Login from "../routes/auth/login/page";
import Register from "../routes/auth/register/page";

import DashboardPage from "../routes/dashboard/page";
import DashboardLayout from "@/routes/dashboard/dashboard-layout";

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        element: <PublicLayout />,
        children: [
          {
            path: "/login",
            element: <Login />,
          },
          {
            path: "/register",
            element: <Register />,
          },
        ],
      },

      // Protected routes with Auth guard.
      {
        element: <ProtectedLayout />,
        children: [
          {
            path: "/dashboard",
            element: <DashboardLayout />,
            children: [
              {
                index: true,
                element: <DashboardPage />,
              },
            ],
          },
        ],
      },
    ],
  },
]);
