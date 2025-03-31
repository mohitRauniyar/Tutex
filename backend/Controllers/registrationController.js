import bcrypt from "bcryptjs";
import { generateOTP } from "../utils/OTPGeneration.js";
import { configDotenv } from "dotenv";
import Profile from "../models/profile.model.js";
import { sendEmail } from "../utils/EmailUtility.js";
import { decryptToken, generateToken } from "../utils/JwtTokenHandler.js";
import UnverifiedUser from "../models/unverifiedData.model.js";


configDotenv();
export const registrationController = async (req,res)=>{
    let {username,password,email,DOB,gender } = req.body;

    if(!username || !password || !email || !DOB || !gender){
        return res.status(400).json({message:"Incomplete request"});
    }

    username = username.trim();
    if(!validateUsername(username)){
        return res.status(400).json({message:"Invalid username"});
    }

    if(!validPassword(password)){
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
    const OTP = generateOTP();
    try{
        //add data to database
        sendEmail(email,OTP);
    }catch(err){
        return res.status(400).json({message:"Couldn't send email"});
    }

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
    
    await UnverifiedUser.create({
        name:username,
        gender:gender,
        dob:new Date(`${DOB.year}-${DOB.month}-${DOB.day}`),
        email:email,
        password:hashpassword
    });
    const cookieContent = {
        email:email,
        otp:OTP,
        time:new Date().getTime()
    }
    const verifyToken = generateToken(cookieContent);
    res.cookie("verify-token",verifyToken,{
        httpOnly:true,
        path:'/register',
        maxAge:10 * 60 * 1000
    });

    return res.status(200).json({message:"Check your email. You must have received OTP"});
}



const validateUsername=(username)=>{
    username = username.trim();
    let arr = username.split(" ");
    let alpharegex = /^[A-Za-z]+$/
    let newarr = arr.filter((token)=>alpharegex.test(token))
    return arr.length === newarr.length;
}

const validateDate=(DOB)=>{
    if(typeof DOB !== "object")return false;
    const {year,month,day} = DOB;
    if(!year || !month || !day)return false;
    const date = new Date(year,month-1,day);
    return date.getFullYear() === year && date.getMonth() === month-1 && date.getDate() === day && new Date().getFullYear()>date.getFullYear();
}

const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}

const validPassword = (password)=>{
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
}

