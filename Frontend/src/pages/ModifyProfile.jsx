import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { updateUser } from '../Redux/Slice/loginSlice';

const ModifyProfile = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.login.user);
  const [formData, setFormData] = useState({
    name: '',
    password: '',
    image: '',
  });

  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        password: '',
        image: user.image || '',
      });

      if (user.image) {
        // Set the image preview with the correct URL
        setImagePreview(`http://localhost:8000/${user.image.replace(/\\/g, '/')}`);
      }
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prevData) => ({
        ...prevData,
        image: file,
      }));
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('name', formData.name);
    data.append('password', formData.password);
    data.append('email', user.email);

    if (formData.image instanceof File) {
      data.append('image', formData.image);
    }

    try {
      const response = await fetch('http://localhost:8000/api/modify-profile', {
        method: 'POST',
        credentials: 'include',
        body: data,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      if (result) {
        toast.success('Profile updated successfully!');

        
        dispatch(updateUser({
          name: result.user.name,
          email: result.user.email,
          image: result.user.image,
          role: user.role, // Preserve the role from the existing user state
        }));

        // Update the image preview with the new image URL from the backend
        if (result.user.image) {
          setImagePreview(`http://localhost:8000/${result.user.image.replace(/\\/g, '/')}`);
        }
      }

      // Reset form data
      setFormData({
        name: '',
        password: '',
        image: '',
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile. Please try again.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Modify Profile</h2>

        {/* Profile Image Section */}
        <div className="relative mb-6">
          <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-white shadow-lg">
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-200"></div>
            )}
          </div>
        </div>

        <div className="mb-4">
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleImageChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Leave blank if you don't want to change"
              className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full mt-4 px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default ModifyProfile;