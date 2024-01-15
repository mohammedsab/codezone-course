import express from "express";
import courses from "./courses.router.js";
import users from "./user.router.js";

const router = express.Router();
export default () => {
  courses(router);
  users(router);
  return router;
};
