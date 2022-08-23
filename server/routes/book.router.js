import express from "express";
import * as bookController from "../controllers/book.controller.js";

const router = express.Router();

router.get("/", bookController.bookLister);
router.get("/:id", bookController.bookListerById);

export default router;
