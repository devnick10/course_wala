import mongoose from "mongoose";

interface Course {
    title:string
    description:string
    thumbnail:string
    video:string
    author:mongoose.Types.ObjectId
}

type CourseModel = mongoose.Model<Course> & {};

const schema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please enter title"],
    },
    description: {
        type: String,
    },
    thumbnail: {
        type: String,
    },
    video: {
        type: String,
        required: [true, "Video file required!"]
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "admin"
    },
    price:{
        type:Number,
        required:[true, "Price is required!"]
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export const Course = mongoose.model<Course, CourseModel>("Course", schema);
