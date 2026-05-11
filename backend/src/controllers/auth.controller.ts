import { config } from "@/config/index.js";
import { SigninSchema, SignupSchema } from "@/lib/schema.js";
import { TryCatch } from "@/middlewares/error.js";
import { Admin } from "@/models/admin.js";
import HttpError from "@/utils/errorHandler.js";
import { compare, hash } from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "@/models/user.js";
import { myCache } from "@/lib/cache";

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
const getAdmin = TryCatch(async (req, res) => {

    //@ts-expect-error userId type error
    const adminId = req.adminId;
    const cache = myCache.has(`${adminId}`)

    if (cache) {
        const admin = JSON.parse(myCache.get(`${adminId}`) as string);
        return res.status(200).json({
            mesage: "User fetched successsfully",
            admin
        })
    }

    const admin = await Admin.findOne({ _id: adminId }).select({ _id: true, email: true, name: true })

    myCache.set(`${admin?._id}`, JSON.stringify(admin), 10)

    res.status(200).json({
        mesage: "Admin fetched successsfully",
        admin
    })
    return;
})

const getUser = TryCatch(async (req, res) => {
    //@ts-expect-error userId type error
    const userId = req.userId;
    const cache = myCache.has(`${userId}`)

    if (cache) {
        const user = JSON.parse(myCache.get(`${userId}`) as string);
        return res.status(200).json({
            mesage: "User fetched successsfully",
            user
        })
    }

    const user = await User.findOne({ _id: userId }).select({ _id: true, email: true, name: true })

    myCache.set(`${user?._id}`, JSON.stringify(user), 10)

    res.status(200).json({
        mesage: "User fetched successsfully",
        user
    })
    return;
})
export { adminSignin, adminSignup, userSignin, userSignup, getUser,getAdmin };
