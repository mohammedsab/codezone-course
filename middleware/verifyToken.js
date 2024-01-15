import jwt from "jsonwebtoken";
import appErrors from "../utils/appErrors.js";

export default (req, res, next) => {
  const authHeader = req.header("Authorization") || req.header("authorization");
  if (!authHeader) {
    const errors = appErrors.create("Login required", 400, "fail");
    return next(errors);
  }
  const token = authHeader.split(" ")[1];
  if (!token) {
    const errors = appErrors.create("got error in token", 400, "fail");
    return next(errors);
  }
  try {
    const currentUser = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.currentUser = currentUser;
    return next();
  } catch (e) {
    const error = appErrors.create("invalid token", 401, "error");
    return next(error);
  }
};
