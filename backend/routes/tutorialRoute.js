import { Router } from "express";
import { getAllCoursesList,getCourseById,startCourse } from "../Controllers/tutorialController.js";

const route = Router();
route.get("/all",getAllCoursesList);
route.get("/:id",getCourseById);
route.get("/:id/start",startCourse)

export default route;