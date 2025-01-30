import { success_product_fetch, error_product_fetch, set_latest_products } from "../Slice/productListSlice";

export const productListAction = () => async (dispatch) => {
  try {
    const response = await fetch("http://localhost:8000/api/all-products", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    

    if (
      !result.products || 
      !Array.isArray(result.products.allProducts) || 
      !Array.isArray(result.products.latestProducts)
    ) {
      throw new Error("Expected result.products to contain allProducts and latestProducts arrays");
    }

    const allProducts = result.products.allProducts.map((product) => ({
      _id: product._id,
      name: product.name,
      description: product.description,
      regularPrice: product.regularPrice,
      discountPrice: product.discountPrice,
      quality: product.quality,
      stock: product.stock,
      category: product.category,
      image: product.image,
      createdAt: product.createdAt,
    }));

    const latestProducts = result.products.latestProducts.map((product) => ({
      _id: product._id,
      name: product.name,
      description: product.description,
      regularPrice: product.regularPrice,
      discountPrice: product.discountPrice,
      quality: product.quality,
      stock: product.stock,
      category: product.category,
      image: product.image,
      createdAt: product.createdAt,
    }));

    // console.log("Dispatching all products:", allProducts);
    // console.log("Dispatching latest products:", latestProducts);

    dispatch(success_product_fetch(allProducts));
    dispatch(set_latest_products(latestProducts));
    
  } catch (error) {
    console.error("Error fetching products:", error.message);
    dispatch(error_product_fetch());
  }
};
