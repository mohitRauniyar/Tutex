import Profile from "../models/profile.model.js";
import UnverifiedUser from "../models/unverifiedData.model.js";
import User from "../models/user.model.js";
import { sendEmail } from "../utils/EmailUtility.js";
import { generateToken } from "../utils/JwtTokenHandler.js";
import { generateOTP } from "../utils/OTPGeneration.js"
import { decryptToken } from "../utils/JwtTokenHandler.js";


export const verifyRegistration = async (req,res)=>{
    const verifyToken = req.cookies["verify-token"];
    if(!verifyToken){
        return res.status(401).json({message:"Registration Cancelled!"});
    }
    const {otp,resendStatus} = req.body;
    if(otp === undefined || resendStatus === undefined)return res.status(400).json({message:"Incomplete data"});
    let cookieContent;
    try{
        cookieContent = decryptToken(verifyToken);
    }catch(err){
        res.clearCookie("verify-token");
        return res.status(401).json({message:"Registration Cancelled!"})
    }
    const timeElapsed = new Date().getTime() - cookieContent.time;
    if(resendStatus){
        if( timeElapsed<= 2.2*60*1000) return res.status(200).json({message:"Please enter your existing OTP"});
        const newOTP = generateOTP();
        try{
            sendEmail(cookieContent.email,newOTP);
        }catch(err){
            console.log("Couldn't send mail:",err.message);
            return res.status(500).json({message:"Couldn't send email"});
        }
        const newCookieContent = {
            ...cookieContent,
            otp:newOTP,
            time:new Date().getTime()
        }
        const newverifyToken = generateToken(newCookieContent);
        res.cookie("verify-token",newverifyToken);//total time will still be counted
        return res.status(200).json({message:"Otp resent on email address"});
    }else{
        if(timeElapsed <= 2.2*60*1000){
            if(otp != cookieContent.otp){
                return res.status(400).json({message:"Invalid OTP"})
            }else{
                //otp is valid and within time so move data from unverifiedUser to user and profile
                res.clearCookie("verify-token",{httpOnly:true,path:"/register"});
                const user = await UnverifiedUser.findOne({
                    where:{
                        email:cookieContent.email
                    }
                });
                if(!user){
                    return res.status(401).json({message:"Registration Failed!"});
                }
                //delete data in unverifieduser as it not required
                await UnverifiedUser.destroy({
                    where:{
                        email:cookieContent.email
                    }
                })
                //push in user and profile model
                const newUser = await User.create({
                    username:user.email,
                    password:user.password,
                    verified:true
                });
                await Profile.create({
                    name:user.name,
                    gender:user.gender,
                    dob:user.dob,
                    email:user.email,
                    password:user.password,
                    userId:newUser.userId
                });
                return res.status(200).json({message:"Verification Successful"});
            }
        }else{
            return res.status(400).json({message:"OTP expired!"})
        }
    }
}