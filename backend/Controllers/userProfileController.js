import Profile from "../models/profile.model.js";
import { getDataFromSequelizeResponse } from "../utils/SequelizeToData.js";
import {
  validateDate,
  validateUsername,
} from "../utils/verificationUtilities.js";

export const getUserProfile = async (req, res) => {
  try {
    const userProfileRes = await Profile.findByPk(req.user);
    if (!userProfileRes) {
      return res.status(404).json({ message: "Could not fetch user profile" });
    }
    const { name, email, gender, dob, profileUrl } =
      getDataFromSequelizeResponse(userProfileRes);
    return res.status(200).json({
      message: "User profile retrieved Successfully",
      body: {
        name,
        email,
        dob,
        gender,
        profileUrl,
      },
    });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateProfile = async (req, res) => {
  let { name, dob, gender, profileUrl } = req.body;
  if (
    name === undefined ||
    dob === undefined ||
    gender === undefined ||
    profileUrl === undefined
  ) {
    return res.status(400).json({ message: "Bad request. Incomplete data" });
  }

  let userNameValidateRes = validateUsername(name);
  if (!userNameValidateRes.valid) {
    return res.status(400).json({ message: "Invalid username" });
  }
  name = userNameValidateRes.name;

  if (!validateDate(dob)) {
    return res
      .status(400)
      .json({ message: "Please provide valid date of birth" });
  }

  if (!["M", "F", "O"].includes(gender)) {
    return res.status(400).json({ message: "Invalid gender" });
  }

  try {
    await Profile.update(
      {
        name: name,
        gender: gender,
        dob: new Date(`${dob.year}-${dob.month}-${dob.day}`),
        profileUrl: profileUrl,
      },
      {
        where: {
          profileId: req.user,
        },
      }
    );
    const newProfileRes = await Profile.findByPk(req.user);
    const {
      name: newName,
      dob: newdob,
      gender: newgender,
      email: newEmail,
      profileUrl: newProfileUrl,
    } = getDataFromSequelizeResponse(newProfileRes);
    return res.status(200).json({
      message: "profile updated successfully",
      body: {
        name: newName,
        dob: newdob,
        gender: newgender,
        email: newEmail,
        profileUrl: newProfileUrl,
      },
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};


