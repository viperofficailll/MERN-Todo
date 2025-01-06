import express from "express";
import userRouter from "./routes/user.routes.js";
import cookieParser from "cookie-parser";

import { taskRouter } from "./routes/task.routes.js";

export const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1/users", userRouter);
app.use("/api/v1/tasks", taskRouter);


app.get("/", (req, res) => {
  res.send("Hello, World!");
});
