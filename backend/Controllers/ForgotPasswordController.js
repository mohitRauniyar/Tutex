import Profile from "../models/profile.model.js";
import User from "../models/user.model.js";
import { getDataFromSequelizeResponse } from "../utils/SequelizeToData.js";
import { configDotenv } from "dotenv";
import bcrypt from "bcryptjs";
import { validatePassword } from "../utils/verificationUtilities.js";
import { generateOTP } from "../utils/OTPGeneration.js";
import { sendEmail } from "../utils/EmailUtility.js";
import { decryptToken, generateToken } from "../utils/JwtTokenHandler.js";


configDotenv();
const saltRounds = parseInt(process.env.SALT_ROUNDS);

export const forgotPassword = async(req,res)=>{
    try{
        const {email} = req.body;
        if(email === undefined){
            return res.status(400).json({message:"Incomplete request"});
        }
        const queryResponse = await User.findOne({
            where:{
                username:email
            }
        });

        if(!queryResponse){
            return res.status(400).json({message:"Please provide your registered email address"});
        }
    
        const OTP = generateOTP();
        sendEmail(email,OTP);
        const cookieContent = {
            otp:OTP,
            email:email
        }
        const verifyToken = generateToken(cookieContent);
        res.cookie("token-v",verifyToken,{
            httpOnly:true,
            path:'/password/forgot',
            maxAge:2*60*1000,
            // secure:true,
            sameSite:"None"
        });
        return res.status(200).json({message:"Please enter otp sent on your email address"});

    }catch(err){
        console.log(err.message);   
        return res.status(500).json({message:"Internal Server Error"});
    }
}

export const forgotPasswordVerifier = async (req,res)=>{
    try{
        const {otp} = req.body;
        if(otp === undefined)return res.status(400).json({message:"Incomplete request"});

        const token = req.cookies["token-v"];
        if(!token){
            return res.status(401).json({message:"OTP expired. Please restart the process!"});
        }
        let {otp:actualOTP,email} = decryptToken(token);
        if(actualOTP === undefined || parseInt(actualOTP) !== parseInt(otp)){
            return res.status(400).json({message:"Please enter the correct OTP!"});
        }
        res.clearCookie("token-v",{httpOnly:true,path:"/password/forgot"});
        let cookieContent = {
            email:email,
            emailVerified:true
        }
        const newtoken = generateToken(cookieContent);
        res.cookie("token-s",newtoken,{
            httpOnly:true,
            path:'/password/forgot',
            maxAge:5*60*1000,
            // secure:true,
            // sameSite:"None"
        })
        return res.status(200).json({message:"Please enter your new password!"});
    }catch(err){
        console.log(err.message);   
        return res.status(500).json({message:"Internal Server Error"});
    }
}


export const forgotPasswordUpdatePassword = async (req,res)=>{
    try{
        const {password} = req.body;
        if(password === undefined){
            return res.status(400).json({message:"Incomplete request!"});
        }
        if(!validatePassword(password)){
            return res.status(400).json({message:"Password doesn't satisfy necessary conditions!"});
        }

        const token = req.cookies["token-s"];
        if(!token){
            return res.status(400).json({message:"Session expired. Please restart the process"});
        }
        const {email,emailVerified} = decryptToken(token);
        if(!emailVerified){
            return res.status(401).json({message:"Access Denied"});
        }

        //update the password
        const hashPassword = bcrypt.hashSync(password,saltRounds);

        await User.update({
            password:hashPassword,
        },{
            where:{
                username:email
            }
        });
        res.clearCookie("auth-token");//path is always necessary to specify. By default '/' is taken on which auth-token is set and hence no need to mention it.
        res.clearCookie("token-s",{httpOnly:true,path:"/password/forgot"});
        return res.status(200).json({message:"Password Updated Successfully!"});

    }catch(err){
        console.log(err.message);   
        return res.status(500).json({message:"Internal Server Error"});
    }
}
