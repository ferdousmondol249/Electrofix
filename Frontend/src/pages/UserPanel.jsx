import { Link, Outlet, useLocation } from "react-router-dom";



const UserPanel = () => {

  const location = useLocation(); 
  

  return (
    <div className="flex h-screen">
      <div className="bg-white text-black w-64 p-5 border-r border-gray-200 shadow-lg">
        <h2 className="text-xl font-bold mb-5">User Panel</h2>
        <ul>
          <li className="py-2">
            <Link to="/" className="flex items-center py-2 px-4 rounded-lg font-bold hover:bg-gray-200 transition">
              Home
            </Link>
          </li>
          <li className="py-2">
            <Link to="/user-panel/my-order" className="flex items-center py-2 px-4 rounded-lg font-bold hover:bg-gray-200 transition">
              My Orders
            </Link>
          </li>
          <li className="py-2">
            <Link to="/modify-profile" className="flex items-center py-2 px-4 rounded-lg font-bold hover:bg-gray-200 transition">
              Settings
            </Link>
          </li>
        </ul>
      </div>

      <div className="flex-1 flex flex-col bg-gray-100 p-5">
        
        {location.pathname === "/user-panel" && (
          <div className="flex justify-center items-center h-full">
            <img src="https://img.freepik.com/free-vector/set-flat-design-electronics-logo-templates_23-2148970367.jpg?ga=GA1.1.773459160.1737653551&semt=ais_hybrid" alt="Logo" className="w-full h-full" />
          </div>
        )}

        {location.pathname !== "/user-panel" && (
          <div className="flex-1 overflow-y-auto bg-white shadow-lg p-5 rounded-lg">
            <Outlet />
          </div>
        )}
      </div>
    </div>
  );
};

export default UserPanel;
