import { myCache } from "@/lib/cache.js";
import { PurchaseSchema } from "@/lib/schema.js";
import { TryCatch } from "@/middlewares/error.js";
import { Course } from "@/models/course";
import { Purchase } from "@/models/purchese.js";
import HttpError from "@/utils/errorHandler.js";
import mongoose, { isValidObjectId } from "mongoose";


const purchase = TryCatch(async (req, res) => {
    //@ts-expect-error userId mybe undefined
    const userId = req.userId;
    const courseId = req.params.courseId;
    const { success, data } = PurchaseSchema.safeParse({ courseId });
    if (!success) {
        throw new HttpError(400, "Invalid course id")
    }

    if (!isValidObjectId(data.courseId)) {
        throw new HttpError(400, "Invalid course id")
    }

    await Purchase.create({
        // @ts-expect-error typescript conflict
        courseId: data.courseId,
        userId
    })

    res.status(200).json({ mesage: "Course purchase successfullly" })
    return;
})


const purchasedCourses = TryCatch(async (req, res) => {
    //@ts-expect-error userId always there 
    const userId = req.userId;

    const cacheKey = `purchasedCourses_${userId}`;

    const isCached = myCache.has(cacheKey);

    if (isCached) {
        const cachedData = JSON.parse(myCache.get(cacheKey) as string);
        return res.json({
            message: "Courses fetched successfully (cache)",
            data: cachedData,
        });
    }

    const courses = await Purchase.aggregate([
        {
            $match: {
                userId: new mongoose.Types.ObjectId(userId)
            }
        },
        {
            $lookup: {
                from: "courses",
                localField: "courseId",
                foreignField: "_id",
                as: "courseDetails",

            }
        },
        { $unwind: "$courseDetails" },
        {
            $replaceRoot: {
                newRoot: "$courseDetails",
            },
        }
    ]);

    myCache.set(`purchasedCourses_${userId}`, JSON.stringify(courses), 10)

    res.json({
        message: "Courses fetched successfully",
        data: courses,
    });
});


export {
    purchase, purchasedCourses
};

