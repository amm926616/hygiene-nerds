import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home, Products, About, Contact, CheckOutPage } from "./pages";
import "./index.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import AdminPage from "./pages/Admin";
import Playground from "./pages/Playground";
import ProductDetails from "./pages/ProductDetails";
import { CartProvider } from "./components/CartContext";

export default function App() {
  return (
    <CartProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow pt-16">
            {" "}
            {/* Added pt-16 to leave space */}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/checkout" element={<CheckOutPage />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/playground" element={<Playground />} />
              <Route path="/product-details" element={<ProductDetails />} />
              <Route path="*" element={<h1>404 Not Found</h1>} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}
