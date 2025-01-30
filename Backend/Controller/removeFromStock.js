const Product = require('../Model/productModel');

const removeFromStock = async (req, res) => {
    const { quantity } = req.body;
    //console.log("backend qunatity is:",quantity);

    if (!quantity || isNaN(quantity)) {
        return res.status(400).json({ message: "Invalid quantity provided" });
    }

    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            { $inc: { stock: -Number(quantity) } }, 
            { new: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({ 
            message: "Stock removed successfully", 
            product: updatedProduct,
            success:true,
            error:false 
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};

module.exports = removeFromStock;

