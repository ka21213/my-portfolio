import express from "express";
import controller from "../controllers/user.controller.js";
import requireSignin from "../middleware/requireSignin.js";

const router = express.Router();

router.post("/register", controller.register);
router.post("/signin", controller.signin);
router.post("/signout", controller.signout);
router.get("/me", requireSignin, controller.me);

// Assignment CRUD endpoints for users require a valid JWT.
router.get("/", requireSignin, controller.list);
router.post("/", requireSignin, controller.create);
router.get("/:id", requireSignin, controller.read);
router.put("/:id", requireSignin, controller.update);
router.delete("/:id", requireSignin, controller.remove);
router.delete("/", requireSignin, controller.removeAll);

export default router;
