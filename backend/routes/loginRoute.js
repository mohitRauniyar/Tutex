import { Router } from "express";
import loginController from "../Controllers/loginController.js";

const router = Router();

router.post("/",loginController);

export default router;