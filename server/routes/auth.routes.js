import express from "express";
import userController from "../controllers/user.controller.js";
import requireSignin from "../middleware/requireSignin.js";

const router = express.Router();

// Register a new account
router.post("/register", userController.register);

// Sign in
router.post("/signin", userController.signin);

// Sign out
router.get("/signout", userController.signout);

// Get information about the logged-in user
router.get("/me", requireSignin, userController.me);

export default router;