import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "./AuthProvider";

interface ProtectedRouteProps {
  roles?: ("ROLE_ADMIN" | "ROLE_CUSTOMER")[];
  redirectTo?: string;
  children?: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  roles,
  redirectTo = "/auth/login",
  children,
}) => {
  const { isAuthenticated, isAdmin, isCustomer } = useAuth();
  const location = useLocation();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    // Check if we have a token in localStorage
    const token = localStorage.getItem("token");
    if (token) {
      // If we have a token but auth state isn't ready yet, wait a moment
      const timer = setTimeout(() => {
        setIsCheckingAuth(false);
      }, 100); // Short delay to allow auth context to initialize

      return () => clearTimeout(timer);
    } else {
      setIsCheckingAuth(false);
    }
  }, []);

  // Show nothing while checking initial auth state
  if (isCheckingAuth) {
    return null; // Or return a loading spinner
  }

  // Check token existence first as a fallback
  const hasToken = localStorage.getItem("token") !== null;
  const effectiveAuth = isAuthenticated || hasToken;

  if (!effectiveAuth) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  // Check role requirements if specified
  if (roles && roles.length > 0) {
    const hasRequiredRole =
      (isAdmin && roles.includes("ROLE_ADMIN")) ||
      (isCustomer && roles.includes("ROLE_CUSTOMER"));

    if (!hasRequiredRole) {
      return <Navigate to="/unauthorized" replace />;
    }
  }

  return children ? <>{children}</> : <Outlet />;
};

export const withProtectedRoute = (
  Component: React.ComponentType,
  options?: Omit<ProtectedRouteProps, "children">,
) => {
  return (props: any) => (
    <ProtectedRoute {...options}>
      <Component {...props} />
    </ProtectedRoute>
  );
};
