import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { configDotenv } from "dotenv";
import { sendEmail } from "../utils/EmailUtility.js";
import { generateOTP } from "../utils/OTPGeneration.js";

configDotenv();

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const loginController = async (req,res)=>{
    const {username,password} = req.body;
    if(!username || !password){
        return res.status(400).json({ message: "Username and password are required." });
    }
    //find username in database
    const exists = await User.find(username);
    if(!exists){
        return res.status(401).json({message:"Invalid credentials"});
    }else{
        const hashpassword = exists.password;
        const comparedResult = bcrypt.compareSync(password,hashpassword);
        if(comparedResult){
            if(exists.verified)
                return handleResponse(req,res,exists.username);
            else{
                const OTP = generateOTP();
                await sendEmail(username,OTP);
                return res.status(200).json({message:"Account not verified",body:{emailVerified:false}})
            }
        }else{
            return res.status(401).json({message:"Invalid credentials"});
        }
    }
}

export default loginController;

const handleResponse = (req,res,username)=>{
    const authToken = generateToken(username);
    res.cookie("auth-token",authToken,{
        maxAge:24*60*60*1000,
        httpOnly:true,
    });
    return res.status(200).json({message:"Login Successful",body:{username:username,emailVerified:true}});
}

const generateToken = (username)=>{
    try{
        const token = jwt.sign(username,JWT_SECRET_KEY);
        return token;
    }catch(err){
        console.log(err.message);
        return null;
    }
}