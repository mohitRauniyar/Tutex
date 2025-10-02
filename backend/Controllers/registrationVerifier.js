import Profile from "../models/profile.model.js";
import User from "../models/user.model.js";
import Verification from "../models/verfication.model.js";
import { getDataFromSequelizeResponse } from "../utils/SequelizeToData.js";
import sequelize from "../config/database.js";
import { generateOTP } from "../utils/OTPGeneration.js";
import { sendEmail } from "../utils/EmailUtility.js";


export const verifyRegistration = async (req, res) => {
    const verificationId = req.params.id;
    const { email, otp } = req.body;
    if(verificationId === undefined || email === undefined || otp === undefined){
        return res.status(400).json({message:"Incomplete request"});
    }
    //check if email exist in verification table
    const verificationDetailsResponse = await Verification.findOne({
        where:{
            verificationId: verificationId,
            email: email,
            otp: otp
        }
    });
    if(!verificationDetailsResponse) return res.status(400).json({message: "Invalid OTP"});
    const verficationDetails = getDataFromSequelizeResponse(verificationDetailsResponse);
    if(verficationDetails.otpExpiryTime < new Date())return res.status(400).json({message:"OTP expired"});

    //verification successful
    const t = await sequelize.transaction();
    try{
        const profileResponse = await Profile.findOne({
            attributes: ["userId"],
            where:{
                email:email
            },
            transaction:t
        });
        const profile = getDataFromSequelizeResponse(profileResponse);
        await User.update(
            {verified: true},
            {
                where: {userId: profile.userId},
                transaction:t
            }
        )
        await t.commit();
        return res.status(200).json({message: "Account Verification Successful",body:{verified:true}});
    }catch(err){
        await t.rollback();
        console.log(err);
        return res.status(500).json({message:"Internal Server Error",body:{verified:false}});
    }
}


export const resendOtpForRegistrationVerification = async(req,res)=>{
    const verificationId = req.params.id;
    const { email } = req.body;
    const otp = generateOTP();
    sendEmail(email,otp);
    try{
        const [updatedCount] = await Verification.update(
            {
                otp:otp,
                otpExpiryTime: new Date(Date.now() + 5 * 60 * 1000)
            },
            {
                where:{
                    verificationId:verificationId,
                    email:email
                }
            }
        )
        if(updatedCount == 0){
            return res.status(400).json({message:"Invalid email"});
        }
        return res.status(200).json({message: "Check your email. You must have received an OTP"});
    }catch(err){
        console.log(err);
        return res.status(500).json({message: "Internal Server Error"});
    }
    
}