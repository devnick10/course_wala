import { config } from "@/config/index.js";
import { SigninSchema, SignupSchema } from "@/lib/schema.js";
import { TryCatch } from "@/middlewares/error.js";
import { Admin } from "@/models/admin.js";
import HttpError from "@/utils/errorHandler.js";
import { compare, hash } from "bcrypt";
import jwt from "jsonwebtoken";

import { User } from "@/models/user.js";


const userSignup = TryCatch(async (req, res) => {
    const { success, data, error } = SignupSchema.safeParse(req.body);
    if (!success) {
        throw new HttpError(400, error.issues[0].message)
    }

    const user = await User.findOne({ email: data.email });

    if (user) {
        throw new HttpError(409, "Email already taken!")
    }

    // hash password
    const hashedPassword = await hash(data.password, 10);
    const registeredUser = await User.create({
        name: data.name,
        email: data.email,
        password: hashedPassword
    })

    // create token 
    const token = jwt.sign({ id: registeredUser.id }, config.JWT_USER_SECRET)
    res.status(201).json({
        mesage: "signup successsfully",
        token
    })
    return;
})

const userSignin = TryCatch(async (req, res) => {
    const { success, data, error } = SigninSchema.safeParse(req.body);
    if (!success) {
        throw new HttpError(400, error.issues[0].message)
    }

    const user = await User.findOne({ email: data.email }).select("password");

    if (!user) {
        throw new HttpError(401, "Invalid credentials")
    }
    console.log(user)
    // hash password
    const isValidPassword = await compare(data.password, user.password);

    if (!isValidPassword) {
        throw new HttpError(401, "Invalid credentials")
    }
    // create token 
    const token = jwt.sign({ id: user.id }, config.JWT_USER_SECRET)
    res.status(200).json({
        mesage: "signin successsfully",
        token
    })
    return;
})

const adminSignup = TryCatch(async (req, res) => {
    const { success, data, error } = SignupSchema.safeParse(req.body);
    if (!success) {
        throw new HttpError(400, error.issues[0].message)
    }

    const admin = await Admin.findOne({ email: data.email });

    if (admin) {
        throw new HttpError(409, "Email already taken!")
    }

    // hash password
    const hashedPassword = await hash(data.password, 10);
    const registeredAdmin = await Admin.create({
        name: data.name,
        email: data.email,
        password: hashedPassword
    })

    // create token 
    const token = jwt.sign({ id: registeredAdmin.id }, config.JWT_ADMIN_SECRET)
    res.status(201).json({
        mesage: "signup successsfully",
        token
    })
    return;
})

const adminSignin = TryCatch(async (req, res) => {
    const { success, data, error } = SigninSchema.safeParse(req.body);
    if (!success) {
        throw new HttpError(400, error.issues[0].message)
    }

    const admin = await Admin.findOne({ email: data.email }).select("password");

    if (!admin) {
        throw new HttpError(400, "Invalid credentials")
    }
    // hash password
    const isValidPassword = await compare(data.password, admin.password);

    if (!isValidPassword) {
        throw new HttpError(400, "Invalid credentials")
    }
    // create token 
    const token = jwt.sign({ id: admin.id }, config.JWT_ADMIN_SECRET)
    res.status(200).json({
        mesage: "signin successsfully",
        token
    })
    return;
})
export { adminSignin, adminSignup, userSignin, userSignup };
