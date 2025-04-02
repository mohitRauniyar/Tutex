import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const UnverifiedUser = sequelize.define("UnverifiedUser", {
    name: { 
        type: DataTypes.STRING(255),
         allowNull: false
     },
    gender: { 
        type: DataTypes.CHAR(1) 
    },
    dob: { 
        type: DataTypes.DATE
     },
    email:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true,
        validate:{notEmpty:true}},
    password: { 
        type: DataTypes.STRING(100), 
        allowNull: false,
    },
    createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
});


export default UnverifiedUser;
