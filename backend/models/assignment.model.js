import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import Profile from "./profile.model.js";
import Course from "./course.model.js";


const Assignment = sequelize.define("Assignment", {
    assignmentId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    status: { type: DataTypes.STRING(45), defaultValue: "pending" },
    createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
});

Profile.hasMany(Assignment, { foreignKey: "profileId",onDelete:'CASCADE',onUpdate:'CASCADE' });
Assignment.belongsTo(Profile, { foreignKey: "profileId",onDelete:'CASCADE',onUpdate:'CASCADE' });

Course.hasMany(Assignment, { foreignKey: "courseId",onDelete:'CASCADE',onUpdate:'CASCADE' });
Assignment.belongsTo(Course, { foreignKey: "courseId",onDelete:'CASCADE',onUpdate:'CASCADE' });

export default Assignment;
