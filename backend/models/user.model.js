const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

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
            isAlphanumeric: true,  // Ensures only alphabets and numbers
            notEmpty: true         // Prevents empty values
        }
    },
    password: { 
        type: DataTypes.STRING(45), 
        allowNull: false, 
        validate: {
            len: [8, 45]  // Ensures password has at least 8 characters
        }
    },
    verified: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
});

module.exports = User;
