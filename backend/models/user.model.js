import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const User = sequelize.define("User", {
    userId: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
    },
    username: { 
        type: DataTypes.STRING(45), 
        allowNull: false, 
        unique: true,  // Ensures username is unique
        validate: {
            notEmpty: true         // Prevents empty values
        }
    },
    password: { 
        type: DataTypes.STRING(100), 
        allowNull: false, 
    },
    verified: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
});

export default User;
