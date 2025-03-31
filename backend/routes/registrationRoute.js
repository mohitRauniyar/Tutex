import { Router } from "express";
import { registrationController } from "../Controllers/registrationController.js";
import { verifyRegistration } from "../Controllers/registrationVerifier.js";

const router = Router();

router.post("/",registrationController);
router.post("/verify",verifyRegistration);

export default router;