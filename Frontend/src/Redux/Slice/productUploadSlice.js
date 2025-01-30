import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isUpload: false,
  product: {
    name: null,
    description: null,
    regularPrice: null,
    discountPrice: null,
    quality: null,
    catagory:null,
    image: null,
  },
};

const productUploadSlice = createSlice({
  name: "product-upload",
  initialState,
  reducers: {
    success_upload: (state, action) => {
      state.isUpload = true;
      state.product = {
        name: action.payload.product.name,
        description: action.payload.product.description,
        regularPrice: action.payload.product.regularPrice,
        discountPrice: action.payload.product.discountPrice,
        quality: action.payload.product.quality,
        catagory: action.payload.product.catagory,
        image: action.payload.product.image,
      };
    },
    error_upload: (state) => {
      return initialState;
    },
  },
});

export const { success_upload, error_upload } = productUploadSlice.actions;
export default productUploadSlice.reducer;
