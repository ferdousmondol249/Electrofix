import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
    name: 'login',
    initialState: {
        isLogin: false,
        user: {
            name: null,
            email: null,
            image: null,
            role: null,
        },
    },
    reducers: {
        loginSuccess(state, action) {
            state.isLogin = true;
            state.user ={
                name: action.payload.name,
                email: action.payload.email,
                image: action.payload.image,
                role: action.payload.role,
            }
        },
        logout(state) {
            state.isLogin = false;
            state.user = {
                name: null,
                email: null,
                image: null,
                role: null,
            };
        }
    }
});

export const { loginSuccess, logout } = loginSlice.actions;
export default loginSlice.reducer;
