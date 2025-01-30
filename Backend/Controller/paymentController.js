const Payment = require('../Model/paymentModel');

const paymentController = async (req, res) => {
  try {
    const { email, userName, location, phoneNumber, cartItems, cardNumber, status,amount } = req.body;

    if (!email || !userName || !location || !phoneNumber || !cartItems || !cardNumber || !amount) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (!Array.isArray(cartItems) || cartItems.length === 0) {
      return res.status(400).json({ message: 'Cart items cannot be empty' });
    }

    if (!/^[0-9]{16}$/.test(cardNumber)) {
      return res.status(400).json({ message: 'Invalid card number' });
    }

    const newPayment = new Payment({
      email,
      userName,
      location,
      phoneNumber,
      cartItems,
      cardNumber,
      amount,
      status: status || 'pending',
    });

    const savedPayment = await newPayment.save();

    return res.status(201).json({
      message: 'Payment processed successfully',
      payment: savedPayment,
    });
  } catch (error) {
    console.error('Error processing payment:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = paymentController;
