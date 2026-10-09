import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  CartesianGrid,
} from "recharts";

import {
  FaSave,
  FaCamera,
  FaShieldAlt,
  FaGlobe,
  FaShoppingCart,
  FaUsers,
  FaCalendarAlt,
  FaMoneyCheckAlt,
  FaChartLine,
  FaClipboardList,
  FaUserFriends,
  FaFileAlt,
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
  FaVideo,
  FaPlus,
  FaEdit,
  FaTrash,
  FaPhone,
  FaEnvelope,
  FaMoneyBillWave,
  FaSignOutAlt,
} from "react-icons/fa";

export default function AdminDashboard() {
  const [data, setData] = useState(null);
  const [page, setPage] = useState("dashboard");
  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]); // Real customer data
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
  // ក្នុង useState បន្ថែម
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editProfileForm, setEditProfileForm] = useState({
    name: "",
    email: "",
    phone: "+855 12 345 678",
    bio: "Administrator of KEMIK Gaming Store",
    profileImage: "",
  });
  useEffect(() => {
    loadData();
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setAdminInfo((prev) => ({
        ...prev,
        name: user.username || "Admin",
      }));
      setEditProfileForm((prev) => ({
        ...prev,
        name: user.username || "Admin",
        email: user.email || "admin@kemik.com",
      }));
    }
  }, []);
  function handleEditProfileChange(e) {
    setEditProfileForm({
      ...editProfileForm,
      [e.target.name]: e.target.value,
    });
  }

  function handleSaveProfile() {
    setAdminInfo({
      ...adminInfo,
      name: editProfileForm.name,
      email: editProfileForm.email,
    });

    // Update localStorage
    const user = JSON.parse(localStorage.getItem("user")) || {};
    localStorage.setItem(
      "user",
      JSON.stringify({
        ...user,
        username: editProfileForm.name,
        email: editProfileForm.email,
      }),
    );

    setIsEditingProfile(false);
    alert("Profile updated successfully!");
  }

  function handleImageUpload(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditProfileForm({
          ...editProfileForm,
          profileImage: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  }
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  useEffect(() => {
    loadData();
  }, []);

  function loadData() {
    Promise.resolve(ordersStatic).then((ordersData) => {
      setData({ orders: ordersData });
      setProducts(productsStatic);
      return Promise.resolve(customersStatic);
    }).then((customersData) => {
      setCustomers(customersData || []);
      setLoading(false);
    }).catch((error) => {
      console.error("Error loading data:", error);
      setLoading(false);
    });
  }

  function handleProductFormChange(e) {
    setProductForm({
      ...productForm,
      [e.target.name]: e.target.value,
    });
  }

  function saveProduct() {
    const formData = new FormData();
    Object.keys(productForm).forEach((key) => {
      formData.append(key, productForm[key]);
    });

    let url = "http://localhost/api/products.php?action=add";
    if (editProduct) {
      formData.append("id", editProduct.id);
      url = "http://localhost/api/products.php?action=edit";
    }

    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then(() => {
        loadData();
        setShowProductForm(false);
        setEditProduct(null);
        setProductForm({
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
      })
      .catch((error) => {
        console.error("Error saving product:", error);
      });
  }

  function deleteProduct(id) {
    if (window.confirm("Are you sure you want to delete this product?")) {
      fetch(`http://localhost/api/products.php?action=delete&id=${id}`)
        .then(() => {
          loadData();
        })
        .catch((error) => {
          console.error("Error deleting product:", error);
        });
    }
  }

  function handleLogout() {
    // Clear localStorage (ទាំង user ទាំង auth_token)
    localStorage.removeItem("user");
    localStorage.removeItem("auth_token");

    // Clear session ពី server
    window.location.href = "/";
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-text">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600 text-lg p-text">Loading...</p>
        </div>
      </div>
    );
  }

  const recentOrders = data?.latest || [];
  const salesData = data?.sales || [];
  const uniquePhoneNumbers = data
    ? [...new Set(data.latest?.map((o) => o.phone) || [])]
    : [];

  const paymentData = [
    {
      name: "ABA",
      value: recentOrders.filter((o) => o.payment === "ABA").length,
      color: "#0066CC",
    },
    {
      name: "Cash",
      value: recentOrders.filter((o) => o.payment === "Cash").length,
      color: "#00CC66",
    },
    {
      name: "ACLEDA",
      value: recentOrders.filter((o) => o.payment === "ACLEDA").length,
      color: "#FF9900",
    },
    {
      name: "Wing",
      value: recentOrders.filter((o) => o.payment === "Wing").length,
      color: "#6633CC",
    },
  ];

  const categories = [...new Set(products.map((p) => p.category))];
  const lowStockProducts = products.filter(
    (p) => (parseInt(p.stock) || 0) <= (parseInt(p.minStock) || 5),
  );
  const outOfStockProducts = products.filter(
    (p) => (parseInt(p.stock) || 0) === 0,
  );

  function StatsCard({ title, value, icon, color }) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 p-text">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-gray-500 text-sm p-text">{title}</p>
            <p className="text-3xl font-bold mt-2" style={{ color }}>
              {value}
            </p>
          </div>
          <div className="text-3xl" style={{ color }}>
            {icon}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100 p-text">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white p-4">
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <FaGamepad className="text-xl" />
            </div>
            <div>
              <h1 className="text-xl font-bold p-text">KEMIK GAMING</h1>
              <p className="text-xs text-gray-400 p-text">Admin Panel</p>
            </div>
          </div>
        </div>

        <div className="space-y-1">
          <button
            onClick={() => setPage("dashboard")}
            className={`flex items-center gap-3 p-3 rounded w-full text-left ${page === "dashboard" ? "bg-blue-600" : "hover:bg-gray-800"}`}
          >
            <FaTachometerAlt /> Dashboard
          </button>

          <button
            onClick={() => setPage("products")}
            className={`flex items-center gap-3 p-3 rounded w-full text-left ${page === "products" ? "bg-blue-600" : "hover:bg-gray-800"}`}
          >
            <FaDesktop /> Products
            {outOfStockProducts.length > 0 && (
              <span className="ml-auto bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                {outOfStockProducts.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setPage("orders")}
            className={`flex items-center gap-3 p-3 rounded w-full text-left ${page === "orders" ? "bg-blue-600" : "hover:bg-gray-800"}`}
          >
            <FaShoppingCart /> Orders
            {recentOrders.length > 0 && (
              <span className="ml-auto bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                {recentOrders.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setPage("customers")}
            className={`flex items-center gap-3 p-3 rounded w-full text-left ${page === "customers" ? "bg-blue-600" : "hover:bg-gray-800 hover:translate-x-1"}`}
          >
            <FaUsers /> Customers
            {customers.length > 0 && (
              <span className="ml-auto bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                {customers.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setPage("profile")}
            className={`flex items-center gap-3 p-3 rounded w-full text-left transition-all ${
              page === "profile"
                ? " bg-blue-600"
                : "hover:bg-gray-800 hover:translate-x-1"
            }`}
          >
            <FaUser /> Profile
          </button>
          <button
            onClick={() => setPage("reports")}
            className={`flex items-center gap-3 p-3 rounded w-full text-left ${page === "reports" ? "bg-blue-600" : "hover:bg-gray-800"}`}
          >
            <FaChartLine /> Reports
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
        <div className="bg-white border-b px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-xl font-bold text-gray-800 p-text">
                {page === "dashboard" && "Dashboard Overview"}
                {page === "products" && "Products Management"}
                {page === "orders" && "Order Management"}
                {page === "customers" && "Customer Management"}
                {page === "reports" && "Sales Reports"}
              </h1>
              <p className="text-gray-600 text-sm p-text">
                {page === "dashboard" &&
                  "Real-time store statistics and analytics"}
                {page === "products" &&
                  `Manage ${products.length} gaming products`}
                {page === "orders" && `${recentOrders.length} recent orders`}
                {page === "customers" &&
                  `${customers.length} registered customers`}
                {page === "reports" && "Sales and inventory reports"}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative">
                <FaBell className="text-xl text-gray-600 cursor-pointer" />
                {recentOrders.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {recentOrders.length}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* DASHBOARD */}
          {page === "dashboard" && (
            <div className="space-y-6">
              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <StatsCard
                  title={
                    <span className="font-bold text-black text-xl">
                      Total Revenue
                    </span>
                  }
                  value={`$${data?.totalRevenue || 0}`}
                  icon={<FaMoneyCheckAlt className="text-5xl" />}
                  color="#3b82f6"
                />
                <StatsCard
                  title={
                    <span className="font-bold text-black text-xl">
                      Total Orders
                    </span>
                  }
                  value={data?.totalOrders || 0}
                  icon={<FaShoppingCart className="text-5xl" />}
                  color="#10b981"
                />
                <StatsCard
                  title={
                    <span className="font-bold text-black text-xl">
                      Customers
                    </span>
                  }
                  value={customers.length}
                  icon={<FaUsers className="text-5xl" />}
                  color="#8b5cf6"
                />
                <StatsCard
                  title={
                    <span className="font-bold text-black text-xl">
                      Total Products
                    </span>
                  }
                  value={products.length}
                  icon={<FaBoxOpen className="text-5xl" />}
                  color="#f59e0b"
                />
              </div>

              {/* Alerts */}
              {outOfStockProducts.length > 0 && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <FaBell className="text-red-500" />
                    <div>
                      <h3 className="font-bold text-red-700 p-text">
                        Out of Stock Alert
                      </h3>
                      <p className="text-red-600 text-sm p-text">
                        {outOfStockProducts.length} product(s) are out of stock
                      </p>
                    </div>
                  </div>
                  <div className="mt-2 flex gap-2 flex-wrap">
                    {outOfStockProducts.slice(0, 3).map((p, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm p-text"
                      >
                        {p.title}
                      </span>
                    ))}
                    {outOfStockProducts.length > 3 && (
                      <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm p-text">
                        +{outOfStockProducts.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Sales Chart */}
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <h3 className="font-bold mb-4 p-text">Sales Overview</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={salesData}>
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="sum"
                        stroke="#3b82f6"
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                {/* Payment Methods */}
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <h3 className="font-bold mb-4 p-text">Payment Methods</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={paymentData}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        label
                        dataKey="value"
                      >
                        {paymentData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Recent Orders */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold p-text">Recent Orders</h3>
                </div>
                <div className="space-y-3">
                  {recentOrders.slice(0, 5).map((order, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          <FaShoppingCart className="text-blue-600" />
                        </div>
                        <div>
                          <p className="font-bold p-text">{order.name}</p>
                          <p className="text-gray-600 text-sm p-text">
                            {order.phone}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg text-gray-800 p-text">
                          ${order.total}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span
                            className={`px-3 py-1 rounded-full text-xs ${order.payment === "ABA" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"} p-text`}
                          >
                            {order.payment}
                          </span>
                          <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs p-text">
                            Processing
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* PRODUCTS PAGE */}
          {page === "products" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 p-text">
                    Products Management
                  </h2>
                  <p className="text-gray-600 p-text">
                    Manage your gaming products inventory
                  </p>
                </div>
                <button
                  onClick={() => setShowProductForm(true)}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center gap-2 p-text"
                >
                  <FaPlus /> Add Product
                </button>
              </div>

              {/* Stock Alerts */}
              {outOfStockProducts.length > 0 && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FaBell className="text-red-500" />
                      <div>
                        <h3 className="font-bold text-red-700 p-text">
                          Out of Stock Products
                        </h3>
                        <p className="text-red-600 text-sm p-text">
                          {outOfStockProducts.length} product(s) need restocking
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Products Table */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-4 border-b bg-gray-50">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold p-text">
                      All Products ({products.length})
                    </h3>
                    <div className="flex items-center gap-2">
                      <div className="relative">
                        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="text"
                          placeholder="Search products..."
                          className="pl-10 pr-4 py-2 border rounded text-sm p-text"
                        />
                      </div>
                      <select className="border rounded px-3 py-2 text-sm p-text">
                        <option>All Categories</option>
                        {categories.map((cat) => (
                          <option key={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="p-4 text-left font-semibold text-gray-700 p-text">
                          Product
                        </th>
                        <th className="p-4 text-left font-semibold text-gray-700 p-text">
                          Category
                        </th>
                        <th className="p-4 text-left font-semibold text-gray-700 p-text">
                          Price
                        </th>
                        <th className="p-4 text-left font-semibold text-gray-700 p-text">
                          Stock Status
                        </th>
                        <th className="p-4 text-left font-semibold text-gray-700 p-text">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.length === 0 ? (
                        <tr>
                          <td
                            colSpan="5"
                            className="p-6 text-center text-gray-500 p-text"
                          >
                            No products found. Add your first product!
                          </td>
                        </tr>
                      ) : (
                        products.map((product) => {
                          const stock = parseInt(product.stock) || 0;
                          const minStock = parseInt(product.minStock) || 5;
                          const isOutOfStock = stock === 0;
                          const isLowStock = stock <= minStock && stock > 0;

                          return (
                            <tr
                              key={product.id}
                              className="border-t hover:bg-gray-50"
                            >
                              <td className="p-4">
                                <div className="flex items-center gap-4">
                                  {product.img ? (
                                    <img
                                      src={product.img}
                                      className="w-14 h-14 object-cover "
                                      alt={product.title}
                                    />
                                  ) : (
                                    <div className="w-14 h-14 bg-gray-100 rounded-lg border flex items-center justify-center">
                                      <FaDesktop className="text-gray-400" />
                                    </div>
                                  )}
                                  <div>
                                    <p className="font-medium text-gray-800 p-text">
                                      {product.title || product.name}
                                    </p>
                                    <p className="text-sm text-gray-500 p-text">
                                      {product.brand}
                                    </p>
                                  </div>
                                </div>
                              </td>
                              <td className="p-4">
                                <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm p-text">
                                  {product.category || "Uncategorized"}
                                </span>
                              </td>
                              <td className="p-4">
                                <div>
                                  <p className="font-bold text-lg text-blue-600 p-text">
                                    ${product.price || "0"}
                                  </p>
                                  {product.dis && (
                                    <p className="text-sm text-green-600 p-text">
                                      {product.dis}% off
                                    </p>
                                  )}
                                </div>
                              </td>
                              <td className="p-4">
                                <div className="flex items-center gap-2">
                                  {isOutOfStock ? (
                                    <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium p-text">
                                      <FaBell className="inline mr-1" /> Out of
                                      Stock
                                    </span>
                                  ) : isLowStock ? (
                                    <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium p-text">
                                      Low Stock: {stock}
                                    </span>
                                  ) : (
                                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium p-text">
                                      In Stock: {stock}
                                    </span>
                                  )}
                                </div>
                              </td>
                              <td className="p-4 ">
                                <div className="flex gap-2">
                                  <button
                                    onClick={() => {
                                      setEditProduct(product);
                                      setProductForm({
                                        name: product.name || "",
                                        title: product.title || "",
                                        brand: product.brand || "",
                                        category: product.category || "",
                                        img: product.img || "",
                                        price: product.price || "",
                                        dis: product.dis || "",
                                        stock: product.stock || "0",
                                        minStock: product.minStock || "5",
                                      });
                                      setShowProductForm(true);
                                    }}
                                    className="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 text-sm p-text"
                                  >
                                    <FaEdit className="inline mr-1" /> Edit
                                  </button>
                                  <button
                                    onClick={() => deleteProduct(product.id)}
                                    className="px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 text-sm p-text"
                                  >
                                    <FaTrash className="inline mr-1" /> Delete
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ORDERS PAGE */}
          {page === "orders" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 p-text">
                    Order Management
                  </h2>
                  <p className="text-gray-600 p-text">
                    View and manage customer orders
                  </p>
                </div>
              </div>

              {/* Orders Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-500 text-sm p-text">
                        Total Orders
                      </p>
                      <p className="text-3xl font-bold mt-2 text-gray-800 p-text">
                        {data?.totalOrders || 0}
                      </p>
                    </div>
                    <div className="text-3xl text-blue-600">
                      <FaShoppingCart />
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-500 text-sm p-text">
                        Total Revenue
                      </p>
                      <p className="text-3xl font-bold mt-2 text-gray-800 p-text">
                        ${data?.totalRevenue || 0}
                      </p>
                    </div>
                    <div className="text-3xl text-green-600">
                      <FaMoneyBillWave />
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-500 text-sm p-text">
                        Average Order
                      </p>
                      <p className="text-3xl font-bold mt-2 text-gray-800 p-text">
                        $
                        {data?.totalOrders > 0
                          ? Math.round(data.totalRevenue / data.totalOrders)
                          : 0}
                      </p>
                    </div>
                    <div className="text-3xl text-purple-600">
                      <FaChartLine />
                    </div>
                  </div>
                </div>
              </div>

              {/* Orders Table */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-4 border-b bg-gray-50">
                  <h3 className="font-bold p-text">
                    Recent Orders ({recentOrders.length})
                  </h3>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="p-4 text-left font-semibold text-gray-700 p-text">
                          Order #
                        </th>
                        <th className="p-4 text-left font-semibold text-gray-700 p-text">
                          Customer
                        </th>
                        <th className="p-4 text-left font-semibold text-gray-700 p-text">
                          Contact
                        </th>
                        <th className="p-4 text-left font-semibold text-gray-700 p-text">
                          Payment
                        </th>
                        <th className="p-4 text-left font-semibold text-gray-700 p-text">
                          Total
                        </th>
                        <th className="p-4 text-left font-semibold text-gray-700 p-text">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentOrders.length === 0 ? (
                        <tr>
                          <td
                            colSpan="6"
                            className="p-8 text-center text-gray-500 p-text"
                          >
                            <FaShoppingCart className="text-4xl text-gray-300 mx-auto mb-3" />
                            <p>No orders yet</p>
                            <p className="text-sm text-gray-400 mt-1">
                              Orders will appear here when customers place
                              orders
                            </p>
                          </td>
                        </tr>
                      ) : (
                        recentOrders.map((order, index) => (
                          <tr key={index} className="border-t hover:bg-gray-50">
                            <td className="p-4">
                              <p className="font-medium text-gray-800 p-text">
                                #{1000 + index}
                              </p>
                              <p className="text-xs text-gray-500 p-text">
                                {new Date().toLocaleDateString()}
                              </p>
                            </td>
                            <td className="p-4">
                              <p className="font-medium text-gray-800 p-text">
                                {order.name}
                              </p>
                            </td>
                            <td className="p-4">
                              <div className="space-y-1">
                                <p className="text-sm text-gray-600 p-text flex items-center gap-1">
                                  <FaPhone className="text-gray-400" />{" "}
                                  {order.phone}
                                </p>
                              </div>
                            </td>
                            <td className="p-4">
                              <span
                                className={`px-3 py-1 rounded-full text-sm font-medium ${order.payment === "ABA" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"} p-text`}
                              >
                                {order.payment}
                              </span>
                            </td>
                            <td className="p-4">
                              <p className="font-bold text-lg text-gray-800 p-text">
                                ${order.total}
                              </p>
                            </td>
                            <td className="p-4">
                              <select className="border rounded px-3 py-1 text-sm p-text bg-white">
                                <option>Processing</option>
                                <option>Confirmed</option>
                                <option>Shipped</option>
                                <option>Delivered</option>
                                <option>Cancelled</option>
                              </select>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* CUSTOMERS PAGE - REAL DATA */}
          {page === "customers" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 p-text">
                    Customer Management
                  </h2>
                  <p className="text-gray-600 p-text">
                    Real customer data from orders
                  </p>
                </div>
              </div>

              {/* Customer Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-500 text-sm p-text">
                        Total Customers
                      </p>
                      <p className="text-3xl font-bold mt-2 text-gray-800 p-text">
                        {customers.length}
                      </p>
                    </div>
                    <div className="text-3xl text-blue-600">
                      <FaUsers />
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-500 text-sm p-text">
                        Active Customers
                      </p>
                      <p className="text-3xl font-bold mt-2 text-gray-800 p-text">
                        {uniquePhoneNumbers.length}
                      </p>
                    </div>
                    <div className="text-3xl text-green-600">
                      <FaUser />
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-500 text-sm p-text">
                        Repeat Customers
                      </p>
                      <p className="text-3xl font-bold mt-2 text-gray-800 p-text">
                        {customers.filter((c) => c.order_count > 1).length}
                      </p>
                    </div>
                    <div className="text-3xl text-purple-600">
                      <FaShoppingCart />
                    </div>
                  </div>
                </div>
              </div>

              {/* Customers Table */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-4 border-b bg-gray-50">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold p-text">
                      All Customers ({customers.length})
                    </h3>
                    <div className="flex items-center gap-2">
                      <div className="relative">
                        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="text"
                          placeholder="Search customers..."
                          className="pl-10 pr-4 py-2 border rounded text-sm p-text"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="p-4 text-left font-semibold text-gray-700 p-text">
                          Customer
                        </th>
                        <th className="p-4 text-left font-semibold text-gray-700 p-text">
                          Contact
                        </th>
                        <th className="p-4 text-left font-semibold text-gray-700 p-text">
                          Total Orders
                        </th>
                        <th className="p-4 text-left font-semibold text-gray-700 p-text">
                          Total Spent
                        </th>
                        <th className="p-4 text-left font-semibold text-gray-700 p-text">
                          Last Order
                        </th>
                        <th className="p-4 text-left font-semibold text-gray-700 p-text">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {customers.length === 0 ? (
                        <tr>
                          <td
                            colSpan="6"
                            className="p-8 text-center text-gray-500 p-text"
                          >
                            <FaUsers className="text-4xl text-gray-300 mx-auto mb-3" />
                            <p>No customer data available</p>
                            <p className="text-sm text-gray-400 mt-1">
                              Customer data will appear here when orders are
                              placed
                            </p>
                          </td>
                        </tr>
                      ) : (
                        customers.map((customer, index) => (
                          <tr key={index} className="border-t hover:bg-gray-50">
                            <td className="p-4">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10  rounded-full flex items-center justify-center text-white font-bold">
                                  {customer.name?.charAt(0) || "C"}
                                </div>
                                <div>
                                  <p className="font-medium text-gray-800 p-text">
                                    {customer.name || `Customer ${index + 1}`}
                                  </p>
                                  <p className="text-xs text-gray-500 p-text">
                                    Customer ID:{" "}
                                    {customer.id || `CUST${1000 + index}`}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className="p-4">
                              <div className="space-y-1">
                                <p className="text-sm text-gray-600 p-text flex items-center gap-1">
                                  <FaPhone className="text-gray-400" />{" "}
                                  {customer.phone}
                                </p>
                                {customer.email && (
                                  <p className="text-sm text-gray-600 p-text flex items-center gap-1">
                                    <FaEnvelope className="text-gray-400" />{" "}
                                    {customer.email}
                                  </p>
                                )}
                              </div>
                            </td>
                            <td className="p-4">
                              <div className="text-center">
                                <p className="font-bold text-lg text-gray-800 p-text">
                                  {customer.order_count || 1}
                                </p>
                                <p className="text-xs text-gray-500 p-text">
                                  orders
                                </p>
                              </div>
                            </td>
                            <td className="p-4">
                              <p className="font-bold text-lg text-green-600 p-text">
                                ${customer.total_spent || "0"}
                              </p>
                            </td>
                            <td className="p-4">
                              <p className="text-sm text-gray-600 p-text">
                                {customer.last_order_date ||
                                  new Date().toLocaleDateString()}
                              </p>
                            </td>
                            <td className="p-4">
                              <span
                                className={`px-3 py-1 rounded-full text-sm font-medium ${(customer.order_count || 0) > 1 ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"} p-text`}
                              >
                                {(customer.order_count || 0) > 1
                                  ? "Regular"
                                  : "New"}
                              </span>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* REPORTS PAGE */}
          {page === "reports" && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 p-text">
                Sales Reports
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-bold mb-4 p-text">Sales Performance</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={salesData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="sum" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div>
                  <h3 className="font-bold mb-4 p-text">Inventory Summary</h3>
                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium p-text">
                          Total Products
                        </span>
                        <span className="font-bold text-blue-600 p-text">
                          {products.length}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: "100%" }}
                        ></div>
                      </div>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium p-text">Out of Stock</span>
                        <span className="font-bold text-red-600 p-text">
                          {outOfStockProducts.length}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-red-600 h-2 rounded-full"
                          style={{
                            width: `${(outOfStockProducts.length / products.length) * 100 || 0}%`,
                          }}
                        ></div>
                      </div>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium p-text">Low Stock</span>
                        <span className="font-bold text-yellow-600 p-text">
                          {lowStockProducts.length}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-yellow-600 h-2 rounded-full"
                          style={{
                            width: `${(lowStockProducts.length / products.length) * 100 || 0}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {page === "profile" && (
            <div className="space-y-6">
              {/* Profile Header */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                  {/* Avatar with Upload */}
                  <div className="relative">
                    <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-4xl shadow-lg relative overflow-hidden">
                      {editProfileForm.profileImage ? (
                        <img
                          src={editProfileForm.profileImage}
                          alt="Profile"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        adminInfo.name.charAt(0)
                      )}
                    </div>
                    <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>

                    {/* Upload Button */}
                    <label className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition cursor-pointer">
                      <FaCamera className="text-sm" />
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageUpload}
                      />
                    </label>
                  </div>

                  {/* Info */}
                  <div className="flex-1">
                    {isEditingProfile ? (
                      <div className="space-y-3">
                        <input
                          type="text"
                          name="name"
                          value={editProfileForm.name}
                          onChange={handleEditProfileChange}
                          className="text-3xl font-bold bg-gray-100 px-4 py-2 rounded-lg w-full"
                          placeholder="Your name"
                        />
                        <input
                          type="email"
                          name="email"
                          value={editProfileForm.email}
                          onChange={handleEditProfileChange}
                          className="text-gray-600 bg-gray-100 px-4 py-2 rounded-lg w-full"
                          placeholder="your@email.com"
                        />
                        <input
                          type="text"
                          name="phone"
                          value={editProfileForm.phone}
                          onChange={handleEditProfileChange}
                          className="text-gray-600 bg-gray-100 px-4 py-2 rounded-lg w-full"
                          placeholder="Phone number"
                        />
                        <textarea
                          name="bio"
                          value={editProfileForm.bio}
                          onChange={handleEditProfileChange}
                          className="text-gray-600 bg-gray-100 px-4 py-2 rounded-lg w-full"
                          placeholder="Your bio"
                          rows="2"
                        />
                      </div>
                    ) : (
                      <div>
                        <h2 className="text-3xl font-bold text-gray-800 mb-2">
                          {adminInfo.name}
                        </h2>
                        <div className="flex flex-wrap gap-2 mb-3">
                          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                            {adminInfo.role}
                          </span>
                          <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                            Active
                          </span>
                        </div>
                        <p className="text-gray-600 mb-1">{adminInfo.email}</p>
                        <p className="text-gray-600 text-sm">+855 12 345 678</p>
                        <p className="text-gray-500 mt-2">
                          {editProfileForm.bio}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    {isEditingProfile ? (
                      <>
                        <button
                          onClick={handleSaveProfile}
                          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center gap-2"
                        >
                          <FaSave /> Save
                        </button>
                        <button
                          onClick={() => setIsEditingProfile(false)}
                          className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => setIsEditingProfile(true)}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
                        >
                          <FaEdit /> Edit Profile
                        </button>
                        <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition">
                          Settings
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* ... existing stats cards ... */}
              </div>

              {/* Profile Details */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Personal Info - Editable */}
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 lg:col-span-2">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                      <FaUser className="text-blue-600" /> Personal Information
                    </h3>
                    {!isEditingProfile && (
                      <button
                        onClick={() => setIsEditingProfile(true)}
                        className="text-blue-600 text-sm hover:text-blue-800 flex items-center gap-1"
                      >
                        <FaEdit /> Edit
                      </button>
                    )}
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <FaEnvelope className="text-gray-400" />
                        <div>
                          <p className="font-medium">Email</p>
                          {isEditingProfile ? (
                            <input
                              type="email"
                              name="email"
                              value={editProfileForm.email}
                              onChange={handleEditProfileChange}
                              className="text-gray-600 bg-white px-3 py-1 rounded border w-full"
                            />
                          ) : (
                            <p className="text-gray-600 text-sm">
                              {adminInfo.email}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <FaPhone className="text-gray-400" />
                        <div>
                          <p className="font-medium">Phone</p>
                          {isEditingProfile ? (
                            <input
                              type="text"
                              name="phone"
                              value={editProfileForm.phone}
                              onChange={handleEditProfileChange}
                              className="text-gray-600 bg-white px-3 py-1 rounded border w-full"
                            />
                          ) : (
                            <p className="text-gray-600 text-sm">
                              +855 12 345 678
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <FaCalendarAlt className="text-gray-400" />
                        <div>
                          <p className="font-medium">Joined Date</p>
                          <p className="text-gray-600 text-sm">
                            {adminInfo.joinDate}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3 mb-2">
                        <FaUserFriends className="text-gray-400" />
                        <p className="font-medium">Bio</p>
                      </div>
                      {isEditingProfile ? (
                        <textarea
                          name="bio"
                          value={editProfileForm.bio}
                          onChange={handleEditProfileChange}
                          className="text-gray-600 bg-white px-3 py-2 rounded border w-full"
                          rows="3"
                        />
                      ) : (
                        <p className="text-gray-600 text-sm">
                          {editProfileForm.bio}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Security */}
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                  <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <FaLock className="text-green-600" /> Security
                  </h3>

                  <div className="space-y-4">
                    {/* Password Change */}
                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                      <div className="flex justify-between items-center mb-2">
                        <p className="font-medium">Change Password</p>
                        <span className="text-sm text-green-600">Strong</span>
                      </div>
                      <p className="text-gray-600 text-sm mb-3">
                        Last changed 30 days ago
                      </p>
                      <button className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2">
                        <FaLock /> Change Password
                      </button>
                    </div>

                    {/* 2FA */}
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <p className="font-medium">Two-Factor Authentication</p>
                        <span className="text-sm text-red-600">Disabled</span>
                      </div>
                      <p className="text-gray-600 text-sm mb-3">
                        Add extra security
                      </p>
                      <button className="w-full py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300">
                        Enable 2FA
                      </button>
                    </div>

                    {/* Login History */}
                    <div className="p-4 bg-purple-50 rounded-lg border border-purple-100">
                      <div className="flex items-center gap-2 mb-2">
                        <FaHistory className="text-purple-600" />
                        <p className="font-medium">Recent Logins</p>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Today</span>
                          <span className="text-green-600">
                            ✓ Current session
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Yesterday</span>
                          <span className="text-gray-500">Phnom Penh, KH</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">3 days ago</span>
                          <span className="text-gray-500">10:30 AM</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Account Settings */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <FaCog className="text-yellow-600" /> Account Settings
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Notification Settings */}
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <FaBell className="text-blue-600" />
                        <p className="font-medium">Notifications</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          defaultChecked
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                    <p className="text-gray-600 text-sm">
                      Receive email notifications
                    </p>
                  </div>

                  {/* Email Settings */}
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <FaEnvelope className="text-green-600" />
                        <p className="font-medium">Marketing Emails</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                      </label>
                    </div>
                    <p className="text-gray-600 text-sm">
                      Receive promotional emails
                    </p>
                  </div>

                  {/* Privacy Settings */}
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <FaShieldAlt className="text-red-600" />
                        <p className="font-medium">Profile Privacy</p>
                      </div>
                      <select className="border rounded px-2 py-1 text-sm">
                        <option>Public</option>
                        <option>Private</option>
                        <option>Only Admin</option>
                      </select>
                    </div>
                    <p className="text-gray-600 text-sm">
                      Who can see your profile
                    </p>
                  </div>

                  {/* Language Settings */}
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <FaGlobe className="text-purple-600" />
                        <p className="font-medium">Language</p>
                      </div>
                      <select className="border rounded px-2 py-1 text-sm">
                        <option>English</option>
                        <option>Khmer</option>
                      </select>
                    </div>
                    <p className="text-gray-600 text-sm">Interface language</p>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                    <FaHistory className="text-purple-600" /> Recent Activity
                  </h3>
                  <button className="text-blue-600 text-sm hover:text-blue-800">
                    View All
                  </button>
                </div>

                <div className="space-y-3">
                  {recentOrders.slice(0, 3).map((order, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <FaShoppingCart className="text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium">
                            New Order #{1000 + index}
                          </p>
                          <p className="text-gray-600 text-sm">
                            From {order.name} • ${order.total} • {order.payment}
                          </p>
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">
                        {new Date().toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Product Form Modal */}
      {showProductForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 p-text">
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800">
                  {editProduct ? "Edit Product" : "Add New Product"}
                </h2>
                <button
                  onClick={() => {
                    setShowProductForm(false);
                    setEditProduct(null);
                    setProductForm({
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
                  }}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1 p-text">
                      Product Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={productForm.name}
                      onChange={handleProductFormChange}
                      className="w-full p-3 border rounded p-text"
                      placeholder="RTX 4090 Gaming PC"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1 p-text">
                      Display Title *
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={productForm.title}
                      onChange={handleProductFormChange}
                      className="w-full p-3 border rounded p-text"
                      placeholder="ASUS ROG RTX 4090 Gaming Desktop"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1 p-text">
                      Brand *
                    </label>
                    <input
                      type="text"
                      name="brand"
                      value={productForm.brand}
                      onChange={handleProductFormChange}
                      className="w-full p-3 border rounded p-text"
                      placeholder="ASUS, MSI, Razer"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1 p-text">
                      Category *
                    </label>
                    <input
                      type="text"
                      name="category"
                      value={productForm.category}
                      onChange={handleProductFormChange}
                      className="w-full p-3 border rounded p-text"
                      placeholder="Gaming PC, GPU, Keyboard"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1 p-text">
                    Image URL
                  </label>
                  <input
                    type="text"
                    name="img"
                    value={productForm.img}
                    onChange={handleProductFormChange}
                    className="w-full p-3 border rounded p-text"
                    placeholder="https://example.com/image.jpg"
                  />
                  {productForm.img && (
                    <img
                      src={productForm.img}
                      className="mt-3 max-h-48 w-auto mx-auto object-contain border rounded"
                      alt="Preview"
                    />
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1 p-text">
                      Price ($) *
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={productForm.price}
                      onChange={handleProductFormChange}
                      className="w-full p-3 border rounded p-text"
                      placeholder="0.00"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1 p-text">
                      Discount (%)
                    </label>
                    <input
                      type="number"
                      name="dis"
                      value={productForm.dis}
                      onChange={handleProductFormChange}
                      className="w-full p-3 border rounded p-text"
                      placeholder="0"
                      min="0"
                      max="100"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1 p-text">
                      Stock Quantity *
                    </label>
                    <input
                      type="number"
                      name="stock"
                      value={productForm.stock}
                      onChange={handleProductFormChange}
                      className="w-full p-3 border rounded p-text"
                      placeholder="0"
                      required
                      min="0"
                    />
                    {parseInt(productForm.stock) === 0 && (
                      <p className="mt-1 text-red-600 text-sm p-text">
                        ⚠️ This product will be marked as Out of Stock
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1 p-text">
                      Minimum Stock Level *
                    </label>
                    <input
                      type="number"
                      name="minStock"
                      value={productForm.minStock}
                      onChange={handleProductFormChange}
                      className="w-full p-3 border rounded p-text"
                      placeholder="5"
                      required
                      min="0"
                    />
                    <p className="mt-1 text-gray-500 text-sm p-text">
                      Alert when stock drops below this level
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-8 pt-6 border-t">
                <button
                  onClick={() => {
                    setShowProductForm(false);
                    setEditProduct(null);
                    setProductForm({
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
                  }}
                  className="px-5 py-2 border rounded hover:bg-gray-50 p-text"
                >
                  Cancel
                </button>
                <button
                  onClick={saveProduct}
                  className="px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-medium p-text"
                >
                  {editProduct ? "Update Product" : "Add Product"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
import { ordersStatic } from "../Data/ordersStatic";
import { customersStatic } from "../Data/customersStatic";
import { productsStatic } from "../Data/productsStatic";
