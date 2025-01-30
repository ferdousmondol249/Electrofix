import { success_user_fetch, error_user_fetch } from "../Slice/userListSlice";
export const userListAction = () => async (dispatch) => {
  try {
    const response = await fetch(`http://localhost:8000/api/admin/userlist`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    //console.log('Full API response:', result);

    if (!Array.isArray(result.users)) {
      throw new Error('Expected result.users to be an array');
    }

    const users = result.users.map(user => ({
      id: user._id, 
      name: user.name,
      email: user.email,
      image: user.image,
      createdAt: user.createdAt,
    }));

    
    dispatch(success_user_fetch(users)); // Dispatch the array of users
  } catch (error) {
    console.error('Error:', error);
    dispatch(error_user_fetch()); // Dispatch error if any exception occurs
  }
};
