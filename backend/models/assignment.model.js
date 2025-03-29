const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Profile = require("./profile.model");
const Course = require("./course.model");

const Assignment = sequelize.define("Assignment", {
    assignmentId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    status: { type: DataTypes.STRING(45), defaultValue: "pending" },
    createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
});

Profile.hasMany(Assignment, { foreignKey: "profileId" });
Assignment.belongsTo(Profile, { foreignKey: "profileId" });

Course.hasMany(Assignment, { foreignKey: "courseId" });
Assignment.belongsTo(Course, { foreignKey: "courseId" });

module.exports = Assignment;
