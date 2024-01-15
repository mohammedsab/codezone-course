import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import { asyncWrapper } from "../middleware/index.js";
import { createUser, getUserByEmail, getUsers } from "../models/user.model.js";
import appErrors from "../utils/appErrors.js";
import generateJWT from "../utils/generate.JWT.js";

export const getAllUsers = asyncWrapper(async (req, res) => {
  const query = req.query;
  const limit = query || 10;
  const page = query.page || 1;
  const skip = (page - 1) * limit;
  const users = await getUsers(limit, skip);
  res.json({ status: "success", data: users });
});

export const register = asyncWrapper(async (req, res, next) => {
  const { username, email, password, role } = req.body;

  const oldUser = await getUserByEmail(email);
  if (oldUser) {
    const error = appErrors.create("User already exists", 400, "fail");
    return next(error);
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await createUser({
    username,
    email,
    password: hashedPassword,
    role,
    avatar: req.file.filename,
  });
  const token = await generateJWT(
    { username, email, id: user._id, role },
    "1h"
  );
  user.token = token;
  await user.save();

  return res.status(201).json({ status: "success", data: user });
});

export const login = asyncWrapper(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    const error = appErrors.create(
      "email and password are required",
      400,
      "fail"
    );
    return next(error);
  }
  const user = await getUserByEmail(email);
  if (!user) {
    const error = appErrors.create("not found user", 404, "fail");
    return next(error);
  }

  const checkPassword = await bcrypt.compare(password, user.password);

  if (user && checkPassword) {
    const token = await generateJWT(
      { email, id: user._id, role: user.role },
      "1h"
    );
    return res.status(200).json({
      status: "success",
      token,
    });
  }

  return res.status(400).json({ message: "password error", status: "fail" });
});

export const updataUserData = () => {};
