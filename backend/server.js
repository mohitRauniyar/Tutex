import express from "express";
import { configDotenv } from "dotenv";
import cookieParser from "cookie-parser";
import authenticateUser from "./middlewares/authenticator.js";
import loginRoute from "./routes/loginRoute.js"
import registrationRoute from "./routes/registrationRoute.js"

configDotenv();
const app = express();
const port = process.env.PORT;

app.use(cookieParser());
app.use(authenticateUser);
app.use("/login",loginRoute);
app.use("/register",registrationRoute);


app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})



