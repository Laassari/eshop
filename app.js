import express from "express";
import path from "path";
import { __express } from "ejs";
import dotenv from "dotenv";

import { mountRoutes } from "./routes/index.js";
import { mountMiddlewares } from "./middleware/index.js";
import { inniDbtConnection } from "./db/db.js";

dotenv.config();
const __dirname = new URL(".", import.meta.url).pathname;

var app = express();

app.set("view engine", "html");
app.engine(".html", __express);
app.set("views", path.join(__dirname, "views"));

mountMiddlewares(app);
mountRoutes(app);

inniDbtConnection()
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
