import express from "express";
import { configDotenv } from "dotenv";
import authenticateUser from "./middlewares/authenticator.js";
import loginRoute from "./routes/authRoute.js"
import registrationRoute from "./routes/registrationRoute.js"
import tutorialRoute from "./routes/tutorialRoute.js"
import userRoute from "./routes/userRoute.js"
import forgotPasswordRoute from "./routes/passwordRoute.js"
import autoLoginRoute from "./routes/autoLoginRoute.js"
import healthRoute from "./routes/healthCheckRoute.js"
import syncDB from "./models/index.js";
import cors from "cors";


configDotenv();
const app = express();
const port = process.env.PORT;

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended:true}))

//authentication free routes;
app.use("/health-check",healthRoute)
app.use("/auth",loginRoute);
app.use("/register",registrationRoute);
app.use("/password/forgot",forgotPasswordRoute);

//authorized routes;
app.use(authenticateUser);
app.use("/",autoLoginRoute);
app.use("/tutorial",tutorialRoute);
app.use("/user",userRoute);


try{
    await syncDB();
    app.listen(port,()=>{
        console.log(`Server is running on port ${port}`);
    });
}catch(err){
    console.log("Couldn't start the server")
}
