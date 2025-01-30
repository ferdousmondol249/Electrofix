import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAdded: false,
  isPayment: false,
  cartCount: 0,
  cartItems: [],
  totalAmount:0,
};

const cartSlice = createSlice({
  name: "Cart",
  initialState,
  reducers: {
    addedCart: (state, action) => {
      const { product, quantity } = action.payload;
      const existingProduct = state.cartItems.find(
        (item) => item.product._id === product._id
      );
      if (existingProduct) {
        existingProduct.quantity += quantity;
      } else {
        state.cartItems.push({ product, quantity });
      }
      state.cartCount += quantity;
      state.isAdded = true; 
      state.totalAmount += product.discountPrice * quantity;
    },
    removeFromCart: (state, action) => {
        const { productId, quantity } = action.payload;
          const existingProductIndex = state.cartItems.findIndex(
          (item) => item.product._id === productId
        );
      
        if (existingProductIndex !== -1) {
          const existingProduct = state.cartItems[existingProductIndex];
          if (quantity >= existingProduct.quantity) {
            state.cartItems.splice(existingProductIndex, 1);
          } else if (quantity > 0) {
            existingProduct.quantity -= quantity;
          }
            state.cartCount = state.cartItems.reduce(
            (total, item) => total + item.quantity,
            0
          );
          state.totalAmount -= existingProduct.product.discountPrice * quantity;
        }

      },
      addedOne: (state, action) => {
        const { product, quantity } = action.payload;
        const existingProduct = state.cartItems.find(
          (item) => item.product._id === product._id
        );
        if (existingProduct) {
          existingProduct.quantity += 1; // Increment quantity by 1
        } else {
          state.cartItems.push({ product, quantity });
        }
        state.cartCount += 1; // Increment cart count by 1
        state.isAdded = true;
        state.totalAmount += existingProduct.product.discountPrice; // Add the price of the product to the total amount
      },
      
      
    successPayment: (state) => {
      state.isPayment = true;
      state.cartItems = [];
      state.cartCount = 0;
      state.isAdded = false;
      state.totalAmount = 0;
    },
    resetCart: (state) =>{
      state.cartItems = [];
      state.cartCount = 0;
      state.isAdded = false;
      state.isPayment = false;
      state.totalAmount = 0;
      

    }
  },
});

export const { addedCart, removeFromCart, successPayment, resetCart, addedOne } = cartSlice.actions;
export default cartSlice.reducer;
