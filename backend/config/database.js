import { Sequelize } from "sequelize";
import { configDotenv } from "dotenv";

configDotenv();


const sequelize = new Sequelize(process.env.CONN_STRING,{
    dialect:"mysql",
    logging:false
});

const connectDB = async()=>{
    try {
        await sequelize.authenticate();
        console.log('Database Connected successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}


export {connectDB};
export default sequelize;