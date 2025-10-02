import { Router } from "express";
import {loginController} from "../Controllers/authController.js";

const router = Router();

router.post("/login",loginController);

export default router;