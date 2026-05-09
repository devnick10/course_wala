import {userSignin,userSignup,adminSignin,adminSignup } from "@/controllers/auth.controller.js";
import { Router } from "express";

export const authRouter = Router();

authRouter.post("/admins/signup", adminSignup)
authRouter.post("/admins/signin", adminSignin)

authRouter.post("/users/signup", userSignup)
authRouter.post("/users/signin", userSignin)
