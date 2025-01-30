const product= require('../Model/productModel');

const productFetchType=async (req, res)=>{
    const {type}=req.query;
   // console.log(type);
    try{
        const products = await product.find({ catagory: type });

        res.status(200).json({
            message: "Products fetched successfully",
            products: products,
            success:true,
            error:false
        });
    }catch(error){
        console.log(error);
        res.status(500).json({
            message: "Server Error",
            success:false,
            error: true
        });
    }
 
}

module.exports=productFetchType;