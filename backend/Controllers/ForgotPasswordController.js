import Profile from "../models/profile.model.js";
import User from "../models/user.model.js";
import { getDataFromSequelizeResponse } from "../utils/SequelizeToData.js";
import { configDotenv } from "dotenv";
import bcrypt from "bcryptjs";
import { validatePassword } from "../utils/verificationUtilities.js";
import { generateOTP } from "../utils/OTPGeneration.js";
import { sendEmail } from "../utils/EmailUtility.js";
import Verification from "../models/verfication.model.js";

configDotenv();
const saltRounds = parseInt(process.env.SALT_ROUNDS);

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (email === undefined) {
      return res.status(400).json({ message: "Incomplete request" });
    }
    const queryResponse = await Profile.findOne({
      where: {
        email: email,
      },
      include:User
    });

    if (!queryResponse) {
      return res
        .status(400)
        .json({ message: "Please provide your registered email address" });
    }
    const {User:user} = getDataFromSequelizeResponse(queryResponse);
    if(!user.verified){
      return res.status(400).json({message:"Please provide your registered email address"});
    }
    const OTP = generateOTP();
    sendEmail(email, OTP);
    //utilizing the same verification table for storing the OTP in case of forgot password as well
    await Verification.update(
      {
        otp: OTP,
        otpExpiryTime: new Date(new Date() + 5 * 60 * 1000),
      },
      {
        where: {
          email: email,
        },
      }
    );
    return res
      .status(200)
      .json({ message: "Please enter otp sent on your email address" });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const forgotPasswordVerifier = async (req, res) => {
  try {
    const { otp, email } = req.body;
    if(otp === undefined || email === undefined){
        return res.status(400).json({message:"Incomplete request"})
    }
    const verficationResponse = await Verification.findOne({
      where: {
        otp: otp,
        email: email,
      },
    });

    if (!verficationResponse) {
      return res.status(400).json({ message: "Invalid OTP" });
    }
    const { otpExpiryTime } = getDataFromSequelizeResponse(verficationResponse);
    if (otpExpiryTime < new Date()) {
      return res.status(400).json({ message: "OTP expired" });
    }
    //otp matched so verification is successful
    return res
      .status(200)
      .json({
        message:
          "Authentication Successful. Proceed to provide the new password.",
      });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const forgotPasswordUpdatePassword = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (email === undefined || password === undefined) {
      return res.status(400).json({ message: "Incomplete request!" });
    }
    if (!validatePassword(password)) {
      return res.status(400).json({ message: "Password doesn't satisfy necessary conditions!" });
    }

    const profileResponse = await Profile.findOne({
      where: {
        email: email,
      },
      attributes: ["userId"],
      include: User
    });

    if (!profileResponse) {
      return res.status(400).json({ message: "Bad request" });
    }

    const { userId, User:user } = getDataFromSequelizeResponse(profileResponse);
    //check if the password matches the previous password
    if(bcrypt.compareSync(password, user.password)){
        return res.status(400).json({message:"Please provide a new password!"});
    }
    const hashPassword = bcrypt.hashSync(password, saltRounds);
    await User.update(
      {
        password: hashPassword,
      },
      {
        where: {
          userId: userId,
        },
      }
    );
    return res.status(200).json({ message: "Password Updated Successfully!" });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
