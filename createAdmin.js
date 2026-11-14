import "dotenv/config";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

import config from "./config/config.js";
import User from "./server/models/User.js";

async function createAdmin() {
  try {
    await mongoose.connect(config.mongoUri, {
      dbName: "Portfolio"
    });

    const email = "admin.portfolio@example.com";
    const password = "AdminPortfolio!2026";

    const hashedPassword = await bcrypt.hash(password, 12);

    let admin = await User.findOne({ email });

    if (!admin) {
      admin = new User({
        name: "Portfolio Administrator",
        email,
        password: hashedPassword,
        role: "admin"
      });
    } else {
      admin.name = "Portfolio Administrator";
      admin.password = hashedPassword;
      admin.role = "admin";
    }

    await admin.save();

    console.log("Admin account created successfully!");
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Role:", admin.role);

  } catch (error) {
    console.error("Admin creation failed:", error.message);

  } finally {
    await mongoose.disconnect();
  }
}

createAdmin();