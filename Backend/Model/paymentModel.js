const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    userName: { type: String, required: true },
    location: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    cartItems: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, required: true },
        quantity: { type: Number, required: true },
      },
    ],
    cardNumber: { type: String, required: true },
    status: { type: String, default: 'pending' },
    amount: { type: Number, required: true }
  },
  { timestamps: true } 
);

module.exports = mongoose.model('Payment', PaymentSchema);
