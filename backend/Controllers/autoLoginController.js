import Profile from "../models/profile.model.js";
import { getDataFromSequelizeResponse } from "../utils/SequelizeToData.js";

export const autoLoginController = async(req,res)=>{
    try{
        const profile = await Profile.findByPk(req.user);
        if(profile){
            const data = getDataFromSequelizeResponse(profile);
            return res.status(200).json({message:"Login Successful",body:{userProfile:data}});
        }else{
            res.clearCookie("auth-token",{path:"/",httpOnly:true,secure:true,sameSite:"None"});
            return res.status(401).json({message:"Access Denied",body:{}});
        }
    }catch(err){
        return res.status(500).json({message:"Internal Server Error"});
    }
}

