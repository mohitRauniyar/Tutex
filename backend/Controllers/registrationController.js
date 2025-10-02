import bcrypt from "bcryptjs";
import { generateOTP } from "../utils/OTPGeneration.js";
import { configDotenv } from "dotenv";
import Profile from "../models/profile.model.js";
import { sendEmail } from "../utils/EmailUtility.js";
import { validateEmail,validatePassword,validateDate,validateUsername } from "../utils/verificationUtilities.js";
import User from "../models/user.model.js";
import { getDataFromSequelizeResponse } from "../utils/SequelizeToData.js";
import sequelize from "../config/database.js";
import Verification from "../models/verfication.model.js";


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
            },
            include: User
        });
    }catch(err){
        console.log("Error in processing query:",err);
    }

    if(exists){
        //check if user is verified or not
        const {User:user} = getDataFromSequelizeResponse(exists);
        if(user.verified === true){
            return res.status(400).json({message:"Account already exists. Proceed to Login.",body:{redirect:"login"}});
        }else{
            //update otp in verification table
            const OTP = generateOTP();
            sendEmail(email,OTP);
            await Verification.update({
                otp:OTP,
                otpExpiryTime: new Date(new Date() + 5 * 60 * 1000)
            },{
                where:{
                    email:email
                }
            });
            const verificationResponse = await Verification.findOne({
                where:{
                    email:email
                },
                attributes:["verificationId"]
            });
            const {verificationId} = getDataFromSequelizeResponse(verificationResponse);
            return res.status(400).json({message:"Account already exists. Please enter the otp sent on the registered email",body:{
                verificationId,
                redirect:"verify"
            }});
        }
    }else{

        //user doesn't exist, so it is okay to store the user
        const saltRounds = parseInt(process.env.SALT_ROUNDS);
        const hashpassword = bcrypt.hashSync(password,saltRounds);
        const OTP = generateOTP();
        const t = await sequelize.transaction();
        try{
            let newUserResponse = await User.create(
                {
                    username:email,
                    password:hashpassword,
                    verified:false
                },
                {
                    transaction:t
                }
            );
            const newUser = getDataFromSequelizeResponse(newUserResponse);
            await Profile.create({
                name:name,
                gender:gender,
                dob:new Date(`${DOB.year}-${DOB.month}-${DOB.day}`),
                email:email,
                password:hashpassword,
                userId:newUser.userId
            },{transaction:t});

            //make entry in verification table
            const verificationResponse = await Verification.create({
                email:email,
                otp:OTP,
                otpExpiryTime: new Date(new Date() + 5 * 60 * 1000)
            },{transaction:t})
            const {verificationId} = getDataFromSequelizeResponse(verificationResponse);

            await t.commit();

            sendEmail(email,OTP);
            return res.status(200).json({message:"Check your email. You must have received an OTP",body:{
                verificationId,
                redirect:"verify"
            }});
        }catch(err){
            console.log(err);
            await t.rollback();
            return res.status(500).json({message:"Internal Server Error"});
        }
    } 
}




