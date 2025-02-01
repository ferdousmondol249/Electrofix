const paymentModel = require("../Model/paymentModel");
const productModel = require("../Model/productModel");

const userOrderController = async (req, res) => {
    const { email } = req.params;

    try {
        // Fetch orders for the user
        const orders = await paymentModel.find({ email: email });

        if (!orders || orders.length === 0) {
            return res.status(404).json({ message: "No orders found for this user" });
        }

        // Flatten cartItems and fetch product details
        const groupedOrders = {};

        // Loop through each order and process cartItems
        await Promise.all(
            orders.map(async (order) => {
                const cartItemsDetails = await Promise.all(
                    order.cartItems.map(async (item) => {
                        const product = await productModel.findById(item.productId);

                        if (!product) {
                            return null; // If product not found, return null
                        }

                        return {
                            name: product.name,
                            quantity: item.quantity,
                            image: product.image,
                            paymentID: order._id, // Use the order's _id as paymentID
                            status: order.status // Order status
                        };
                    })
                );

                // Filter out any null items (product not found)
                const filteredCartItems = cartItemsDetails.filter(item => item !== null);

                // Group items by paymentID
                if (filteredCartItems.length > 0) {
                    const paymentID = filteredCartItems[0].paymentID;
                    if (!groupedOrders[paymentID]) {
                        groupedOrders[paymentID] = {
                            status: filteredCartItems[0].status,
                            items: []
                        };
                    }
                    groupedOrders[paymentID].items.push(...filteredCartItems);
                }
            })
        );

        // Prepare the final result
        const groupedResult = Object.keys(groupedOrders).map((paymentID) => ({
            paymentID,
            status: groupedOrders[paymentID].status,
            items: groupedOrders[paymentID].items
        }));

        res.status(200).json(groupedResult);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong", error: true, success: false });
    }
};

module.exports = userOrderController;
