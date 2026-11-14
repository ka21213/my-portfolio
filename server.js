import "dotenv/config";
import mongoose from "mongoose";
import config from "./config/config.js";
import app from "./server/express.js";

async function startServer() {
  if (!config.mongoUri) {
    console.error("MONGODB_URI is missing. Create a .env file using .env.example.");
    process.exit(1);
  }
  if (!config.jwtSecret) {
    console.error("JWT_SECRET is missing. Add it to your .env file.");
    process.exit(1);
  }

  try {
    await mongoose.connect(config.mongoUri, { dbName: "Portfolio" });
    console.log(`MongoDB connected: ${mongoose.connection.name}`);

    app.listen(config.port, () => {
      console.log(`Backend server running at http://localhost:${config.port}`);
    });
  } catch (error) {
    console.error("Could not connect to MongoDB:", error.message);
    process.exit(1);
  }
}

startServer();
