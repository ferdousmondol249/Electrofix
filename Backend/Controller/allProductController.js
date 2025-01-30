
const Product=require('../Model/productModel');

const allProductController= async (req, res)=>{
    try{
        const allProducts=await Product.find();
        const latestProducts=await Product.find().sort({createdAt: -1}).limit(6);
        const uniqueAllProducts = allProducts.filter(product => 
            !latestProducts.some(latest => latest._id.equals(product._id))
          );

        res.status(200).json({
            message: "All products fetched successfully",
            products: { 
                allProducts: uniqueAllProducts, 
                latestProducts, 
              },
            success:true,
            error:false
        });

        //console.log(allProducts);

    }
    catch(error){
        console.error("Error fetching products:", error);
        res.status(500).json({
            message: "Failed to fetch products",
            success:false,
            error:true
        });
    }
    
}

module.exports=allProductController;
