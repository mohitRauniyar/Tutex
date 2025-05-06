import { Router } from "express";
import { autoLoginController } from "../Controllers/autoLoginController.js";
const route = Router();

route.get("/",autoLoginController);

export default route;