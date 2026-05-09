import { Router } from "express";

import { authRouter } from "./auth.route.js";
import { courseRouter } from "./course.route.js";
import { purchaseRouter } from "./purchase.route.js";
import {  userAuth } from "@/middlewares/userAuth.js";

const appRouter = Router();

appRouter.use("/auth", authRouter);

appRouter.use("/courses", courseRouter);

appRouter.use("/purchases",userAuth, purchaseRouter);

export { appRouter };