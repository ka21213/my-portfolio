import express from "express";
import controller from "../controllers/qualification.controller.js";
import requireSignin from "../middleware/requireSignin.js";
import requireAdmin from "../middleware/requireAdmin.js";

const router = express.Router();

// Anyone can view all qualifications
router.get("/", controller.list);

// Only Admin can add qualifications
router.post("/", requireSignin, requireAdmin, controller.create);

// Only Admin can delete all qualifications
router.delete("/", requireSignin, requireAdmin, controller.removeAll);

// Anyone can view one qualification
router.get("/:id", controller.read);

// Only Admin can edit a qualification
router.put("/:id", requireSignin, requireAdmin, controller.update);

// Only Admin can delete one qualification
router.delete("/:id", requireSignin, requireAdmin, controller.remove);

export default router;