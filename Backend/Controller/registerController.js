const User=require('../Model/userModel')
const path = require('path'); 
const bcrypt = require('bcrypt');

const registerController=async(req, res)=>{

    const {name, email, password}=req.body;
    const file=req.file;

    try{
        if(!file||!name || !email || !password){
            return res.status(400).json(
                {
                    message:"please fill up the all required fields",
                }
            )
        }
        const findUser= await User.findOne({email});

        if(findUser){
            return res.status(400).json(
                {
                    message:"User already existes",
                }
            )
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const filePath= req.file.path;
    
        const newUser= new User(
            {
                name:name,
                email:email,
                password:hashedPassword,
                image:filePath
                
            }
        )
        await newUser.save();
        res.status(200).json(
            {
                message:"User registered successfully",
                user:{
                   
                    name:newUser.name,
                    email:newUser.email,
                    imageUrl: `/uploads/${req.file.filename}`
                    
                },
                //token:generateToken(newUser),
    
            }
        )
    }
    catch(error){
        console.error(error);
        res.status(500).json(
            {
                message:"Internal server error",
            }
        )
    }

}

module.exports=registerController;