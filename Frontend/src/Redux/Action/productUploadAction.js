import { toast } from 'react-toastify'; // Import toast for notifications
import { success_upload } from '../Slice/productUploadSlice';

export const productUploadAction = (data) => async (dispatch) => {
    console.log("into the action page",[...data]); 
    try {
      const response = await fetch('http://localhost:8000/api/admin/upload-product', {
        method: 'POST',
        credentials: 'include',
        body: data,
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const result = await response.json();

      console.log(result);
  
      if (response.status === 200) {
        dispatch(success_upload(result));
        toast.success('Product uploaded successfully!');
      } else {
        toast.error('Failed to upload product.');
      }
    } catch (error) {
      
      console.error('Error:', error);
      toast.error('An error occurred while uploading the product.');
    }
  };
  