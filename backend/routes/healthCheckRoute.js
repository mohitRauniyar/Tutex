import { Router } from "express";
import { healthCheckController } from "../Controllers/healthCheckController.js";
const router = Router();

router.get("/",healthCheckController);

export default router;