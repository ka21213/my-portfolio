// Kept as a separate route file to match the provided MERN skeleton structure.
import express from "express";
import userController from "../controllers/user.controller.js";
const router = express.Router();

router.post("/signin", userController.signin);
router.post("/signout", userController.signout);
export default router;
