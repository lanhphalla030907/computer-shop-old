import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation, Navigate } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Feature from "./pages/Feature";
import Discount from "./pages/Discount";
import BestSeller from "./pages/BestSeller";
import Special from "./pages/Special";
import Footer from "./components/Footer";
import AboutUs from "./pages/AboutUs";
import AllProducts from "./pages/AllProducts";
import DetailProducts from "./Admin/DetailProducts";
import Cart from "./pages/Cart";
import ContactPage from "./pages/ContactPage";
import ProfilePage from "./pages/ProfilePage";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminDashboard from "./Admin/AdminDashboard";
import AdminProducts from "./Admin/AdminProducts";
import AdminOrders from "./Admin/AdminOrder";
import AdminCustomers from "./Admin/AdminCustomers";
import AdminReports from "./Admin/AdminReports";
import AdminProfile from "./Admin/AdminProfile";

// Component for managing layout
function AppContent() {
  const location = useLocation();
  
  // Check if we're in admin page
  const isAdminPage = location.pathname.startsWith('/admin');
  
  // Logged user
  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem("user"));
  });

  // Cart for current user
  const [cart, setCart] = useState([]);

  // Load cart when user logs in
  useEffect(() => {
    if (user) {
      const savedCart =
        JSON.parse(localStorage.getItem("cart_" + user.username)) || [];
      setCart(savedCart);
    } else {
      setCart([]); // logout = empty cart
    }
  }, [user]);

  // Save cart for that user
  useEffect(() => {
    if (user) {
      localStorage.setItem("cart_" + user.username, JSON.stringify(cart));
    }
  }, [cart, user]);

  // Add to cart
  const addToCart = (product) => {
    if (!user) {
      alert("Please login first");
      return;
    }

    const qtyToAdd = product.qty ? product.qty : 1;

    setCart((prev) => {
      const exist = prev.find((item) => item.id === product.id);

      if (exist) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + qtyToAdd } : item,
        );
      }

      return [...prev, { ...product, qty: qtyToAdd }];
    });
  };

  return (
    <>
      {!isAdminPage && <Navbar cart={cart} user={user} setUser={setUser} />}
      
      <Routes>
        {/* Public Routes */}
        <Route
          path="/"
          element={
            <>
              <Home />
              <Feature />
              <Discount />
              <BestSeller addToCart={addToCart} />
              <Special />
            </>
          }
        />

        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/product" element={<AllProducts addToCart={addToCart} />} />
        <Route path="/detail/:id" element={<DetailProducts addToCart={addToCart} />} />
        <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />

        {/* Admin Routes - Protected */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<AdminReports />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="customers" element={<AdminCustomers />} />
          <Route path="profile" element={<AdminProfile />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      
      {!isAdminPage && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;