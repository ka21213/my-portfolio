import express from "express";
import controller from "../controllers/contact.controller.js";
import requireSignin from "../middleware/requireSignin.js";
import requireAdmin from "../middleware/requireAdmin.js";

const router = express.Router();

// Only Admin can view all contact messages
router.get("/", requireSignin, requireAdmin, controller.list);

// Visitors can submit contact messages
router.post("/", controller.create);

// Only Admin can delete all contact messages
router.delete("/", requireSignin, requireAdmin, controller.removeAll);

// Only Admin can view one contact message
router.get("/:id", requireSignin, requireAdmin, controller.read);

// Only Admin can edit a contact message
router.put("/:id", requireSignin, requireAdmin, controller.update);

// Only Admin can delete one contact message
router.delete("/:id", requireSignin, requireAdmin, controller.remove);

export default router;