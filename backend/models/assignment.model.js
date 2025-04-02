import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import Profile from "./profile.model.js";
import Course from "./course.model.js";


const Assignment = sequelize.define("Assignment", {
    assignmentId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    status: { type: DataTypes.STRING(45), defaultValue: "pending" },
    createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
});

Profile.hasMany(Assignment, { foreignKey: "profileId" });
Assignment.belongsTo(Profile, { foreignKey: "profileId" });

Course.hasMany(Assignment, { foreignKey: "courseId" });
Assignment.belongsTo(Course, { foreignKey: "courseId" });

export default Assignment;
