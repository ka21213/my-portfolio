import express from "express";
import controller from "../controllers/user.controller.js";
import requireSignin from "../middleware/requireSignin.js";
<<<<<<< HEAD
import requireAdmin from "../middleware/requireAdmin.js";

const router = express.Router();

// Only Admin can manage user accounts
router.get("/", requireSignin, requireAdmin, controller.list);
router.post("/", requireSignin, requireAdmin, controller.create);
router.get("/:id", requireSignin, requireAdmin, controller.read);
router.put("/:id", requireSignin, requireAdmin, controller.update);
router.delete("/:id", requireSignin, requireAdmin, controller.remove);
router.delete("/", requireSignin, requireAdmin, controller.removeAll);

export default router;
=======

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
>>>>>>> origin/main
