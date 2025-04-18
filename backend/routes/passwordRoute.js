import { Router } from "express";
import { forgotPassword, forgotPasswordUpdatePassword, forgotPasswordVerifier } from "../Controllers/ForgotPasswordController.js";


const route = Router();
route.post("/",forgotPassword);
route.post("/verify",forgotPasswordVerifier);
route.post("/update",forgotPasswordUpdatePassword);

export default route;