const product= require('../Model/productModel');

const latestProductController=async(req, res)=>{
    try{
        const latestProducts=await product.find().sort({createdAt: -1}).limit(6);
        res.status(200).json({
            message: "Latest products fetched successfully",
            products: latestProducts,
            success:true,
            error:false
        });
    }catch(error){
        res.status(500).json({
            message: "Failed to fetch latest products",
            success:false,
            error: error.message
        });
    }
 
}