import { createSlice } from "@reduxjs/toolkit";

const userListSlice = createSlice({
  name: 'user-list',
  initialState: {
    users: [], 
  },
  reducers: {
    success_user_fetch: (state, action) => {
      state.users = action.payload;
      //console.log("state users are:", state.users);
    },
    error_user_fetch: (state) => {
      state.users = [];
    }
  }
});

export const { success_user_fetch, error_user_fetch } = userListSlice.actions;
export default userListSlice.reducer;
