const Payment = require('../Model/paymentModel');
const Product = require('../Model/productModel'); // Import Product model (if needed)

const allOrderController = async (req, res) => {
  try {
    // Fetch all payments and explicitly populate productId
    const payments = await Payment.find()
      .populate({
        path: 'cartItems.productId', // Populate the productId field inside cartItems
        model: Product,  // Explicitly specify the Product model for population
        select: 'name image',  // Select only name and image from the Product model
      });

    const paymentDetails = payments.map((payment) => {
      return payment.cartItems.map((item) => ({
        productId: item.productId._id,
        productName: item.productId.name,
        productImage: item.productId.image,
        userName: payment.userName,
        location: payment.location,
        contactNo: payment.phoneNumber,
        quantity: item.quantity,
        status: payment.status,
        paymentID:payment._id
      }));
    }).flat();  // Flatten the array of products

    res.status(200).json(paymentDetails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = allOrderController;
