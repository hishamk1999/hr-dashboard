import { Navigate, Outlet } from "react-router";

import { useAuthStore } from "@/stores/auth-store";

function AuthLayout() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}

export default AuthLayout;
