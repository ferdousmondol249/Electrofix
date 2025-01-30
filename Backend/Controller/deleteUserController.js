
const User= require('../Model/userModel');

const deleteUserController=async(req, res)=>{
    const {id}=req.params;
    try{
        const user= await User.findByIdAndDelete(id);
        if(!user){
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User deleted successfully" });
    }
    catch(error){
        console.error(error);
        res.status(500).json({ message: "Something went wrong" });
    }

}

module.exports=deleteUserController;