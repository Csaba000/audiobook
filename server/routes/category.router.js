import express from "express";
import * as categoryController from "../controllers/category.controller.js";

const router = express.Router();

router.post("/create", categoryController.createCategory);
router.get("/", categoryController.categoryLister);

export default router;
