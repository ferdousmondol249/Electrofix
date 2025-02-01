const Payment = require('../Model/paymentModel');

const updateStatusController = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    console.log(orderId, status);

    if (!orderId || !status) {
      return res.status(400).json({ message: "Order ID and status are required" });
    }

    const updatedOrder = await Payment.findOneAndUpdate(
      { _id: orderId }, 
      { $set: { status } }, 
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({ message: "Status updated successfully" });
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = updateStatusController;
