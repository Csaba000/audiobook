import "dotenv/config";
import express, { json, urlencoded } from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import * as seeders from "./util/seeder.js";
import { initRouters } from "./routes/index.router.js";
import connectDB from './config/dbConnect.js';

const app = express();
const port = process.env.PORT || 3000;

connectDB();

// seeder
if (process.env.SEED == true) {
  seeders.createRandomBooks();
}
app.use(logger("dev"));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
initRouters(app)
app.listen(port, () => {
  console.log(`Audiobook app listening on port ${port}!`);
});

export default app;
