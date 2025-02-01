import { useSelector } from "react-redux"
import ProductCardHome from "../component/ProductCardHome";
import ProductCard from "../component/ProductCard";
const SearchPage = () => {

    const {searchQuery}=useSelector((state)=> state.productList);
    const role=useSelector((state)=> state.login.user.role);
    console.log(role);
    
  return (
   
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 p-4">
    {searchQuery.length > 0 ? (
      searchQuery.map((product) => (
        role==='Admin'?(
            <ProductCard key={product._id} product={product} />

        ):
        <ProductCardHome key={product._id} product={product} />
      ))
    ) : (
      <p className="col-span-4 text-center text-gray-600">
        {searchQuery ? "No products available" : "Loading products..."}
      </p>
    )}
  </div>

  )
}

export default SearchPage
