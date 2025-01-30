const mongoose = require('mongoose');

const productModel = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            maxlength: 30,
        },
        description: {
            type: String,
            required: true,
            maxlength: 50,
        },
        regularPrice: {
            type: Number,
            required: true,
        },
        discountPrice: {
            type: Number,
            required: true,
            validate: {
                validator: function (value) {
                    return value <= this.regularPrice;
                },
                message: 'Discount price should be less than or equal to the regular price.',
            },
        },
        quality: {
            type: String,
            required: true,
            enum: ['High', 'Medium', 'Low'],
            default: 'Medium',
        },
        stock: {
            type: Number,
            required: true,
            default: 0,
        },
        catagory: {
            type: String,
            required: true,
            enum: ['Mobile', 'Watch', 'TV', 'Laptop', 'Headphone', 'Earbud','Keyboard','Mouse','Speaker','Powerbank','Charger','MiniPc'],
            default: 'Mobile',
        },
        
        image: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

productModel.index({ name: 1 });

module.exports = mongoose.model('Product', productModel);
