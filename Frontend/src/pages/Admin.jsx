import { Outlet, Link } from "react-router-dom";
import {
  FaUsers,
  FaBox,
  FaShoppingCart,
  FaChartBar,
  FaCog,
  FaHome,
} from "react-icons/fa";

const AdminPage = () => {
  return (
    <div className="flex" style={{ height: "calc(100vh - 50px)" }}>
      {/* Sidebar */}
      <div className="bg-white text-black w-64 p-5 border-r border-gray-200">
        <h2 className="text-xl font-bold mb-5">Admin Panel</h2>
        <ul>
          <li className="py-2">
            <Link
              to="/admin/dashboard"
              className="flex items-center py-2 px-4 rounded-lg font-bold hover:opacity-60"
            >
              <FaHome className="mr-3" size={18} />
              Dashboard
            </Link>
          </li>
          <li className="py-2">
            <Link
              to="/admin/userlist"
              className="flex items-center py-2 px-4 rounded-lg font-bold hover:opacity-60"
            >
              <FaUsers className="mr-3" size={18} />
              User Management
            </Link>
          </li>
 
          <li className="py-2 relative group">
            <div
              className="flex items-center py-2 px-4 rounded-lg font-bold hover:opacity-60 cursor-pointer"
            >
              <FaBox className="mr-3" size={18} />
              Product Management
            </div>

            
            <ul className="hidden group-hover:flex flex-col mt-2 bg-white border border-gray-200 rounded-lg shadow-lg">
              <li>
                <Link
                  to="/admin/product-list"
                  className="block px-4 py-2 hover:bg-gray-100 text-black"
                >
                  All Products
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/upload-product"
                  className="block px-4 py-2 hover:bg-gray-100 text-black"
                >
                  Upload New Product
                </Link>
              </li>
            </ul>
        </li>
 

        

          <li className="py-2 relative group">
            < div className="flex items-center py-2 px-4 rounded-lg font-bold hover:opacity-60">
                
                  <FaShoppingCart className="mr-3" size={18} />
                  Orders Management
            </div>
            <ul className="hidden group-hover:flex flex-col mt-2 bg-white border border-gray-200 rounded-lg shadow-lg">
              <li>
                <Link
                  to="/admin/all-order"
                  className="block px-4 py-2 hover:bg-gray-100 text-black"
                >
                  Today`s Order
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/upload-product"
                  className="block px-4 py-2 hover:bg-gray-100 text-black"
                >
                 All Order
                </Link>
              </li>
            </ul>
            
          </li>


          <li className="py-2">
            <Link
              to="/admin/sales"
              className="flex items-center py-2 px-4 rounded-lg font-bold hover:opacity-60"
            >
              <FaChartBar className="mr-3" size={18} />
              Sales Overview
            </Link>
          </li>
          <li className="py-2">
            <Link
              to="/admin/settings"
              className="flex items-center py-2 px-4 rounded-lg font-bold hover:opacity-60"
            >
              <FaCog className="mr-3" size={18} />
              Settings
            </Link>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-gray-100">
        {/* Content Area */}
        <div className="flex-1 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
