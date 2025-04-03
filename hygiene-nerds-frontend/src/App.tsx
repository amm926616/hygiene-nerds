import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { CartProvider } from "./components/CartContext";
import Footer from "./components/Footer";
import Header from "./components/Header";
import "./index.css";
import { About, CheckOutPage, Contact, Home, Products } from "./pages";
import AdminPage from "./pages/Admin";
import Login from "./pages/Login";
import Playground from "./pages/Playground";
import ProductDetails from "./pages/ProductDetails";
import Register from "./pages/Register";
import { AuthProvider } from "./providers/AuthProvider";

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
                <Route path="/products/" element={<Products />} />
                <Route
                  path="/product-details/:id"
                  element={<ProductDetails />}
                />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/auth/login" element={<Login />} />
                <Route path="/auth/register" element={<Register />} />
                <Route path="/playground" element={<Playground />} />

                {/* Protected routes */}
                <Route path="/checkout" element={<CheckOutPage />} />
                <Route path="/admin" element={<AdminPage />} />

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
