import { createSlice } from "@reduxjs/toolkit";


const registerSlice=createSlice({

        name:'regiser',
        initialState:{
            isRegister:false,
            user: {
                name: null,
                email: null,
                password: null,
                image: null,
                },
            token:null,
            image:null

        },
        reducers:{
            success_register:(state, action)=>{
                state.isRegister=true;
                state.user={
                    name: action.payload.user.name,
                    email: action.payload.user.email,
                    image: action.payload.user.imageUrl,
                }
            },
            error_register:(state)=>{
                state.isRegister=false;
                state.user={
                    name: null,
                    email: null,
                    image: null
                }
                state.token=null;
            }
        


    }
});

export const {success_register, error_register}=registerSlice.actions;
export default registerSlice.reducer;