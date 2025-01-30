import { Link, useNavigate } from "react-router-dom";
import { useState} from "react";
import { useDispatch } from "react-redux";
import { loginAction } from "../Redux/Action/loginAction";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      email: formData.email,
      password: formData.password,
    };

    dispatch(loginAction(data, navigate)); 
  };

 
 

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
           Welcome Back
        </h2>

        
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleOnChange}
                placeholder="Enter your email address"
                className="w-full mt-1 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleOnChange}
                placeholder="Enter your password"
                className="w-full mt-1 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition duration-300"
              >
                Login
              </button>
            </div>
          </form>
      

        
          <div className="mt-6 flex items-center justify-between text-sm">
            <div className="text-blue-600 underline hover:text-blue-400">
              <Link to={"/forgot-password-req"}>Forgot Password?</Link>
            </div>
            <div className="text-blue-600 underline hover:text-blue-400">
              <Link to={"/register"}>Create Account</Link>
            </div>
          </div>
  
      </div>
    </div>
  );
};

export default Login;
