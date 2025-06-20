import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "./AuthProvider";

type UserRole = "ROLE_ADMIN" | "ROLE_CUSTOMER";

interface ProtectedRouteProps {
  roles?: UserRole[];
  redirectTo?: string;
  children?: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  roles = [],
  redirectTo = "/auth/login",
  children,
}) => {
  const { isAuthenticated, isAdmin, isCustomer } = useAuth();
  const location = useLocation();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    // If no token, we can immediately conclude auth check
    if (!token) {
      setIsCheckingAuth(false);
      return;
    }

    // If there's a token but auth state isn't ready yet, wait briefly
    const timer = setTimeout(() => {
      setIsCheckingAuth(false);
    }, 100);

    return () => clearTimeout(timer);
  }, [isAuthenticated]); // Added dependency to re-check if auth state changes

  if (isCheckingAuth) {
    return null; // Consider replacing with a loading spinner component
  }

  const hasToken = Boolean(localStorage.getItem("token"));
  const effectiveAuth = isAuthenticated || hasToken;

  if (!effectiveAuth) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  // Check role requirements if specified
  if (roles.length > 0) {
    const hasRequiredRole =
      (isAdmin && roles.includes("ROLE_ADMIN")) ||
      (isCustomer && roles.includes("ROLE_CUSTOMER"));

    if (!hasRequiredRole) {
      return <Navigate to="/unauthorized" state={{ from: location }} replace />;
    }
  }

  return children ? <>{children}</> : <Outlet />;
};

export function withProtectedRoute<P extends object>(
  Component: React.ComponentType<P>,
  options?: Omit<ProtectedRouteProps, "children">,
): React.FC<P> {
  return function WithProtectedRouteWrapper(props: P) {
    return (
      <ProtectedRoute {...options}>
        <Component {...props} />
      </ProtectedRoute>
    );
  };
}
