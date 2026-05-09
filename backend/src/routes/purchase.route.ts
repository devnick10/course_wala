import { purchase,purchasedCourses } from "@/controllers/purchase.controller.js";
import { Router } from "express";

export const purchaseRouter = Router();

purchaseRouter.get("/",purchasedCourses)
purchaseRouter.post("/:courseId",purchase)
