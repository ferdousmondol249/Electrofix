import { success_register } from "../Slice/registerSlice";

export const registerAction = (data) => async (dispatch) => {
  try {

    const response = await fetch(`http://localhost:8000/api/register`, {
      method: 'POST',
      credentials: 'include',
      body: data,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

    //console.log('Server response:', result); // Log the server's response

    if (response.status === 200) {
      dispatch(success_register(result));
    }
  } catch (error) {
    console.error('Error:', error);
  }
};
