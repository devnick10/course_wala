import { courses, createCourse, deleteCourse } from "@/controllers/course.controller.js";
import { adminAuth } from "@/middlewares/adminAuth.js";
import { Router } from "express";

const courseRouter = Router();

courseRouter.get("/", courses)
courseRouter.post("/", adminAuth, createCourse)
courseRouter.delete("/:courseId", adminAuth, deleteCourse)

export { courseRouter };
