import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userListAction } from "../Redux/Action/userListAction"; 
import defPic from "../assets/default.jpg";
import moment from "moment";

const UserList = () => {
  const dispatch = useDispatch();

  const users = useSelector(state => state.userList.users);
  

  useEffect(() => {
    dispatch(userListAction());
  }, [dispatch]);

  const handleDelete = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) {
      return;
    }
    try {
      const response = await fetch(`http://localhost:8000/api/admin/delete-user/${userId}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to delete user");
      }
      dispatch(userListAction());
    } catch (error) {
      console.error("Error deleting user:", error.message);
      alert(error.message || "Failed to delete user");
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-20px)] bg-gray-100">
      <h1 className="text-2xl font-bold mb-4 p-6">User List</h1>

      <div className="flex-1 overflow-y-auto bg-white border border-gray-200 rounded-lg shadow-md mx-6">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-200 text-gray-600 uppercase text-sm">
            <tr>
              <th className="px-6 py-3 text-left">Image</th>
              <th className="px-6 py-3 text-left">Name</th>
              <th className="px-6 py-3 text-left">Email</th>
              <th className="px-6 py-3 text-left">Created At</th>
              <th className="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users && users.length > 0 ? (
              users.map((user) => (
                <tr key={user.id} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="px-6 py-4">
                    <img
                      src={user.image ? `http://localhost:8000/${user.image.replace(/\\/g, '/')}` : defPic}
                      alt={user.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  </td>
                  <td className="px-6 py-4">{user.name}</td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">
                    {moment(user.createAt).format('DD/MM/YYYY')}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button onClick={()=>handleDelete(user.id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 ml-2">
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center px-6 py-4">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;
