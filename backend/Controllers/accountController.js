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
export const changePassword = async(req,res)=>{

    try{
        const {oldPassword,newPassword} = req.body;
        if(oldPassword === undefined || newPassword === undefined){
            return res.status(400).json({message:"Incomplete request"});
        }
        const queryResponse = await Profile.findOne({
            where:{
                profileId:req.user
            },
            attributes:[],
            include:User
        });
        const {userId,password:oldHashPassword} = getDataFromSequelizeResponse(queryResponse).User;
        const comparedResult = bcrypt.compareSync(oldPassword,oldHashPassword);
        if(!comparedResult){
            return res.status(400).json({message:"Please enter your correct password"});
        }

        
        if(!validatePassword(newPassword)){
            return res.status(400).json({message:"Your new password doesn't statisfy the necessary conditions"})
        }
        const isNewPasswordSame = bcrypt.compareSync(newPassword,oldHashPassword);

        if(isNewPasswordSame){
            return res.status(400).json({message:"Please enter different new password!"});
        }

        const newHashPassword = bcrypt.hashSync(newPassword,saltRounds);

        await User.update({
            password:newHashPassword,
        },{
            where:{
                userId:userId
            }
        });

        return res.status(200).json({message:"Password Changed Successfully!"});
    }catch(err){
        console.log(err.message);
        return res.status(500).json({message:"Internal Server Error"});
    }

}

export const deleteAccount = async (req,res)=>{
    try{
        const queryResponse = await Profile.findOne({
            where:{
                profileId:req.user
            },
            attributes:[],
            include:User
        });
        const {userId} = getDataFromSequelizeResponse(queryResponse).User;
        await User.destroy({
            where:{
                userId:userId
            }
        })
        res.clearCookie("auth-token",{path:"/",httpOnly:true,sameSite:"None",secure:true});
        return res.status(200).json({message:"Account deleted Successfully"});
    }catch(err){
        console.log(err.message);   
        return res.status(500).json({message:"Internal Server Error"});
    }
}