import { IoTrashOutline } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import { addedOne, removeFromCart, resetCart } from "../Redux/Slice/cartSlice"; 
import { useNavigate } from "react-router-dom";
const CartPage = () => {

  const navigate=useNavigate();
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cartSlice);

  const handleIncrement = (productId) => {
    // Find the product in the cart
    const product = cartItems.find(item => item.product._id === productId);
  
    if (product) {
      const availableStock = product.product.stock; // Available stock for the product
      const currentQuantity = product.quantity; // Current quantity of the product in the cart
  
      // If current quantity is less than available stock, increment the quantity
      if (currentQuantity < availableStock) {
        dispatch(addedOne({ product: product.product, quantity: 1 })); // Increment by 1
      } else {
        alert("Not enough stock available.");
      }
    } else {
      alert("Product not found in the cart.");
    }
  };
  
  
  const handleDecrement = (productId, quantity) => {
    const product = cartItems.find(item => item.product._id === productId);
    if (product) {
      if (product.quantity > 1) {
        dispatch(removeFromCart({ productId: productId, quantity: 1 }));
      } else {
        alert("You must have at least 1 item.");
      }
    }
  };
  const handleRemoveItem = (productId, quantity) => {
    dispatch(removeFromCart({ productId, quantity }));
    dispatch(resetCart());
  };

 
  
  
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.product.discountPrice * item.quantity, 0);
  };
  

  
  

  const navigationOnPayment = () => {
    navigate('/payment');
  };


  const calculateTax = (subtotal) => subtotal * 0.01; 
  const calculateShipping = () => 10; 

  const subtotal = calculateTotal();
  const tax = calculateTax(subtotal);
  const shipping = calculateShipping();
  const total = subtotal + tax + shipping;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Your Cart</h1>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 bg-white rounded-lg shadow-md overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase">Product</th>
                <th className="px-6 py-4 text-center text-sm font-medium text-gray-500 uppercase">Price</th>
                <th className="px-6 py-4 text-center text-sm font-medium text-gray-500 uppercase">Quantity</th>
                <th className="px-6 py-4 text-center text-sm font-medium text-gray-500 uppercase">Total</th>
                <th className="px-6 py-4 text-center text-sm font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {cartItems.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center text-gray-700">
                    No items in the cart.
                  </td>
                </tr>
              ) : (
                cartItems.map((item) => (
                  <tr key={item.product._id}>
                    <td className="px-6 py-4 flex items-center space-x-4">
                     
                    <img
                    src={item.product.image ? `http://localhost:8000/${item.product.image.replace(/\\/g, "/")}` : '/path/to/default-image.jpg'}
                    alt="Product"
                    className="h-16 w-16 object-cover rounded-lg"
                  />

                      <span className="text-gray-800 font-medium">{item.product.name}</span>
                    </td>
                    <td className="px-6 py-4 text-center text-gray-700">${item.product.discountPrice}</td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center space-x-2">
                        <button
                          className="px-3 py-1 text-sm text-white bg-red-500 rounded-lg hover:bg-red-600 transition duration-200"
                          onClick={() => handleDecrement(item.product._id, -1)}
                        >
                          -
                        </button>
                        <span className="text-gray-700">{item.quantity}</span>
                        <button
                          className="px-3 py-1 text-sm text-white bg-green-500 rounded-lg hover:bg-green-600 transition duration-200"
                          onClick={() => handleIncrement(item.product._id, 1)}
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center text-gray-700">${item.product.discountPrice * item.quantity}</td>
                    <td className="px-6 py-4 text-center">
                      <button
                        className="text-red-500 hover:text-red-700 transition duration-200"
                        onClick={() => handleRemoveItem(item.product._id, item.quantity)}
                      >
                        <IoTrashOutline className="inline-block" size={20} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Column 2: Summary Sidebar */}
        <div className="w-full lg:w-1/3 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Order Summary</h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span className="text-gray-800 font-medium">${subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Shipping</span>
              <span className="text-gray-800 font-medium">${shipping}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Tax</span>
              <span className="text-gray-800 font-medium">${tax}</span>
            </div>
            {/* Line (Divider) */}
            <hr className="my-2 border-gray-200" />
            <div className="flex justify-between">
              <span className="text-gray-800 font-bold">Total</span>
              <span className="text-gray-800 font-bold">${total}</span>
            </div>
          </div>
          <button
            className="mt-6 w-full bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-200"
            onClick={navigationOnPayment}
          >
            Go for Payment
          </button>
        </div>
      </div>  
    </div>
  );
};

export default CartPage;
