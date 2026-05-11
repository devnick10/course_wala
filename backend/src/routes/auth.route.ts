import { userSignin, userSignup, adminSignin, adminSignup, getAdmin, getUser } from "@/controllers/auth.controller.js";
import { adminAuth } from "@/middlewares/adminAuth";
import { userAuth } from "@/middlewares/userAuth";
import { Router } from "express";

export const authRouter = Router();

authRouter.post("/admins/signup", adminSignup)
authRouter.post("/admins/signin", adminSignin)
authRouter.get("/admins/me", adminAuth, getAdmin)

authRouter.post("/users/signup", userSignup)
authRouter.post("/users/signin", userSignin)
authRouter.get("/users/me", userAuth, getUser)
