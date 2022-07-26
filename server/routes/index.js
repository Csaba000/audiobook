import * as dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import connectDB from "../config/dbConnect.js";
import listBooks from "../controllers/book-controller.js";
const app = express();
const port = process.env.PORT || 3000;
const router = express.Router();
app.use(express.json());


app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
connectDB();
app.get("/AudioBooks", listBooks);
export default router;
