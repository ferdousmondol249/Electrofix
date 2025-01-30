import { loginSuccess } from "../Slice/loginSlice";

export const loginAction = (data, navigate) => async (dispatch) => {

    try{
        const response = await fetch('http://localhost:8000/api/login', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json', // Ensure JSON is passed
            },
            body: JSON.stringify(data), // Stringify the data
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
       const result = await response.json();

      // console.log(result);
       const payload={
        name:result.data.name,
        email:result.data.email,
        image:result.data.image,
        role:result.data.role
       }
       //console.log(payload);

       if(response.status === 200){
        dispatch(loginSuccess(payload));
        navigate('/');
        
       }
       
    }catch(e)
    {
        console.log('Error:', e);
    }

}
