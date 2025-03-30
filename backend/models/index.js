import sequelize from "../config/database.js";


const syncDB = async () => {
    try {
        await sequelize.sync({ alter: true });  // creates table if doesn't exist
        console.log("Database synchronized successfully!");
    } catch (error) {
        console.error("Error syncing database:", error);
    }
};

export default syncDB;
