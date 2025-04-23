import { configDotenv } from "dotenv";
import jwt from "jsonwebtoken";
import Profile from "../models/profile.model.js";
configDotenv();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const authenticateUser = async(req,res,next)=>{
    
    const authToken = req.cookies["auth-token"];
    if(!authToken){
        return res.status(401).json({message:"Access denied"});
    }
    try{
        const decodedUser = jwt.verify(authToken, JWT_SECRET_KEY);
        const result = await Profile.findByPk(decodedUser);
        if(!result){
            return res.status(401).json({message:"Access denied"});
        }
        req.user = decodedUser;
        next();
    }catch(err){
        console.log(err.message);
        if(err.name === "TokenExpiredError") return res.status(401).json({message:"Token expired"});
        else return res.status(401).json({message:"Invalid Token"});
    }

}

export default authenticateUser;