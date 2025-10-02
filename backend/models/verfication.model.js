import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import Profile from "./profile.model.js";

const Verification = sequelize.define("Verification", {
  verificationId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: { notEmpty: true },
  },

  otp: {
    type: DataTypes.STRING(10),
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  otpExpiryTime: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});


export default Verification;
