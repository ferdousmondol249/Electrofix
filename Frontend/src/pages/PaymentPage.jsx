import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { successPayment } from "../Redux/Slice/cartSlice";
import { useNavigate } from 'react-router-dom';

const PaymentPage = () => {
  const { email } = useSelector((state) => state.login.user);
  const { cartItems } = useSelector((state) => state.cartSlice);
  const { totalAmount } = useSelector((state) => state.cartSlice); 
  const dispatch=useDispatch();
  const navigation=useNavigate();

  const [data, setdata] = useState({
    cartItems: [],
    email: "",
    userName: "",
    location: "",
    phoneNumber: "",
    cardNumber: "",
    amount: 0, 
    status: "pending",
  });

  useEffect(() => {
    setdata((prev) => ({
      ...prev,
      cartItems: cartItems.map(item => ({
        productId: item.product._id,          
        quantity: item.quantity,
      })),
      email,
      amount: totalAmount, 
    }));
  }, [cartItems, email, totalAmount]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setdata((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const paymentResponse = await fetch("http://localhost:8000/api/cart/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      if (!paymentResponse.ok) {
        alert("Payment failed!");
        return;
      }
  
      console.log("✅ Payment successful, now updating stock...");
  
      for (const item of cartItems) {
        console.log(`🔍 Updating stock for product: ${item.product._id}, Quantity: ${item.quantity}`);
  
        const stockResponse = await fetch(`http://localhost:8000/api/modify-stock/${item.product._id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ quantity: item.quantity }),
        });
  
        const stockData = await stockResponse.json();
        console.log("🔹 Stock Update Response:", stockData);
  
        if (!stockResponse.ok || !stockData.success) {
          alert(`❌ Stock update failed for ${item.product.name}: ${stockData.message}`);
          return;
        }
      }
  
      dispatch(successPayment());
      alert("✅ Payment successful! Stock updated.");
  
      setdata({
        cartItems: [],
        email: "",
        userName: "",
        location: "",
        phoneNumber: "",
        cardNumber: "",
        amount: 0,
        status: "pending",
      });
  
    } catch (error) {
      console.error("⚠️ Error processing payment:", error);
      alert("An error occurred.");
    }
  };

  const handleNavigation=()=>{
    navigation('/');
  }
  
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-2xl p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Secure Checkout</h1>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">
              Personal Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative">
                <input
                  type="text"
                  name="userName"
                  placeholder="Full Name"
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  onChange={handleInputChange}
                />
              </div>

              <div className="relative">
                <input
                  type="tel"
                  name="phoneNumber"
                  placeholder="Contact Number"
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  onChange={handleInputChange}
                />
              </div>

              <div className="relative md:col-span-2">
                <input
                  type="text"
                  name="location"
                  placeholder="Delivery Address"
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">Payment Details</h3>
            <div className="relative">
              <input
                type="text"
                name="cardNumber"
                placeholder="Card Number"
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                onChange={handleInputChange}
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl font-bold hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl"
            onClick={handleNavigation}
          >
            Payment
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentPage;
