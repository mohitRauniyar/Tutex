import bcrypt from "bcryptjs";
import { generateOTP } from "../utils/OTPGeneration.js";
import { configDotenv } from "dotenv";
import Profile from "../models/profile.model.js";
import { sendEmail } from "../utils/EmailUtility.js";
import { decryptToken, generateToken } from "../utils/JwtTokenHandler.js";
import { validateEmail,validatePassword,validateDate,validateUsername } from "../utils/verificationUtilities.js";
import UnverifiedUser from "../models/unverifiedData.model.js";


configDotenv();
export const registrationController = async (req,res)=>{
    let {name,password,email,DOB,gender } = req.body;

    if(!name || !password || !email || !DOB || !gender){
        return res.status(400).json({message:"Incomplete request"});
    }

    let nameValidateRes = validateUsername(name);
    if(!nameValidateRes.valid){
        return res.status(400).json({message:"Invalid username"});
    }
    name = nameValidateRes.name;

    if(!validatePassword(password)){
        return res.status(400).json({message:"Password doesn't statisfy the necessary conditions"});
    }

    if(!validateEmail(email)){
        return res.status(400).json({message:"Please provide valid email"});
    }

    if(!validateDate(DOB)){
        return res.status(400).json({message:"Please provide valid date of birth"})
    }

    if(!['M','F','O'].includes(gender)){
        return res.status(400).json({message:"Invalid gender"})
    }


    //check if email exists in database
    let exists;
    try{
        exists = await Profile.findOne({
            where:{
                email:email
            }
        });
    }catch(err){
        console.log("Error in processing query: ",err);
    }
    
    if(exists){
        return res.status(400).json({message:"Email already exists"});
    }
    const saltRounds = parseInt(process.env.SALT_ROUNDS);
    const hashpassword = bcrypt.hashSync(password,saltRounds);
    

    //check if UnverifiedUser left the registration verification and came back before 10-min elapsed.
    const tokenExists = req.cookies["verify-token"];
    if(tokenExists){
        const tokenObj = decryptToken(tokenExists);
        if(tokenObj && tokenObj.email){
            await UnverifiedUser.destroy({
                where:{
                    email:tokenObj.email
                }
            });
        }
    }
    try{
        await UnverifiedUser.create({
            name:name,
            gender:gender,
            dob:new Date(`${DOB.year}-${DOB.month}-${DOB.day}`),
            email:email,
            password:hashpassword
        });
    }catch(err){
        console.log("UnverfiedUsers insertion Error:",err.message);
        return res.status(400).json({message:"Registration failed!"});
    }

    const OTP = generateOTP();
    try{
        sendEmail(email,OTP);
    }catch(err){
        return res.status(400).json({message:"Couldn't send email"});
    }
    
    const cookieContent = {
        email:email,
        otp:OTP,
        time:new Date().getTime()
    }
    const verifyToken = generateToken(cookieContent);
    res.cookie("verify-token",verifyToken,{
        httpOnly:true,
        path:'/register',
        maxAge:10 * 60 * 1000,
        secure:true,
        sameSite:"None"
    });

    return res.status(200).json({message:"Check your email. You must have received an OTP"});
}




