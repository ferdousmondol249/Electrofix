import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isFetchProduct: false,
  isAddProduct: false,
  isPayment:false,
  isHomePage:true,
  isAdminPage:false,
  products: [],
  latestProducts:[], 
  searchQuery: [],
};

const productListSlice = createSlice({
  name: "product-list",
  initialState,
  reducers: {
    success_product_fetch: (state, action) => {
      state.isFetchProduct = true;
      state.products = action.payload;
    },
    error_product_fetch: (state) => {
      state.isFetchProduct = false;
      state.products = [];
    },
    set_latest_products(state, action) {
      state.latestProducts = action.payload;
    },
    remove_product: (state, action) => {
      state.products = state.products.filter((product) => product._id !== action.payload);
    },
    update_product_stock: (state, action) => {
      state.products = state.products.map((product) =>
        product._id === action.payload._id
          ? { ...product, stock: product.stock + action.payload.selectedQuantity }
          : product
      );

      state.latestProducts = state.latestProducts.map((product) =>
        product._id === action.payload._id
          ? { ...product, stock: product.stock + action.payload.selectedQuantity }
          : product
      );
    },
    set_search_query: (state, action) => {
      state.searchQuery = action.payload; 
    },
   
    
    
  },
});

export const { success_product_fetch, error_product_fetch, remove_product, update_product_stock,set_latest_products, set_search_query } =
  productListSlice.actions;
export default productListSlice.reducer;
