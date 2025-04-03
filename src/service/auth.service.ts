import axios from "axios";
import { LoginDto } from "../types/Login.dto";
import { RegisterDto } from "../types/Register.dto";

const AUTH_BACKEND_URL = "http://localhost:8080/api/auth";

export const loginApiCall = (login: LoginDto) =>
  axios.post(AUTH_BACKEND_URL + "/login", login);

export const logout = () => {
  localStorage.removeItem("token");
  sessionStorage.removeItem("loggedInUserRole");
};

export const setLoggedInUserName = (username: string) => {
  localStorage.setItem("username", username);
};

export const setLoggedInUserRole = (role: string) => {
  sessionStorage.setItem("loggedInUserRole", role);
};

export const setToken = (token: string) => {
  localStorage.setItem("token", token);
};

export const registerApiCall = (register: RegisterDto) =>
  axios.post(AUTH_BACKEND_URL + "/register", register);

export const isUserLoggedIn = () => {
  return localStorage.getItem("token") !== null;
};

export const isUserAdmin = () => {
  return sessionStorage.getItem("loggedInUserRole") === "ROLE_ADMIN";
};

export const isUserCustomer = () => {
  return sessionStorage.getItem("loggedInUserRole") === "ROLE_CUSTOMER";
};

export const isAuthenticated = () => {
  return localStorage.getItem("authenticated") === "true";
};

export const setAuthenticated = (authenticated: boolean) => {
  localStorage.setItem("authenticated", authenticated.toString());
};

export const getUserName = () => {
  return localStorage.getItem("username") || ""; // Default empty string if null
};

export const getUserDetails = (username: string | null) =>
  axios.get(`${AUTH_BACKEND_URL}/user/${username}`);
