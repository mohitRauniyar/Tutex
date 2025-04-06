import jwt from "jsonwebtoken";
import { configDotenv } from "dotenv";
configDotenv();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
export const generateToken = (data)=>{
    try{
        const token = jwt.sign(data,JWT_SECRET_KEY);
        return token;
    }catch(err){
        console.log(err.message);
        return null;
    }
}

export const decryptToken =(token)=>{
    try{
        const data = jwt.verify(token,JWT_SECRET_KEY);
        return data;
    }catch(err){
        console.log(err.message);
        return null;
    }
}