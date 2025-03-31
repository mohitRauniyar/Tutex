import { configDotenv } from "dotenv";
import jwt from "jsonwebtoken";
configDotenv();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const authenticateUser = (req,res,next)=>{
    if(req.path === "/login" || req.path === "/register" || req.path === "/register/verify")return next();
    else{
        const authToken = req.cookies["auth-token"];
        if(!authToken){
            return res.status(401).json({message:"Access denied"});
        }
        try{
            const decodedUser = jwt.verify(authToken, JWT_SECRET_KEY);
            req.user = decodedUser;
            next();
        }catch(err){
            if(err.name === "TokenExpiredError") return res.status(401).json({message:"Token expired"});
            else return res.status(401).json({message:"Invalid Token"});
        }
    }
}

export default authenticateUser;