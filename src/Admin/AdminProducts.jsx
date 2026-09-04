import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import {
  FaPlus, FaBell, FaSearch, FaDesktop, FaEdit, FaTrash,
  FaSave, FaCamera
} from "react-icons/fa";
export default function AdminProducts() {
  const {
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
  } = useOutletContext();
  const[Selectcategory,setCategory]=useState("All");
  const[search,setSearch]=useState("");
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editProfileForm, setEditProfileForm] = useState({
    name: adminInfo.name,
    email: adminInfo.email,
    phone: "+855 12 345 678",
    bio: "Administrator of KEMIK Gaming Store",
    profileImage: "",
  });

  const categories = [...new Set(products.map((p) => p.category))];
  const lowStockProducts = products.filter(
    (p) => (parseInt(p.stock) || 0) <= (parseInt(p.minStock) || 5),
  );
  const outOfStockProducts = products.filter(
    (p) => (parseInt(p.stock) || 0) === 0,
  );
  const filteredProducts = products.filter((product)=> {
      const matchesSearch = search === "" || 
    (product.title && product.title.toLowerCase().includes(search.toLowerCase())) ||
    (product.name && product.name.toLowerCase().includes(search.toLowerCase())) ||
    (product.brand && product.brand.toLowerCase().includes(search.toLowerCase()));
    const matchCategory = Selectcategory === "All" || product.category===Selectcategory;
    return matchCategory && matchesSearch;

  })
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

  function handleEditProfileChange(e) {
    setEditProfileForm({
      ...editProfileForm,
      [e.target.name]: e.target.value,
    });
  }

  function handleSaveProfile() {
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

  // StatsCard Component
  function StatsCard({ title, value, icon, color }) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-gray-500 text-sm">{title}</p>
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
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Products Management
          </h2>
          <p className="text-gray-600">
            Manage your gaming products inventory
          </p>
        </div>
        <button
          onClick={() => setShowProductForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center gap-2"
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
                <h3 className="font-bold text-red-700">
                  Out of Stock Products
                </h3>
                <p className="text-red-600 text-sm">
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
            <h3 className="font-bold">
              All Products ({products.length})
            </h3>
            <div className="flex items-center gap-2">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products..."
                  className="pl-10 pr-4 py-2 border rounded text-sm"
                  value={search}
                  onChange={(e)=> setSearch(e.target.value)}
                />
              </div>
              <select value={Selectcategory} className="border rounded px-3 py-2 text-sm" onChange={(e)=> setCategory(e.target.value)}>
                <option value="All">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-4 text-left font-semibold text-gray-700">Product</th>
                <th className="p-4 text-left font-semibold text-gray-700">Category</th>
                <th className="p-4 text-left font-semibold text-gray-700">Price</th>
                <th className="p-4 text-left font-semibold text-gray-700">Stock Status</th>
                <th className="p-4 text-left font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 ? (
                <tr>
                  <td colSpan="5" className="p-6 text-center text-gray-500">
                    No products found. Add your first product!
                  </td>
                </tr>
              ) : (
                filteredProducts.map((product) => {
                  const stock = parseInt(product.stock) || 0;
                  const minStock = parseInt(product.minStock) || 5;
                  const isOutOfStock = stock === 0;
                  const isLowStock = stock <= minStock && stock > 0;

                  return (
                    <tr key={product.id} className="border-t hover:bg-gray-50">
                      <td className="p-4">
                        <div className="flex items-center gap-4">
                          {product.img ? (
                            <img
                              src={product.img}
                              className="w-14 h-14 object-cover"
                              alt={product.title}
                            />
                          ) : (
                            <div className="w-14 h-14 bg-gray-100 rounded-lg border flex items-center justify-center">
                              <FaDesktop className="text-gray-400" />
                            </div>
                          )}
                          <div>
                            <p className="font-medium text-gray-800">
                              {product.title || product.name}
                            </p>
                            <p className="text-sm text-gray-500">
                              {product.brand}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                          {product.category || "Uncategorized"}
                        </span>
                      </td>
                      <td className="p-4">
                        <div>
                          <p className="font-bold text-lg text-blue-600">
                            ${product.price || "0"}
                          </p>
                          {product.dis && (
                            <p className="text-sm text-green-600">
                              {product.dis}% off
                            </p>
                          )}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          {isOutOfStock ? (
                            <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
                              <FaBell className="inline mr-1" /> Out of Stock
                            </span>
                          ) : isLowStock ? (
                            <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                              Low Stock: {stock}
                            </span>
                          ) : (
                            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                              In Stock: {stock}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="p-4">
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
                            className="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 text-sm"
                          >
                            <FaEdit className="inline mr-1" /> Edit
                          </button>
                          <button
                            onClick={() => deleteProduct(product.id)}
                            className="px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 text-sm"
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

      {/* Product Form Modal */}
      {showProductForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
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
                    <label className="block text-sm font-medium mb-1">
                      Product Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={productForm.name}
                      onChange={handleProductFormChange}
                      className="w-full p-3 border rounded"
                      placeholder="RTX 4090 Gaming PC"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Display Title *
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={productForm.title}
                      onChange={handleProductFormChange}
                      className="w-full p-3 border rounded"
                      placeholder="ASUS ROG RTX 4090 Gaming Desktop"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Brand *
                    </label>
                    <input
                      type="text"
                      name="brand"
                      value={productForm.brand}
                      onChange={handleProductFormChange}
                      className="w-full p-3 border rounded"
                      placeholder="ASUS, MSI, Razer"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Category *
                    </label>
                    <input
                      type="text"
                      name="category"
                      value={productForm.category}
                      onChange={handleProductFormChange}
                      className="w-full p-3 border rounded"
                      placeholder="Gaming PC, GPU, Keyboard"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Image URL
                  </label>
                  <input
                    type="text"
                    name="img"
                    value={productForm.img}
                    onChange={handleProductFormChange}
                    className="w-full p-3 border rounded"
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
                    <label className="block text-sm font-medium mb-1">
                      Price ($) *
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={productForm.price}
                      onChange={handleProductFormChange}
                      className="w-full p-3 border rounded"
                      placeholder="0.00"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Discount (%)
                    </label>
                    <input
                      type="number"
                      name="dis"
                      value={productForm.dis}
                      onChange={handleProductFormChange}
                      className="w-full p-3 border rounded"
                      placeholder="0"
                      min="0"
                      max="100"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Stock Quantity *
                    </label>
                    <input
                      type="number"
                      name="stock"
                      value={productForm.stock}
                      onChange={handleProductFormChange}
                      className="w-full p-3 border rounded"
                      placeholder="0"
                      required
                      min="0"
                    />
                    {parseInt(productForm.stock) === 0 && (
                      <p className="mt-1 text-red-600 text-sm">
                        ⚠️ This product will be marked as Out of Stock
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Minimum Stock Level *
                    </label>
                    <input
                      type="number"
                      name="minStock"
                      value={productForm.minStock}
                      onChange={handleProductFormChange}
                      className="w-full p-3 border rounded"
                      placeholder="5"
                      required
                      min="0"
                    />
                    <p className="mt-1 text-gray-500 text-sm">
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
                  className="px-5 py-2 border rounded hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={saveProduct}
                  className="px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-medium"
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