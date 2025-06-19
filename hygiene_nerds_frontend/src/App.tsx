import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Footer from "./components/FooterComponent";
import Header from "./components/HeaderComponent";
import "./index.css";
import AdminPage from "./pages/AdminPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { AuthProvider } from "./providers/AuthProvider";
import SpecialPackagesPage from "./pages/SpecialPackagesPage";
import ProfilePage from "./pages/ProfilePage";
import { HygieneLetterFeedPage } from "./pages/HygieneLetterFeedPage";
import { ProtectedRoute } from "./providers/ProtectedRoutes";
import UnauthorizedPage from "./pages/UnauthorizedPage";
import Products from "./pages/ProductsPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import CheckOutPage from "./pages/CheckOutPage";
import HomePage from "./pages/HomePage";
import { CartProvider } from "./providers/CartContext";
import OrderConfirmationPage from "./pages/OrderConfirmationPage";
import OrderHistory from "./pages/OrderHistoryPage";

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow pt-16">
              <Routes>
                {/* Public routes */}
                <Route path="/" element={<HomePage />} />
                <Route path="/products" element={<Products />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/auth/login" element={<LoginPage />} />
                <Route path="/auth/register" element={<RegisterPage />} />
                <Route path="/unauthorized" element={<UnauthorizedPage />} />
                <Route path="/checkout" element={<CheckOutPage />} />

                {/* Authenticated routes (any logged-in user) */}
                <Route element={<ProtectedRoute />}>
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route
                    path="/special-offers"
                    element={<SpecialPackagesPage />}
                  />
                  <Route
                    path="/letterfeeds"
                    element={<HygieneLetterFeedPage />}
                  />
                  <Route
                    path="/order-confirmation/:orderId"
                    element={<OrderConfirmationPage />}
                  />
                  <Route path="/orders" element={<OrderHistory />} />
                </Route>

                {/* Admin-only routes */}
                <Route element={<ProtectedRoute roles={["ROLE_ADMIN"]} />}>
                  <Route path="/admin" element={<AdminPage />} />
                </Route>

                {/* 404 Not Found */}
                <Route
                  path="*"
                  element={
                    <div className="flex items-center justify-center h-screen">
                      <h1 className="text-4xl font-bold">404 Not Found</h1>
                    </div>
                  }
                />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}
