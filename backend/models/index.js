const sequelize = require("../config/database");
const User = require("./user.model");
const Profile = require("./profile.model");
const Course = require("./course.model");
const Lesson = require("./lesson.model");
const Assignment = require("./assignment.model");
const Progress = require("./progress.model");

const syncDB = async () => {
    try {
        await sequelize.sync({ force: true });  // Drops tables and recreates them
        console.log("Database synchronized successfully!");
    } catch (error) {
        console.error("Error syncing database:", error);
    }
};

module.exports = { syncDB, User, Profile, Course, Lesson, Assignment, Progress };
