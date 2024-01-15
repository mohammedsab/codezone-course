import { body } from "express-validator";

export const coursesFieldsValidations = [
  body("title")
    .notEmpty()
    .withMessage("title is requires")
    .isLength({ min: 2 })
    .withMessage("title at least 2 digits"),
  body("price").notEmpty().withMessage("price is requires"),
];

export const asyncWrapper = (fn) => (req, res, next) => {
  fn(req, res, next).catch((err) => {
    return next(err);
  });
};
