import Profile from "../models/profile.model.js";
import { getDataFromSequelizeResponse } from "../utils/SequelizeToData.js";

export const autoLoginController = async(req,res)=>{
    try{
        const profile = await Profile.findByPk(req.user);
        if(profile){
            const data = getDataFromSequelizeResponse(profile);
            return res.status(200).json({message:"Login Successful",body:{userProfile:data}});
        }else{
            return res.status(401).json({message:"Invalid Credentials",body:{}});
        }
    }catch(err){
        return res.status(500).json({message:"Internal Server Error"});
    }
}

