// src/types/Auth.dto.ts
export interface LoginDto {
  username: string;
  password: string;
}

export interface AdminDto {
  username: string;
  password: string;
  email: string;
  // Add other admin-specific fields
}

export interface CustomerDto {
  username: string;
  password: string;
  email: string;
  // Add other customer-specific fields
}

export interface User {
  username: string;
  email: string;
  roles: string[];
  token: string;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  registerAdmin: (adminData: AdminDto) => Promise<void>;
  registerCustomer: (customerData: CustomerDto) => Promise<void>;
  login: (loginData: LoginDto) => Promise<void>;
  logout: () => void;
  hasRole: (role: string) => boolean;
}
