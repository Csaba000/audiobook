import "dotenv/config";
import express, { json, urlencoded } from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import * as seeders from "./util/seeder.js";
import indexRouter from "./routes/index.js";


const app = express();
// seeder
if (process.env.SEED == true) {
  seeders.createRandomBooks();
}
app.use(logger("dev"));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/", indexRouter);

export default app;
