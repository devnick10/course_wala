import mongoose from "mongoose";

interface Admin {
  name: string;
  email: string;
  password: string;
  createdAt: Date;
}

type AdminModel = mongoose.Model<Admin> & {};

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter name"],
  },
  email: {
    type: String,
    required: [true, "Please enter email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please enter password"],
    select: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Admin = mongoose.model<Admin, AdminModel>("Admin", schema);
