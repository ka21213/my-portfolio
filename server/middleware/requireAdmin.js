import User from "../models/User.js";

async function requireAdmin(req, res, next) {
  try {
    // Find the currently logged-in user
    const currentUser = await User.findById(req.auth._id)
      .select("role");

    // Check whether the user exists
    if (!currentUser) {
      return res.status(401).json({
        error: "User account not found."
      });
    }

    // Check whether the user is an administrator
    if (currentUser.role !== "admin") {
      return res.status(403).json({
        error: "Admin access required."
      });
    }

    // Allow the request to continue
    next();

  } catch (error) {
    return res.status(500).json({
      error: "Could not verify account permissions."
    });
  }
}

export default requireAdmin;