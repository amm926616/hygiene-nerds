import React, { createContext, useContext, useEffect, useState } from "react";
import { logout as apiLogout } from "../service/auth.service";

interface AuthContextType {
  isAuthenticated: boolean;
  isAdmin: boolean;
  isCustomer: boolean;
  username: string | null;
  token: string | null;
  login: (token: string, username: string, role: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(true);
  const [isCustomer, setIsCustomer] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  // Initialize auth state from storage
  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    const role = sessionStorage.getItem("loggedInUserRole");
    console.log("Auth init:", { token, username, role }); // Debug log

    if (token) {
      setIsAuthenticated(true);
      setToken(token);
      setUsername(username);
      setIsAdmin(role === "ROLE_ADMIN");
      setIsCustomer(role === "ROLE_CUSTOMER");
    }
  }, []);

  const login = (token: string, username: string, role: string) => {
    localStorage.setItem("token", token);
    localStorage.setItem("username", username);
    sessionStorage.setItem("loggedInUserRole", role);

    setIsAuthenticated(true);
    setToken(token);
    setUsername(username);
    setIsAdmin(role === "ROLE_ADMIN");
    setIsCustomer(role === "ROLE_CUSTOMER");
  };

  const logout = () => {
    apiLogout();
    setIsAuthenticated(false);
    setIsAdmin(false);
    setIsCustomer(false);
    setUsername(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isAdmin,
        isCustomer,
        username,
        token,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
