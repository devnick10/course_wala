import mongoose from "mongoose";
import z from "zod";

const SignupSchema = z.object({
    name: z.string().max(20).min(4),
    email: z.email(),
    password: z.string().max(30).min(4),
})

const SigninSchema = z.object({
    email: z.email(),
    password: z.string().max(30).min(4),
})

const CourseSchema = z.object({
    title: z.string(),
    description: z.string(),
    thumbnail: z.string(),
    video: z.string(),
    price: z.number(),
})

const PurchaseSchema = z.object({
    // Validate that it is a string and, optionally, a 24-character hex string
    courseId: z.string().refine(id => mongoose.Types.ObjectId.isValid(id), {
        message: "Invalid ObjectId",
    }),
});

const DeleteCourse = z.object({
    // Validate that it is a string and, optionally, a 24-character hex string
    courseId: z.string().refine(id => mongoose.Types.ObjectId.isValid(id), {
        message: "Invalid ObjectId",
    }),
});

export {
    SignupSchema,
    SigninSchema,
    PurchaseSchema,
    CourseSchema,
    DeleteCourse
}