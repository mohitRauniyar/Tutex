import { Router } from "express";
import { getUserRegisteredTutorials,getSpecificTutorialOfUser, completeSpecificPartOfLesson } from "../Controllers/userTutorialController.js";
import { getUserProfile, updateProfile } from "../Controllers/userProfileController.js";
import { changePassword, deleteAccount } from "../Controllers/accountController.js";
import { createFeedback, getFeedbackStatus } from "../Controllers/feedbackController.js";

const route = Router();

route.get("/tutorial/all",getUserRegisteredTutorials);
route.get("/tutorial/:assignmentId",getSpecificTutorialOfUser);
route.get("/complete",completeSpecificPartOfLesson);
route.get("/profile",getUserProfile)
route.patch("/update",updateProfile);
route.patch("/password/change",changePassword)
route.delete("/delete",deleteAccount);
route.post("/feedback",createFeedback);
route.get("/feedback/query",getFeedbackStatus);


export default route;