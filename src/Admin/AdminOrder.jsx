import { useOutletContext } from "react-router-dom";
import { FaShoppingCart, FaMoneyBillWave, FaChartLine, FaPhone } from "react-icons/fa";

export default function AdminOrders() {
  const { data } = useOutletContext();
  const recentOrders = data?.orders || [];

  return (
    <div className="space-y-6 ">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Order Management
          </h2>
          <p className="text-gray-600">
            View and manage customer orders
          </p>
        </div>
      </div>

      {/* Orders Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">
                Total Orders
              </p>
              <p className="text-3xl font-bold mt-2 text-gray-800">
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
              <p className="text-gray-500 text-sm">
                Total Revenue
              </p>
              <p className="text-3xl font-bold mt-2 text-gray-800">
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
              <p className="text-gray-500 text-sm">
                Average Order
              </p>
              <p className="text-3xl font-bold mt-2 text-gray-800">
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
          <h3 className="font-bold">
            Recent Orders ({recentOrders.length})
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-4 text-left font-semibold text-gray-700">Order #</th>
                <th className="p-4 text-left font-semibold text-gray-700">Customer</th>
                <th className="p-4 text-left font-semibold text-gray-700">Contact</th>
                <th className="p-4 text-left font-semibold text-gray-700">Payment</th>
                <th className="p-4 text-left font-semibold text-gray-700">Total</th>
                <th className="p-4 text-left font-semibold text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-gray-500">
                    <FaShoppingCart className="text-4xl text-gray-300 mx-auto mb-3" />
                    <p>No orders yet</p>
                    <p className="text-sm text-gray-400 mt-1">
                      Orders will appear here when customers place orders
                    </p>
                  </td>
                </tr>
              ) : (
                recentOrders.map((order, index) => (
                  <tr key={index} className="border-t hover:bg-gray-50">
                    <td className="p-4">
                      <p className="font-medium text-gray-800">
                        #{1000 + index}
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date().toLocaleDateString()}
                      </p>
                    </td>
                    <td className="p-4">
                      <p className="font-medium text-gray-800">
                        {order.name}
                      </p>
                    </td>
                    <td className="p-4">
                      <div className="space-y-1">
                        <p className="text-sm text-gray-600 flex items-center gap-1">
                          <FaPhone className="text-gray-400" /> {order.phone}
                        </p>
                      </div>
                    </td>
                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${order.payment === "ABA" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"}`}
                      >
                        {order.payment}
                      </span>
                    </td>
                    <td className="p-4">
                      <p className="font-bold text-lg text-gray-800">
                        ${order.total}
                      </p>
                    </td>
                    <td className="p-4">
                      <select className="border rounded px-3 py-1 text-sm bg-white">
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
  );
}