import multer from "multer";

import {
  getAllUsers,
  login,
  register,
  updataUserData,
} from "../controllers/users.controllers.js";
import verifyToken from "../middleware/verifyToken.js";
import appErrors from "../utils/appErrors.js";

const diskStorage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    const fileName = "user-" + Date.now() + "." + file.mimetype.split("/")[1];
    cb(null, fileName);
  },
});

const fileFilter = (req, file, cb) => {
  const fileType = file.mimetype.split("/")[0];
  if (fileType === "image") {
    return cb(null, true);
  } else {
    return cb(appErrors.create("file must be an image", 400, "fail"), false);
  }
};
const upload = multer({ storage: diskStorage, fileFilter });

export default (router) => {
  router.get("/api/users", verifyToken, getAllUsers);
  router.post("/api/register", upload.single("avatar"), register);
  router.get("/api/login", login);
  router.patch("/api/updataUserData", verifyToken, updataUserData);
};
