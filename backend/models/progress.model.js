const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Lesson = require("./lesson.model");
const Assignment = require("./assignment.model");

const Progress = sequelize.define("Progress", {
    progressId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    progress: { 
        type: DataTypes.STRING(3), 
        allowNull: false, 
        defaultValue: '000'  // Default value set to '000'
    }
});

// Define relationships
Lesson.hasMany(Progress, { foreignKey: "lessonId" });
Progress.belongsTo(Lesson, { foreignKey: "lessonId" });

Assignment.hasMany(Progress, { foreignKey: "assignmentId" });
Progress.belongsTo(Assignment, { foreignKey: "assignmentId" });

module.exports = Progress;
