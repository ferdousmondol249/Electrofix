import ProductCardHome from "./ProductCardHome";  
import { useDispatch, useSelector } from "react-redux";
import { productListAction } from "../Redux/Action/productListAction";
import { useEffect } from "react";

const LatestProduct = () => {
  const dispatch = useDispatch();

  // Correctly access 'products' from the Redux state
  const { latestProducts, isFetchProduct } = useSelector((state) => state.productList);

  useEffect(() => {
    dispatch(productListAction());
  }, [dispatch]);

  return (
    <div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 p-4">
        {isFetchProduct && latestProducts.length > 0 ? (
          latestProducts.map((product) => (
            <ProductCardHome key={product._id} product={product} />
          ))
        ) : (
          <p className="col-span-4 text-center text-gray-600">
            {isFetchProduct ? "No products available" : "Loading products..."}
          </p>
        )}
      </div>
    </div>
  );
};

export default LatestProduct;
