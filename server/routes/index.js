import express from "express";
import connectDB from "../config/dbConnect.js";
import * as bookController from "../controllers/book-controller.js";
import createUser from "../controllers/user-controller.js";

const app = express();
const port = process.env.PORT || 3000;
const router = express.Router();
app.use(express.json());

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});

connectDB();

app.get("/audio-books", bookController.listBooks);
app.post("/register", createUser);
export default router;
