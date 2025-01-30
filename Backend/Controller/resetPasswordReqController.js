const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const User = require("../Model/userModel"); 

const resetPasswordReqController = async(req, res)=>{
  const { email } = req.body;
  try{
    const user = await User.findOne({ email });
    if(!user){
      return res.status(404).json({ message: "User doesn't exist" });
    }
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );
    const resetURL = `http://localhost:5173/reset-password?id=${encodeURIComponent(user._id)}&token=${encodeURIComponent(token)}`;

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
    
   const mailOptions = {
  from: process.env.EMAIL,
  to: email,
  subject: "Reset Your Password - [Electric Shop]",
  html: `
    <p>Hi ${user.name}</p>
    <p>You requested to reset your password. Click the link below to proceed:</p>
    <a href="${resetURL}" style="color: blue; text-decoration: underline;">Reset Password</a>
    <p>If you did not make this request, please ignore this email.</p>
    <p>Thank you,</p>
    <p>[Your App Name]</p>
  `,
};

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        return res.status(500).json({ message: "Failed to send email" });
      }
      console.log("Email sent:", info.response);
      res.status(200).json({ message: "Reset password email sent" });

    });

  }
  catch(error){
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

module.exports=resetPasswordReqController;