import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import User from "./user.model.js";

const Profile = sequelize.define("Profile", {
    profileId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING(255), allowNull: false },
    gender: { type: DataTypes.CHAR(1) },
    dob: { type: DataTypes.DATE },
    email:{type:DataTypes.STRING,allowNull:false,unique:true,validate:{notEmpty:true}},
    profileUrl: { type: DataTypes.STRING(255) },
    createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
});

User.hasOne(Profile, { foreignKey: "userId",onDelete:'CASCADE',onUpdate:'CASCADE' });
Profile.belongsTo(User, { foreignKey: "userId",onDelete:'CASCADE',onUpdate:'CASCADE' });

export default Profile;
