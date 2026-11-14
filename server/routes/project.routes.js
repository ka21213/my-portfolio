import express from "express";
import controller from "../controllers/project.controller.js";
<<<<<<< HEAD
import requireSignin from "../middleware/requireSignin.js";
import requireAdmin from "../middleware/requireAdmin.js";

const router = express.Router();

// Anyone can view all projects
router.get("/", controller.list);

// Only Admin can add projects
router.post("/", requireSignin, requireAdmin, controller.create);

// Only Admin can delete all projects
router.delete("/", requireSignin, requireAdmin, controller.removeAll);

// Anyone can view one project
router.get("/:id", controller.read);

// Only Admin can edit a project
router.put("/:id", requireSignin, requireAdmin, controller.update);

// Only Admin can delete one project
router.delete("/:id", requireSignin, requireAdmin, controller.remove);

export default router;
=======
const router = express.Router();

router.route("/").get(controller.list).post(controller.create).delete(controller.removeAll);
router.route("/:id").get(controller.read).put(controller.update).delete(controller.remove);
export default router;
>>>>>>> origin/main
