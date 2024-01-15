import {
  addCourse,
  deleteCourse,
  editCourse,
  getAllCourses,
  getCourseById,
} from "../controllers/courses.controllers.js";
import { coursesFieldsValidations } from "../middleware/index.js";
import verifyToken from "../middleware/verifyToken.js";
import userRoles from "../utils/userRoles.js";
import allowedTo from "../middleware/allowedTo.js";

export default (router) => {
  router
    .route("/api/courses")
    .get(getAllCourses)
    .post(
      verifyToken,
      allowedTo(userRoles.MANGER),
      coursesFieldsValidations,
      addCourse
    );
  router
    .route("/api/courses/:id")
    .get(verifyToken, getCourseById)
    .patch(verifyToken, editCourse)
    .delete(
      verifyToken,
      allowedTo(userRoles.ADMIN, userRoles.MANGER),
      deleteCourse
    );
};
