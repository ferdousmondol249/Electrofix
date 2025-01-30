
const Product= require('../Model/productModel');

const deleteProductController=async(req, res)=>{
    const {id}=req.params;
    try{
        const product= await Product.findByIdAndDelete(id);
        if(!product){
            return res.status(404).json({ message: "product not found" });
        }
        res.status(200).json({ message: "product deleted successfully" });
    }
    catch(error){
        console.error(error);
        res.status(500).json({ message: "Something went wrong" });
    }

}

module.exports=deleteProductController;