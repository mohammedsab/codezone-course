import mongoose from "mongoose";
import validator from "validator";
import userRoles from "../utils/userRoles.js";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validator.isEmail, "field must be a valid email address"],
  },
  password: { type: String, required: true },
  token: { type: String },
  role: {
    type: String,
    enum: [userRoles.ADMIN, userRoles.USER, userRoles.MANGER],
    default: userRoles.USER,
  },
  avatar: {
    type: String,
    default: "uploads/profile.png",
  },
});

export const UserModel = mongoose.model("User", userSchema);

export const createUser = (values) => new UserModel(values).save();
export const getUsers = (limit, skip) =>
  UserModel.find({}, { __v: false, password: false }).limit(limit).skip(skip);
export const getUserById = (id) => UserModel.findById(id);
export const getUserByEmail = (email) => UserModel.findOne({ email });
export const updateUserById = (id, values) =>
  UserModel.findByIdAndUpdate(id, values, { returnDocument: "after" });
export const deleteUser = (id) => UserModel.findByIdAndDelete(id);
