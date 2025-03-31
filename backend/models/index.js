import User from "./user.model.js";
import Profile from "./profile.model.js";
import Progress from "./progress.model.js";
import Lesson from "./lesson.model.js";
import Course from "./course.model.js";
import Assignment from "./assignment.model.js";
import UnverifiedUser from "./unverifiedData.model.js";

//the above imports are important as it make sure that the sequelize object which is imported below contains info of all the models.
import sequelize from "../config/database.js";
import { connectDB } from "../config/database.js";


const syncDB = async () => {
    try {
        await connectDB();
        await sequelize.sync({alter:true});  // creates table if doesn't exist
        console.log("Database synchronized successfully!");
    } catch (error) {
        console.error("Error syncing database:", error);
    }
};

export default syncDB;
