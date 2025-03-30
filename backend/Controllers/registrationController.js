import bcrypt from "bcryptjs";
import { generateOTP } from "../utils/OTPGeneration.js";
import { configDotenv } from "dotenv";
import { sendEmail } from "../utils/EmailUtility.js";
configDotenv();
export const registrationController = async (req,res)=>{
    const {username,password,email,DOB,Gender } = req.body;
    if(!username || !password || !email || !DOB || !Gender){
        return res.status(400).json({message:"Incomplete request"});
    }
    const emailStatus = validateEmail(email);
    if(!emailStatus){
        return res.status(400).json({message:"Please provide valid email"});
    }
    const passwordStatus = validPassword(password);
    if(!passwordStatus){
        return res.status(400).json({message:"Password doesn't statisfy the necessary conditions"});
    }
    //check if email exists in database
    const exists = User.find({email:email});
    if(exists){
        return res.status(400).json({message:"Email already exists"});
    }
    
    //generate and send otp to email
    const OTP = generateOTP();
    try{
        await sendEmail(email,OTP)
    }catch(err){

    }
    const saltrounds = process.env.SALT_ROUNDS;
    const hashPassword = bcrypt.hash(password,saltrounds)
    
}



const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}

const validPassword = (password)=>{
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
}

