import { combineReducers } from "@reduxjs/toolkit";
import registerSlice from "./Slice/registerSlice";
import loginSlice from "./Slice/loginSlice";
import userListSlice from "./Slice/userListSlice";
import productUploadSlice from "./Slice/productUploadSlice";
import productListSlice from "./Slice/productListSlice";
import cartSlice from "./Slice/cartSlice";



const rootReducer = combineReducers({
     register: registerSlice, 
     login:loginSlice,
     userList:userListSlice,
     uploadProduct: productUploadSlice,
     productList:productListSlice,
     cartSlice: cartSlice
});

export default rootReducer;