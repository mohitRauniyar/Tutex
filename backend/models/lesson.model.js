import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import Course from "./course.model.js";

const Lesson = sequelize.define("Lesson", {
    lessonId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING(255), allowNull: false },
    description: { type: DataTypes.BLOB },
});

Course.hasMany(Lesson, { foreignKey: "courseId",onDelete:'CASCADE',onUpdate:'CASCADE' });
Lesson.belongsTo(Course, { foreignKey: "courseId",onDelete:'CASCADE',onUpdate:'CASCADE' });

export default Lesson;
