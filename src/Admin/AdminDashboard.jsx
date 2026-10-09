import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  FaShoppingCart,
  FaUsers,
  FaCalendarAlt,
  FaMoneyCheckAlt,
  FaChartLine,
  FaBoxOpen,
  FaCog,
  FaBell,
  FaSearch,
  FaTachometerAlt,
  FaStore,
  FaShippingFast,
  FaTags,
  FaGamepad,
  FaDesktop,
  FaUser,
  FaLock,
  FaHistory,
  FaPlus,
  FaEdit,
  FaTrash,
  FaPhone,
  FaEnvelope,
  FaMoneyBillWave,
  FaSignOutAlt,
  FaUserCircle,
} from "react-icons/fa";
import { productsStatic } from "../Data/productsStatic";
import { customersStatic } from "../Data/customersStatic";
import { ordersStatic } from "../Data/ordersStatic";

export default function AdminDashboard() {
  const [data, setData] = useState(null);
  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showProductForm, setShowProductForm] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [productForm, setProductForm] = useState({
    name: "",
    title: "",
    brand: "",
    category: "",
    img: "",
    price: "",
    dis: "",
    stock: "0",
    minStock: "5",
  });
  const [adminInfo, setAdminInfo] = useState({
    name: "Admin",
    email: "admin@kemik.com",
    role: "Super Admin",
    joinDate: "2024-01-01",
    lastLogin: new Date().toLocaleDateString(),
  });
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname.split('/').pop() || 'dashboard';

  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    loadData();
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setAdminInfo((prev) => ({
        ...prev,
        name: user.username || "Admin",
        email: user.email || "admin@kemik.com",
      }));
    }
    
    // Load saved profile from localStorage
    const savedProfile = JSON.parse(localStorage.getItem("adminProfile"));
    if (savedProfile) {
      setAdminInfo(prev => ({
        ...prev,
        name: savedProfile.name || prev.name,
        email: savedProfile.email || prev.email,
      }));
    }
  }, []);

  function loadData() {
    Promise.resolve({
      orders: ordersStatic,
    }).then((ordersData) => {
      setData(ordersData);
      setProducts(productsStatic);
      setCustomers(customersStatic);
      setLoading(false);
    }).catch((error) => {
      console.error("Error loading data:", error);
      setLoading(false);
    });
  }

  function handleLogout() {
    localStorage.removeItem("user");
    localStorage.removeItem("auth_token");
    window.location.href = "/";
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-text">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600 text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  const recentOrders = data?.orders || [];
  const outOfStockProducts = products.filter(
    (p) => (parseInt(p.stock) || 0) === 0,
  );

  const pageTitles = {
    dashboard: "Dashboard Overview",
    products: "Products Management",
    orders: "Order Management",
    customers: "Customer Management",
    reports: "Sales Reports",
    profile: "Profile Management"
  };

  const pageDescriptions = {
    dashboard: "Real-time store statistics and analytics",
    products: `Manage ${products.length} gaming products`,
    orders: `${recentOrders.length} recent orders`,
    customers: `${customers.length} registered customers`,
    reports: "Sales and inventory reports",
    profile: "Manage your profile and settings"
  };

  // Get profile image from localStorage
  const savedProfile = JSON.parse(localStorage.getItem("adminProfile")) || {};
  const profileImage = savedProfile.profileImage || "";
  const adminName = savedProfile.name || adminInfo.name;
  const adminEmail = savedProfile.email || adminInfo.email;

  return (
    <div className="flex min-h-screen bg-gray-100 p-text">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-gray-900 text-white p-4 h-screen lg:h-auto overflow-y-auto transform transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <FaGamepad className="text-xl" />
            </div>
            <div>
              <h1 className="text-xl font-bold">KEMIK GAMING</h1>
              <p className="text-xs text-gray-400">Admin Panel</p>
            </div>
          </div>
        </div>

        <div className="space-y-1">
          <button
            onClick={() => navigate("/admin/dashboard")}
            className={`flex items-center gap-3 p-3 rounded w-full text-left ${currentPath === "dashboard" ? "bg-blue-600" : "hover:bg-gray-800"}`}
          >
            <FaTachometerAlt /> Dashboard & Reports
          </button>

          <button
            onClick={() => navigate("/admin/products")}
            className={`flex items-center gap-3 p-3 rounded w-full text-left ${currentPath === "products" ? "bg-blue-600" : "hover:bg-gray-800"}`}
          >
            <FaDesktop /> Products
            {outOfStockProducts.length > 0 && (
              <span className="ml-auto bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                {outOfStockProducts.length}
              </span>
            )}
          </button>

          <button
            onClick={() => navigate("/admin/orders")}
            className={`flex items-center gap-3 p-3 rounded w-full text-left ${currentPath === "orders" ? "bg-blue-600" : "hover:bg-gray-800"}`}
          >
            <FaShoppingCart /> Orders
            {recentOrders.length > 0 && (
              <span className="ml-auto bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                {recentOrders.length}
              </span>
            )}
          </button>

          <button
            onClick={() => navigate("/admin/customers")}
            className={`flex items-center gap-3 p-3 rounded w-full text-left ${currentPath === "customers" ? "bg-blue-600" : "hover:bg-gray-800 hover:translate-x-1"}`}
          >
            <FaUsers /> Customers
            {customers.length > 0 && (
              <span className="ml-auto bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                {customers.length}
              </span>
            )}
          </button>

          <button
            onClick={() => navigate("/admin/profile")}
            className={`flex items-center gap-3 p-3 rounded w-full text-left transition-all ${currentPath === "profile" ? "bg-blue-600" : "hover:bg-gray-800 hover:translate-x-1"}`}
          >
            <FaUser /> Profile
          </button>
        </div>

        {/* Logout Button */}
        <div className="mt-8 pt-6 border-t border-gray-800">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 p-3 rounded w-full text-left hover:bg-red-900 text-red-300"
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {/* Top Bar */}
        <div className="bg-white border-b px-4 md:px-6 py-4">
          <div className="flex justify-between items-center gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden text-gray-700 text-xl focus:outline-none"
                aria-label="Open menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <div className="min-w-0">
                <h1 className="text-lg md:text-xl font-bold text-gray-800 truncate">
                  {pageTitles[currentPath] || "Dashboard"}
                </h1>
                <p className="text-gray-600 text-sm truncate hidden sm:block">
                  {pageDescriptions[currentPath] || ""}
                </p>
              </div>
            </div>
              
            <div className="flex items-center gap-4 md:gap-7">
              {/* Notification Bell */}
              <div className="relative">
                <FaBell className="text-xl text-gray-600 cursor-pointer" />
                {recentOrders.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                    {recentOrders.length}
                  </span>
                )}
              </div>

              {/* Profile Dropdown */}
              <div className="relative">
                <button 
                  className="flex items-center gap-2 md:gap-3 focus:outline-none"
                  onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                >
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg overflow-hidden">
                    {profileImage ? (
                      <img
                        src={profileImage}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      adminName.charAt(0)
                    )}
                  </div>
                  <div className="hidden md:block text-left">
                    <p className="font-medium text-gray-800 text-sm">{adminName}</p>
                    <p className="text-xs text-gray-500 truncate max-w-36">
                      {adminEmail}
                    </p>
                  </div>
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                {showProfileDropdown && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50">
                    {/* Profile Header in Dropdown */}
                    <div className="px-4 py-3 border-b border-gray-100">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg overflow-hidden">
                          {profileImage ? (
                            <img
                              src={profileImage}
                              alt="Profile"
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            adminName.charAt(0)
                          )}
                        </div>
                        <div>
                          <p className="font-bold text-gray-800">{adminName}</p>
                          <p className="text-sm text-gray-500">{adminEmail}</p>
                          <p className="text-xs text-gray-400 mt-1">{adminInfo.role}</p>
                        </div>
                      </div>
                    </div>

                    {/* Dropdown Links */}
                    <div className="py-2">
                      <button
                        onClick={() => {
                          navigate("/admin/profile");
                          setShowProfileDropdown(false);
                        }}
                        className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors w-full text-left"
                      >
                        <FaUser className="text-gray-400" />
                        <span>My Profile</span>
                      </button>
                      <button
                        onClick={() => {
                          navigate("/admin/dashboard");
                          setShowProfileDropdown(false);
                        }}
                        className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors w-full text-left"
                      >
                        <FaCog className="text-gray-400" />
                        <span>Settings</span>
                      </button>
                      <button
                        onClick={() => {
                          navigate("/admin/orders");
                          setShowProfileDropdown(false);
                        }}
                        className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors w-full text-left"
                      >
                        <FaShoppingCart className="text-gray-400" />
                        <span>Lasted Orders</span>
                        {recentOrders.length > 0 && (
                          <span className="ml-auto bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full">
                            {recentOrders.length} new
                          </span>
                        )}
                      </button>
                      <div className="border-t border-gray-100 my-2"></div>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 transition-colors text-left"
                      >
                        <FaLock className="text-red-400" />
                        <span>Logout</span>
                      </button>
                    </div>

                    
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Content Area - Routes will render here */}
        <div className="p-4 md:p-6">
          <Outlet context={{
            data,
            products,
            customers,
            adminInfo,
            loadData,
            showProductForm,
            setShowProductForm,
            editProduct,
            setEditProduct,
            productForm,
            setProductForm
          }} />
        </div>
      </div>
    </div>
  );
}