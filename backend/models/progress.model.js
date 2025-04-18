import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import Lesson from "./lesson.model.js";
import Assignment from "./assignment.model.js";


const Progress = sequelize.define("Progress", {
    progressId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    progress: { 
        type: DataTypes.STRING(3), 
        allowNull: false, 
        defaultValue: '000'  // Default value set to '000'
    }
});

// Define relationships
Lesson.hasMany(Progress, { foreignKey: "lessonId",onDelete:'CASCADE',onUpdate:'CASCADE' });
Progress.belongsTo(Lesson, { foreignKey: "lessonId",onDelete:'CASCADE',onUpdate:'CASCADE' });

Assignment.hasMany(Progress, { foreignKey: "assignmentId",onDelete:'CASCADE',onUpdate:'CASCADE' });
Progress.belongsTo(Assignment, { foreignKey: "assignmentId",onDelete:'CASCADE',onUpdate:'CASCADE' });

export default Progress;
