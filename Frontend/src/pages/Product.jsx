import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../component/ProductCard";
import { productListAction } from "../Redux/Action/productListAction";

const ProductList = () => {
  const dispatch = useDispatch();

  // Access the array of products from Redux state
  const {products} = useSelector((state) => state.productList);
  const {latestProducts} = useSelector((state) => state.productList);
  //console.log("letest product is:",latestProducts);
  
  // Load products on component mount
  useEffect(() => {
    dispatch(productListAction());
  }, [dispatch]);

  const mergedProducts = [...latestProducts, ...products];


  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 p-4">
      {mergedProducts && mergedProducts.length > 0 ? (
        mergedProducts.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
          
          />
        ))
      ) : (
        <p className="col-span-4 text-center text-gray-600">No products available</p>
      )}
    </div>
  );
};

export default ProductList;
