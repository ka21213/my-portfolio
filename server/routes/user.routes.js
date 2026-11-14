import express from "express";
import controller from "../controllers/user.controller.js";
import requireSignin from "../middleware/requireSignin.js";
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