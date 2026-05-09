import mongoose from "mongoose";

interface Purchase {
    userId: mongoose.Schema.Types.ObjectId;
    courseId: mongoose.Schema.Types.ObjectId;
}

type PurchaseModel = mongoose.Model<Purchase> & {};

const schema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "UserId is required"],
    },
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "UserId is required"],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export const Purchase = mongoose.model<Purchase, PurchaseModel>("Purchase", schema);
