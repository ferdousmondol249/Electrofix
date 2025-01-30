const Product = require('../Model/productModel');
const path = require('path');

const addProductController = async (req, res) => {
  const { name, description, catagory, regularPrice, discountPrice, quality, stock } = req.body;
  const file = req.file;

  try {
    if (!file || !name || !description || !regularPrice || !discountPrice || !quality || !stock || !catagory) {
      return res.status(400).json({
        success: false,
        message: "Please fill up all required fields.",
      });
    }


    if (
      isNaN(Number(regularPrice)) ||
      isNaN(Number(discountPrice)) ||
      isNaN(Number(stock))
    ) {
      return res.status(400).json({
        success: false,
        message: "Prices, stock, and quantity must be valid numbers.",
      });
    }

    const filePath = path.join('products', req.file.filename); 

    
    
    const newProduct = new Product({
      name,
      description,
      regularPrice: Number(regularPrice),
      discountPrice: Number(discountPrice),
      quality,
      catagory,
      stock: Number(stock),
      image: filePath,
    });

    // Save the new product to the database
    await newProduct.save();

    res.status(200).json({
      success: true,
      message: "New product added successfully.",
      product: newProduct,
    });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while uploading the product.",
    });
  }
};

module.exports = addProductController;
