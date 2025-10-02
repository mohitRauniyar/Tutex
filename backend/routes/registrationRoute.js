import { Router } from "express";
import { registrationController } from "../Controllers/registrationController.js";
import { verifyRegistration,resendOtpForRegistrationVerification } from "../Controllers/registrationVerifier.js";

const router = Router();

router.post("/",registrationController);
router.post("/verify/:id",verifyRegistration);
router.post("/verify/:id/resend",resendOtpForRegistrationVerification);

export default router;