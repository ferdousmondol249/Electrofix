import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { productUploadAction } from './../Redux/Action/productUploadAction';

const UploadProduct = () => {


  const dispatch=useDispatch();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    regularPrice: '',
    discountPrice: '',
    quality: 'Medium',
    stock: '',
    catagory:'Mobile',
  });
  const [imageData, setImageData] = useState(null);


  const handleOnChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };
  
    const handleImageChange = (e) => {
      setImageData(e.target.files[0]); 
    };
  
    const handleSubmit = (e) => {
        e.preventDefault();
      
        const data = new FormData();
        data.append('name', formData.name); // Append name once
        data.append('description', formData.description); // Append description once
        data.append('regularPrice', formData.regularPrice);
        data.append('discountPrice', formData.discountPrice);
        data.append('quality', formData.quality);
        data.append('stock', formData.stock);
        data.append('catagory', formData.catagory); 
        data.append('image', imageData); // Append the file once
      
        //console.log([...data]); // Log to verify values
        dispatch(productUploadAction(data));
        setFormData({
          name: '',
          description: '',
          regularPrice: '',
          discountPrice: '',
          quality: 'Medium',
          stock: '',
          catagory: 'Mobile',
          image: null,
        });
        setImageData(null);
      };
      

 

  return (
    <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Upload Product</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium mb-2">Product Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleOnChange}
            required
            maxLength="10"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter product name"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleOnChange}
            required
            maxLength="20"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter product description"
          ></textarea>
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Catagory</label>
          <select
            name="catagory"
            value={formData.catagory}
            onChange={handleOnChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Mobile">Mobile</option>
            <option value="Watch">Watch</option>
            <option value="TV">TV</option>
            <option value="Laptop">Laptop</option>
            <option value="Headphone">Headphone</option>
            <option value="Earbud">Earbud</option>
            <option value='Keyboard'>Keyboard</option>
            <option value='Mouse'>Mouse</option>
            <option value='Monitor'>Monitor</option>
            <option value='Speaker'>Speaker</option>
            <option value='PowerBank'>PowerBank</option>
            <option value='Charger'>Charger</option>
            <option value='Joystick'>Joystick</option>
            <option value='MiniPC'>MiniPC</option>
          </select>
        </div>
        


        <div>
          <label className="block text-gray-700 font-medium mb-2">Regular Price</label>
          <input
            type="number"
            name="regularPrice"
            value={formData.regularPrice}
            onChange={handleOnChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter regular price"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">Discount Price</label>
          <input
            type="number"
            name="discountPrice"
            value={formData.discountPrice}
            onChange={handleOnChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter discount price"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">Quality</label>
          <select
            name="quality"
            value={formData.quality}
            onChange={handleOnChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">Stock</label>
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleOnChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter stock quantity"
          />
        </div>
        
        <div>
          <label className="block text-gray-700 font-medium mb-2">Product Image</label>
          <div className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center">
            <input
              type="file"
              name="image"
              onChange={handleImageChange}
              className="hidden"
              id="imageUpload"
              required
            />
            <label
              htmlFor="imageUpload"
              className="cursor-pointer text-blue-500 hover:underline"
            >
              Click to upload or drag and drop
            </label>
            {imageData && (
            <div className="mt-4">
                <img
                src={URL.createObjectURL(imageData)} // Generate a preview URL
                alt="Product Preview"
                className="w-32 h-32 object-cover mx-auto rounded-md"
                />
            </div>
            )}

          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
        >
          Upload Product
        </button>
      </form>
    </div>
  );
};

export default UploadProduct;
