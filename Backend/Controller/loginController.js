const user = require('../Model/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const loginController = async (req, res) => {
    const { email, password } = req.body;
    
    if (!email || !password) {
        return res.status(400).json({
            message: "Please fill all the fields",
            success: false,
            error: true
        });
    }

    try {
        const findUser = await user.findOne({ email });
        if (!findUser) {
            return res.status(400).json({
                message: "User not found",
                success: false,
                error: true
            });
        }

        const isMatch = await bcrypt.compare(password, findUser.password);
        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid credentials",
                success: false,
                error: true
            });
        }

        const payload = {
            findUser_id: findUser._id,
            email: findUser.email,
        };

        const secretKey = process.env.SECRET_KEY;
        const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });
        
       

        res.cookie('token', token, {
            httpOnly: true, 
            maxAge: 3600000, 
            sameSite: 'strict',
        });

        return res.status(200).json({
            message: "User logged in successfully",
            success: true,
            error: false,
            data: 
            {
                name:findUser.name,
                email: findUser.email,
                image: findUser.image,
                role: findUser.role,
                
            }
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false,
            error: true
        });
    }
};

module.exports = loginController;