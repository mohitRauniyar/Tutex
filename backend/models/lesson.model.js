const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Course = require("./course.model");

const Lesson = sequelize.define("Lesson", {
    lessonId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING(255), allowNull: false },
    description: { type: DataTypes.BLOB },
});

Course.hasMany(Lesson, { foreignKey: "courseId" });
Lesson.belongsTo(Course, { foreignKey: "courseId" });

module.exports = Lesson;
