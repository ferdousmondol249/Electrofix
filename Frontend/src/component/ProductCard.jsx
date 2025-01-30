import { useDispatch, useSelector } from "react-redux";
import { remove_product } from "../Redux/Slice/productListSlice";
import { toast } from 'react-toastify';
import { useState } from "react";
import { update_product_stock } from "../Redux/Slice/productListSlice";

const ProductCard = ({ product }) => {
  const { _id, image, name, regularPrice, discountPrice, quality, stock, description } = product;
  const dispatch = useDispatch();
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  const productImage = `http://localhost:8000/${product.image.replace(/\\/g, "/")}`;

  const handleDeleteProduct = async (productId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:8000/api/admin/delete-product/${productId}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      toast.success('Successfully deleted');
      dispatch(remove_product(productId));
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const handleUpdateStock = async (productID) => {
    try {
      const response = await fetch(`http://localhost:8000/api/admin/update-stock/${productID}`, {
        method: 'PATCH',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          quantity: selectedQuantity,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      dispatch(update_product_stock({
        _id: productID,
        selectedQuantity: selectedQuantity,
      }));

      toast.success('Stock updated successfully');
    } catch (error) {
      console.error("An error occurred:", error);
      toast.error('Failed to update stock');
    }
  };

  return (
    <div className="border rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow duration-300 max-w-sm flex flex-col m-2">
      <div className="p-3 flex-grow">
        <div className="w-full h-40 mb-4 bg-gray-100 rounded-md overflow-hidden">
          <img
            src={productImage || "/placeholder.svg"}
            alt={name}
            className="w-full h-full object-cover object-center"
            onError={(e) => {
              e.currentTarget.src = "/placeholder.svg";
              e.currentTarget.className = "w-full h-full object-contain";
            }}
          />
        </div>
        <h2 className="text-sm font-bold mb-2 truncate">{name}</h2>
        <p className="text-xs text-gray-600 mb-3 line-clamp-2">{description}</p>
        <div className="flex items-center justify-between mb-3">
          <span className="text-lg font-bold text-green-600">DisPrice: ${discountPrice}</span>
          <span className="text-xs text-gray-400 line-through">RegPrice: ${regularPrice}</span>
        </div>
        <div className="flex justify-between text-xs text-gray-500 mb-3">
          <p>Quality: {quality}</p>
          <p>Stock: {stock}</p>
        </div>
        <div className="my-2">
          <label htmlFor={`quantity-${_id}`} className="text-xs text-gray-600 block mb-1">
            Quantity
          </label>
          <select
            id={`quantity-${_id}`}
            className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs"
            value={selectedQuantity}
            onChange={(e) => setSelectedQuantity(Number(e.target.value))}
          >
            {Array.from({ length: 100 }, (_, index) => (
              <option key={index + 1} value={index + 1}>
                {index + 1}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="p-3 bg-gray-50 rounded-b-lg">
        <div className="flex justify-between space-x-2">
          <button
            onClick={() => handleUpdateStock(_id)}
            className="flex-1 bg-blue-500 text-white px-3 py-2 rounded-md text-xs font-medium hover:bg-blue-600 transition-colors duration-300"
          >
            Add to Stock
          </button>
          <button
            onClick={() => handleDeleteProduct(_id)}
            className="flex-1 bg-red-400 text-white px-3 py-2 rounded-md text-xs font-medium hover:bg-gray-500 transition-colors duration-300"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
