import express from "express";
import * as userController from "../controllers/user.controller.js";

const router = express.Router();

router.get("/:id", userController.userListerById);
router.post("/currentUser", userController.currentUser);
router.post("/login", userController.login);
router.post("/register", userController.register);
router.post("/listFavorites", userController.listFavorites);
router.post("/favorites", userController.addToFavorites);
router.post("/removeFromFavorites", userController.removeFromFavorites);
router.post("/passwordChange", userController.changePassword);
router.post("/emailChange", userController.changeEmail);

export default router;
