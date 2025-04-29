import bcrypt from "bcryptjs";
import { configDotenv } from "dotenv";
import { generateToken } from "../utils/JwtTokenHandler.js";
import User from "../models/user.model.js";
import Profile from "../models/profile.model.js";

configDotenv();

export const loginController = async (req,res)=>{
    const {username,password} = req.body;
    if(username === undefined || password === undefined){
        return res.status(400).json({ message: "Username and password are required." });
    }
    let exists;
    //find username in database
    try{
        exists = await User.findOne({
            where:{
                username:username
            },
            include:Profile
        })
    }catch(err){
        console.log("Error while fetching the data: ",err.message);
    }
    if(!exists){
        return res.status(400).json({message:"Invalid credentials"});
    }else{
        const userData = exists.dataValues;
        const hashpassword = userData.password;
        const comparedResult = bcrypt.compareSync(password,hashpassword);
        if(comparedResult){
            if(userData.verified){
                return handleResponse(req,res,userData.Profile.dataValues);
            }else{
                return res.status(400).json({message:"Account not verified!"});
            }
        }else{
            return res.status(400).json({message:"Invalid credentials"});
        }
    }
}


const handleResponse = (req,res,profile)=>{
    const authToken = generateToken(profile.profileId);
    res.cookie("auth-token",authToken,{
        maxAge:24*60*60*1000,
        httpOnly:true,
        // secure:true,
        // sameSite:"None"
    });
    return res.status(200).json({message:"Login Successful",body:{userProfile:profile}});
}




export const logOutController = (req,res)=>{
    try{
        if(req.cookies["auth-token"] === undefined){
            return res.status(400).json({message:"Bad request"});
        }
        res.clearCookie("auth-token");
        return res.status(200).json({message:"Logout Successful"});
    }catch(err){
        console.log(err.message);
        return res.status(500).json({message:"Internal Server error"});
    }
}