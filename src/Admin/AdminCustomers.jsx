import { useOutletContext } from "react-router-dom";
import { FaUsers, FaUser, FaShoppingCart, FaSearch, FaPhone, FaEnvelope } from "react-icons/fa";

export default function AdminCustomers() {
  const { customers, data } = useOutletContext();
  
  const uniquePhoneNumbers = data
    ? [...new Set(data.latest?.map((o) => o.phone) || [])]
    : [];

  return (
    <div className="space-y-6 p-text">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Customer Management
          </h2>
          <p className="text-gray-600">
            Real customer data from orders
          </p>
        </div>
      </div>

      {/* Customer Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">
                Total Customers
              </p>
              <p className="text-3xl font-bold mt-2 text-gray-800">
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
              <p className="text-gray-500 text-sm">
                Active Customers
              </p>
              <p className="text-3xl font-bold mt-2 text-gray-800">
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
              <p className="text-gray-500 text-sm">
                Repeat Customers
              </p>
              <p className="text-3xl font-bold mt-2 text-gray-800">
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
            <h3 className="font-bold">
              All Customers ({customers.length})
            </h3>
            <div className="flex items-center gap-2">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search customers..."
                  className="pl-10 pr-4 py-2 border rounded text-sm"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-4 text-left font-semibold text-gray-700">Customer</th>
                <th className="p-4 text-left font-semibold text-gray-700">Contact</th>
                <th className="p-4 text-left font-semibold text-gray-700">Total Orders</th>
                <th className="p-4 text-left font-semibold text-gray-700">Total Spent</th>
                <th className="p-4 text-left font-semibold text-gray-700">Last Order</th>
                <th className="p-4 text-left font-semibold text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody>
              {customers.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-gray-500">
                    <FaUsers className="text-4xl text-gray-300 mx-auto mb-3" />
                    <p>No customer data available</p>
                    <p className="text-sm text-gray-400 mt-1">
                      Customer data will appear here when orders are placed
                    </p>
                  </td>
                </tr>
              ) : (
                customers.map((customer, index) => (
                  <tr key={index} className="border-t hover:bg-gray-50">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                          {customer.name?.charAt(0) || "C"}
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">
                            {customer.name || `Customer ${index + 1}`}
                          </p>
                          <p className="text-xs text-gray-500">
                            Customer ID: {customer.id || `CUST${1000 + index}`}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="space-y-1">
                        <p className="text-sm text-gray-600 flex items-center gap-1">
                          <FaPhone className="text-gray-400" /> {customer.phone}
                        </p>
                        {customer.email && (
                          <p className="text-sm text-gray-600 flex items-center gap-1">
                            <FaEnvelope className="text-gray-400" /> {customer.email}
                          </p>
                        )}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="text-center">
                        <p className="font-bold text-lg text-gray-800">
                          {customer.order_count || 1}
                        </p>
                        <p className="text-xs text-gray-500">orders</p>
                      </div>
                    </td>
                    <td className="p-4">
                      <p className="font-bold text-lg text-green-600">
                        ${customer.total_spent || "0"}
                      </p>
                    </td>
                    <td className="p-4">
                      <p className="text-sm text-gray-600">
                        {customer.last_order_date || new Date().toLocaleDateString()}
                      </p>
                    </td>
                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${(customer.order_count || 0) > 1 ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"}`}
                      >
                        {(customer.order_count || 0) > 1 ? "Regular" : "New"}
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
  );
}