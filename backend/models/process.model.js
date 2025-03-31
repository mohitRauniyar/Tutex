const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./user.model");

const Profile = sequelize.define("Profile", {
    profileId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING(255), allowNull: false },
    gender: { type: DataTypes.CHAR(1) },
    dob: { type: DataTypes.DATE },
    profileUrl: { type: DataTypes.STRING(255) },
    createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
});

User.hasOne(Profile, { foreignKey: "userId" });
Profile.belongsTo(User, { foreignKey: "userId" });

module.exports = Profile;
