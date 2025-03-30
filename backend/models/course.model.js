import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Course = sequelize.define("Course", {
    courseId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING(100), allowNull: false },
    photoUrl: { type: DataTypes.STRING(255) },
    slug: { type: DataTypes.STRING(1000), unique: true },
    createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
});

export default Course;
