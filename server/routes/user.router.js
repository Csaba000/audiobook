import express from "express";
import * as userController from "../controllers/user.controller.js";
import bcrypt from "bcrypt";
import userSchema from "../models/user.model.js";

const router = express.Router();

router.get("/:id", userController.userListerById);
router.post("/login", userController.login);
router.post("/register", userController.register);

export default router;
