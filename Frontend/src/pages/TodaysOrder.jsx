import { useState, useEffect } from 'react';

const TodaysOrder = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/api/all-order')
      .then(response => response.json())
      .then(data => setOrders(data))
      .catch(error => console.error('Error fetching orders:', error));
  }, []);

  const handleStatusChange = async (paymentID) => {
    try {
      const response = await fetch("http://localhost:8000/api/update-status", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId: paymentID, status: "Resolved" }),
      });

      if (!response.ok) {
        throw new Error("Failed to update status");
      }

      // Update UI locally
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.paymentID === paymentID ? { ...order, status: "Resolved" } : order
        )
      );
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  // Calculate rowSpan for paymentID
  const paymentRowSpans = new Map();
  orders.forEach(order => {
    if (!paymentRowSpans.has(order.paymentID)) {
      paymentRowSpans.set(order.paymentID, { count: 0, firstIndex: -1 });
    }
    paymentRowSpans.get(order.paymentID).count += 1;
  });

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow-md">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product Image</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User Mobile No</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quantity</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {orders.map((order, index) => {
            const paymentData = paymentRowSpans.get(order.paymentID);
            const isFirstRow = paymentData.firstIndex === -1;

            if (isFirstRow) {
              paymentRowSpans.get(order.paymentID).firstIndex = index;
            }

            return (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <img
                    src={`http://localhost:8000/${order.productImage.replace(/\\/g, '/')}`}
                    alt="Product"
                    className="w-10 h-10 rounded-md"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.productName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.userName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.contactNo}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.quantity}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.location}</td>

                {/* Apply rowSpan for the first occurrence of a paymentID */}
                {isFirstRow && paymentData.count > 0 && (
                  <td
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 cursor-pointer"
                    rowSpan={paymentData.count}
                    onClick={() => handleStatusChange(order.paymentID)}
                  >
                    <span
                      className={`px-2 py-1 text-sm font-semibold rounded-full transition-all duration-300 cursor-pointer ${
                        order.status === "Resolved"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TodaysOrder;
