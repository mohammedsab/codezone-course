import { validationResult } from "express-validator";
import {
  createCourse,
  deleteCourseById,
  findCourseById,
  getCourses,
  updateCourseById,
} from "../models/course.model.js";
import { asyncWrapper } from "../middleware/index.js";
import appErrors from "../utils/appErrors.js";

export const addCourse = asyncWrapper(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = appErrors.create(errors.array(), 400, "fail");

    return next(error);
  }

  const course = await createCourse(req.body);
  return res.status(200).json({ status: "success", data: course });
});

export const getAllCourses = asyncWrapper(async (req, res) => {
  const { limit = 10, page = 1 } = req.query;
  const skip = (page - 1) * limit;

  const courses = await getCourses(limit, skip);
  return res.status(200).json({
    status: "success",
    data: courses,
  });
});

export const getCourseById = asyncWrapper(async (req, res, next) => {
  const course = await findCourseById(req.params.id);
  if (!course) {
    const error = appErrors.create("not found course", 404, "fail");
    return next(error);
  }
  return res.status(200).json({
    status: "success",
    data: course,
  });
});

export const editCourse = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  const values = req.body;

  const course = await updateCourseById(id, values);
  if (!course) {
    const error = appErrors.create("Course not found", 404, "fail");
    return next(error);
  }

  return res.status(200).json({
    status: "success",
    data: course,
  });
});

export const deleteCourse = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  const deletedCourse = await deleteCourseById(id);
  if (!deletedCourse) {
    const error = appErrors.create("Course not found", 404, "fail");
    return next(error);
  }
  return res.status(200).json({
    status: "success",
    data: deletedCourse,
  });
});
