import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const OrderTable = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const email = useSelector((state) => state.login.user.email);

  const fetchOrders = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/user-panel/order/${email}`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch orders");
      }

      const data = await response.json();
      setOrders(data.reverse());
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (email) {
      fetchOrders();
    }
  }, [email]);

  // Group orders by paymentID
  const groupedOrders = orders.reduce((acc, order) => {
    if (!acc[order.paymentID]) acc[order.paymentID] = [];
    acc[order.paymentID].push(order);
    return acc;
  }, {});

  return (
    <div className="overflow-x-auto bg-white shadow-md rounded-lg p-4">
      {loading ? (
        <div className="text-center text-gray-500 py-4">Loading...</div>
      ) : (
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-100 text-left text-sm font-medium text-gray-700">
              <th className="px-4 py-2">Product Image</th>
              <th className="px-4 py-2">Product Name</th>
              <th className="px-4 py-2">Quantity</th>
              <th className="px-4 py-2">Order Status</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(groupedOrders).map((paymentID) => {
              const grouped = groupedOrders[paymentID];
              const status = grouped[0].status || "Pending"; // Status is the same for all items in the group
              const rowSpan = grouped[0].items.length; // Row span for each item in the group (based on items array)

              return grouped[0].items.map((item, index) => (
                <tr key={item.paymentID + index} className="border-b hover:bg-gray-50">
                  {/* Product Image */}
                  <td className="px-4 py-4">
                    {item.image ? (
                      <img
                        src={`http://localhost:8000/${item.image.replace(/\\/g, "/")}`}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded"
                      />
                    ) : (
                      <span>No Image</span>
                    )}
                  </td>

                  {/* Product Name */}
                  <td className="px-4 py-4 text-sm text-gray-700">{item.name}</td>

                  {/* Quantity */}
                  <td className="px-4 py-4 text-sm text-gray-700">{item.quantity}</td>

                  {/* Order Status (only render once per group) */}
                  {index === 0 && (
                   <td className="px-4 py-4" rowSpan={rowSpan}>
                   <span
                     className={`px-3 py-1 text-xs font-semibold text-white rounded-full ${
                       status === "Resolved" ? "bg-green-500" : "bg-yellow-500"
                     }`}
                   >
                     {status}
                   </span>
                 </td>
                 
                  )}

                  {/* Actions (only render once per group) */}
                  {index === 0 && (
                    <td className="px-4 py-4" rowSpan={rowSpan}>
                      <button className="text-blue-500 hover:underline text-sm">
                        Review
                      </button>
                    </td>
                  )}
                </tr>
              ));
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OrderTable;
