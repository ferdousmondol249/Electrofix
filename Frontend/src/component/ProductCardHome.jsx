import { addedCart, removeFromCart } from '../Redux/Slice/cartSlice';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import {toast} from 'react-toastify';

const ProductCardHome = ({ product }) => {
  const { _id, image, name, regularPrice, discountPrice, quality, stock, description } = product;
  const productImage = `http://localhost:8000/${image.replace(/\\/g, "/")}`;
  
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);

  const addToCart = (product, quantity) => {
    if (stock === 0) {
      toast.error("This product is out of stock");
      return;
    }
    dispatch(addedCart({ product, quantity }));
    toast.success("Product added Successfully");
  };

  const cartToRemove = (productId, quantity) => {
    dispatch(removeFromCart({ productId, quantity }));
    toast.success("Product removed Successfully");
  };

  return (
    <div className="border rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow duration-300 max-w-xs w-full flex flex-col">
      <div className="p-2 flex-grow">
        <div className="w-full mb-2 bg-white rounded-md overflow-hidden relative aspect-[4/3]">
          <img
            src={productImage}
            alt={name}
            className="w-full h-full object-contain"
          />
        </div>
        <h2 className="text-sm font-semibold mb-1 truncate">{name}</h2>
        <p className="text-xs text-gray-600 mb-2 line-clamp-2">{description}</p>
        <div className="flex items-center justify-between mb-2">
          <span className="text-base font-bold text-green-600">DisPrice: ${discountPrice}</span>
          <span className="text-xs text-gray-400 line-through">RegPrice: ${regularPrice}</span>
        </div>
        <div className="flex justify-between text-xs text-gray-500 mb-2">
          <p>Quality: {quality}</p>
          <p>Stock: {stock}</p>
        </div>
        <div className="mb-2">
          <label htmlFor={`quantity-${_id}`} className="text-xs text-gray-600 block mb-1">
            Quantity
          </label>
          <select
            id={`quantity-${_id}`}
            className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-xs"
            onChange={(e) => setQuantity(Number(e.target.value))}
          >
            {Array.from({ length: stock }, (_, index) => (
              <option key={index + 1} value={index + 1}>
                {index + 1}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="p-2 bg-gray-50 rounded-b-lg">
        <div className="flex justify-between space-x-2">
          <button className="flex-1 bg-blue-500 text-white px-3 py-1.5 rounded-md text-xs font-medium hover:bg-blue-600 transition-colors duration-300"
            onClick={() => addToCart(product, quantity)}>
            Add to Cart
          </button>
          <button className="flex-1 bg-green-500 text-white px-3 py-1.5 rounded-md text-xs font-medium hover:bg-green-600 transition-colors duration-300"
          onClick={()=>cartToRemove(_id,quantity)}>

            Remove From Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCardHome;
