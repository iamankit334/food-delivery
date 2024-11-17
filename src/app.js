import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const twoStepBack = path.join(__dirname, "../");

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));
app.use(express.static("public"));
app.use(cookieParser());

//routes import
import userRouter from "./routes/User.route.js";
import errorHandler from "./middlewares/errorHandler.js";

app.use("/api/v1/users", userRouter);

app.use(errorHandler);

// --------------HEROKU-----
if (process.env.NODE_ENV == "production") {
  app.use(express.static("frontend/dist"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(twoStepBack, "frontend", "dist", "index.html"));
  });
}

export { app };
