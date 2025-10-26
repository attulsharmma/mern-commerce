import mongoose, { Model, Schema } from "mongoose";
import { IUser } from "./user.types.js";
const UserSchema: Schema<IUser> = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { timestamps: true },
);
const User: Model<IUser> = mongoose.model<IUser>("User", UserSchema);
export { User };
