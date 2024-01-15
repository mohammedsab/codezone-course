import appErrors from "../utils/appErrors.js";

export default (...roles) => {
  return (req, res, next) => {
    if (roles.includes(req.currentUser.role)) {
      return next();
    } else {
      const error = appErrors.create("You do not have permission", 400, "fail");
      return next(error);
    }
  };
};
