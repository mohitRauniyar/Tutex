import { Router } from "express";
import {loginController, logOutController} from "../Controllers/authController.js";

const router = Router();

router.post("/login",loginController);
router.get("/signout",logOutController);

export default router;