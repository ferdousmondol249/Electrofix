const Product = require('../Model/productModel');

const updateStockController = async (req, res) => {
    //console.log(req.body);
    const { id } = req.params;
    const { quantity } = req.body;
  
    if (!quantity) {
      return res.status(400).json({ message: "Quantity is required" });
    }
  
    try {
      const product = await Product.findById(id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
  
      product.stock += Number(quantity);
      await product.save();
  
      res.status(200).json({ message: "Stock updated successfully", product });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error updating stock" });
    }
  };
module.exports = updateStockController;