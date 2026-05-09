import { myCache } from "@/lib/cache.js";
import { TryCatch } from "@/middlewares/error.js";
import { Course } from "@/models/course.js";

import { CourseSchema, DeleteCourse } from "@/lib/schema.js";
import HttpError from "@/utils/errorHandler.js";

const courses = TryCatch(async (req, res) => {
    const isCached = myCache.has("courses");
    if (isCached) {
        const courses = JSON.parse(myCache.get("courses") as string);
        res.json({ mesage: "Courses fetched sucessfully", data: courses })
        return;
    }

    const courses = await Course.find();
    myCache.set("courses", JSON.stringify(courses), 10);
    res.json({ mesage: "Courses fetched sucessfully", data: courses })
})

const createCourse = TryCatch(async (req, res) => {
    //@ts-expect-error adminId undefined
    const adminId = req.adminId;
    const { success, data, error } = CourseSchema.safeParse(req.body);
    if (!success) {
        throw new HttpError(400, error.issues[0].message)
    }

    await Course.create({
        title: data.title,
        description: data.description,
        thumbnail: data.thumbnail,
        video: data.video,
        price: data.price,
        author: adminId
    })

    res.status(201).json({
        mesage: "Course created successsfully",
    })
    return;
})

const deleteCourse = TryCatch(async (req, res) => {
    //@ts-expect-error adminId undefined
    const adminId = req.adminId;
    const { success, data, error } = DeleteCourse.safeParse({
        courseId: req.params.courseId
    });
    if (!success) {
        throw new HttpError(400, "Invalid course id")
    }

    await Course.findOneAndDelete({ _id: data.courseId, author: adminId });

    res.sendStatus(204)
    return;
})

export {
    courses, createCourse, deleteCourse
};
