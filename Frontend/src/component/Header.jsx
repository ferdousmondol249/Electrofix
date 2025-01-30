import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../Redux/Slice/loginSlice";
import logo from "../assets/logo.png";
import defPic from "../assets/default.jpg";
import { IoCartOutline } from "react-icons/io5";
import { useState } from "react";
import {resetCart} from '../Redux/Slice/cartSlice'
import {toast } from 'react-toastify'
import { success_product_fetch } from "../Redux/Slice/productListSlice";
const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLogin } = useSelector((state) => state.login);
  const { cartCount } = useSelector((state) => state.cartSlice);

  const profileImageUrl = user?.image
    ? `http://localhost:8000/${user.image.replace(/\\/g, "/")}`
    : defPic;

  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(resetCart());
    navigate("/");
  };

  const handleDropdownToggle = () => {
    setShowDropdown((prev) => !prev);
  };

  const handleAdminNavigation = () => {
    navigate("/admin");
  };

  const handleUserNavigation = () => {
    navigate("/user-panel");
  };
  
  const handleCartNavigation = () => {
    if (user.email) {
      if (cartCount > 0) {
        navigate("/cart"); 
      } else {
        toast.error("Please add at least one item to the cart");
      }
    } else {
      navigate("/login"); 
    }
  };
  

  const [searchData, setSearchData] = useState("");
  const [product, setProduct] = useState([]);
  
  const handleSearch = async (e) => {
      e.preventDefault();
     
  
      try {
          const response = await fetch(`http://localhost:8000/api/search-products?name=${encodeURIComponent(searchData)}`, {
              method: "GET",
              headers: {
                  "Content-Type": "application/json",
              },
          });
  
          if (!response.ok) {
              toast.error("Failed to fetch products");
              return;
          }
  
          const data = await response.json();
  
          if (data.success) {
             //dispatch(success_product_fetch(data));
              setProduct(data.products);
          } else {
              toast.error("No products found");
          }
      } catch (error) {
          console.error("Error fetching products:", error);
          toast.error("Something went wrong!");
      }
  };

  //console.log(product);
  
 
 

  return (
    <header className="flex items-center justify-between bg-slate-400 shadow p-4">
      <div className="flex items-center space-x-2">
        <img
          src={logo}
          alt="Logo"
          className="h-10 w-10 cursor-pointer"
          onClick={() => navigate("/")}
        />
        <span className="text-xl font-semibold text-gray-700">ElectroFix</span>
      </div>

      <div className="flex-1 mx-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
            onChange={(e)=>setSearchData(e.target.value)}
          />
          <button className="absolute top-0 right-0 px-4 py-2 text-white bg-blue-500 rounded-r-lg hover:bg-blue-600"
          onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div>
          <div className="mx-4 text-sm text-blue-800">
            <p>{cartCount}</p>
          </div>
          <div>
            <IoCartOutline
              style={{ color: "#d11580", fontSize: "32px" }}
              className="text-3xl text-white"
              onClick={handleCartNavigation}
            />
          </div>
        </div>

        {isLogin ? (
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-sm text-white bg-violet-900 rounded-lg hover:bg-purple-800 ml-6"
          >
            Logout
          </button>
        ) : (
          <Link to="/login">
            <button className="px-4 py-2 text-sm text-white bg-violet-900 rounded-lg hover:bg-purple-800">
              Login
            </button>
          </Link>
        )}

        <div className="relative inline-block">
          <img
            src={profileImageUrl}
            alt="User Profile"
            className="h-10 w-10 rounded-full shadow cursor-pointer"
            onClick={handleDropdownToggle}
          />

          {showDropdown && (
            <div className="absolute left-0 z-10 bg-gray-800 text-white text-sm rounded-lg shadow-lg mt-2 w-fit">
              <div className="flex flex-row space-x-4">
                {user?.role === "Admin" ? (
                  <button
                    onClick={handleAdminNavigation}
                    className="hover:bg-gray-700 rounded-md whitespace-nowrap py-2 px-2"
                  >
                    Admin
                  </button>
                ) : (
                  <button
                    onClick={handleUserNavigation}
                    className="hover:bg-gray-700 rounded-md whitespace-nowrap py-2 px-2"
                  >
                    User
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
