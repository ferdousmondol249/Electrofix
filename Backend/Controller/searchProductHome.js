const Product = require("../Model/productModel");

const searchProductHome = async (req, res) => {
    const name = req.query.name?.toLowerCase(); 

    if (!name) {
        return res.status(400).json({ message: "Product name is required" });
    }

    try {
        const products = await Product.find({ name: { $regex: name, $options: "i" } });

        if (products.length === 0) {
            return res.status(404).json({ message: "No products found", success: false });
        }

        res.status(200).json({
            message: "Products fetched successfully",
            products,
            success: true,
            error: false,
        });

    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({
            message: "Failed to fetch products",
            success: false,
            error: true,
        });
    }
};

module.exports = searchProductHome;
