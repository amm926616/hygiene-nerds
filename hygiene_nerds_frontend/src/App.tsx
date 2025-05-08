import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import "./index.css";
import AdminPage from "./pages/Admin";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { AuthProvider } from "./providers/AuthProvider";
import SpecialOffersPage from "./pages/SpecialPackagesPage";
import ProfilePage from "./pages/Profile";
import { HygieneLetterFeed } from "./pages/NewFeeds";
import { ProtectedRoute } from "./providers/ProtectedRoutes";
import Unauthorized from "./pages/Unauthorized";
import Products from "./pages/Products";
import About from "./pages/About";
import Contact from "./pages/Contact";
import CheckOutPage from "./pages/CheckOutPage";
import Playground from "./pages/Playground";
import Home from "./pages/Home";
import { CartProvider } from "./providers/CartContext";
import OrderConfirmation from "./pages/OrderConfirmation";
import OrderHistory from "./pages/OrderHistory";

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
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/auth/login" element={<Login />} />
                <Route path="/auth/register" element={<Register />} />
                <Route path="/unauthorized" element={<Unauthorized />} />
                <Route path="/checkout" element={<CheckOutPage />} />

                {/* Authenticated routes (any logged-in user) */}
                <Route element={<ProtectedRoute />}>
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route
                    path="/special-offers"
                    element={<SpecialOffersPage />}
                  />
                  <Route path="/letterfeeds" element={<HygieneLetterFeed />} />
                  <Route
                    path="/order-confirmation/:orderId"
                    element={<OrderConfirmation />}
                  />
                  <Route path="/orders" element={<OrderHistory />} />
                </Route>

                {/* Admin-only routes */}
                <Route element={<ProtectedRoute roles={["ROLE_ADMIN"]} />}>
                  <Route path="/admin" element={<AdminPage />} />
                  <Route path="/playground" element={<Playground />} />
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
