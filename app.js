import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import { __express } from "ejs";
import dotenv from "dotenv";

import homeRoutes from "./routes/home.js";
import authRoutes from "./routes/auth.js";

dotenv.config();

const __dirname = new URL(".", import.meta.url).pathname;

var app = express();

app.set("view engine", "html");
app.engine(".html", __express);
app.set("views", path.join(__dirname, "views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", homeRoutes);
app.use("/auth", authRoutes);

app.use(errorHandler);

function errorHandler(err, req, res, nex) {
  console.error(err);
  res.send(err.toString());
}

app.listen(3000);