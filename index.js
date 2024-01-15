import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";
import path from "node:path";

import router from "./router/index.js";

mongoose.connect(process.env.MONGO_URL);

const app = express();

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(cors());
app.use(express.json());

app.listen(process.env.PORT, () => {
  console.log(`Server running -> http://localhost:${process.env.PORT}`);
});

app.use("/", router());

// Global middleware for not found router
app.all("*", (req, res) => {
  res.status(404).json({
    status: "fail",
    message: "this resource not found",
  });
});

// Global middleware error handler
app.use((error, req, res, next) => {
  res.status(error.statusCode || 500).json({
    status: error.statusText || "error",
    message: error.message,
    code: error.statusCode || 500,
    data: null,
  });
});
