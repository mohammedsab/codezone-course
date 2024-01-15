import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
});

export const CourseModel = mongoose.model("Course", courseSchema);

export const createCourse = (values) =>
  new CourseModel(values).save().then((course) => course.toObject());

export const getCourses = (limit, skip) =>
  CourseModel.find({}, { __v: false }).limit(limit).skip(skip);

export const findCourseById = (id) => CourseModel.findById(id, { __v: false });

export const updateCourseById = (id, values) =>
  CourseModel.findByIdAndUpdate(
    id,
    values,
    { __v: false },
    { returnDocument: "after" }
  );

export const deleteCourseById = (id) =>
  CourseModel.findByIdAndDelete(id, { __v: false });
