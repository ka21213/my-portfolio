import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import config from "../../config/config.js";
import crudFactory from "./crudFactory.js";

const baseCrud = crudFactory(User, "User");

async function register(req, res) {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: "Name, email, and password are required." });
    }
    if (password.length < 8) {
      return res.status(400).json({ error: "Password must be at least 8 characters." });
    }
    const normalizedEmail = email.trim().toLowerCase();
    if (await User.findOne({ email: normalizedEmail })) {
      return res.status(409).json({ error: "Email already exists." });
    }
    const hashed = await bcrypt.hash(password, 12);
    const user = await User.create({ name, email: normalizedEmail, password: hashed });
    return res.status(201).json({
      message: "Successfully signed up!",
      user: { _id: user._id, name: user.name, email: user.email }
    });
  } catch (error) {
    return res.status(400).json({ error: error.message || "Could not register user." });
  }
}

async function signin(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required." });
    }
    const user = await User.findOne({ email: email.trim().toLowerCase() }).select("+password");
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Email and password do not match." });
    }
    if (!config.jwtSecret) {
      return res.status(500).json({ error: "JWT_SECRET is not configured." });
    }
    const token = jwt.sign({ _id: user._id.toString() }, config.jwtSecret, { expiresIn: "1h" });
    return res.json({
      message: "Signed in successfully.",
      token,
      user: { _id: user._id, name: user.name, email: user.email }
    });
  } catch (error) {
  console.error("SIGN-IN ERROR:", error);

  return res.status(500).json({
    error: "Could not sign in.",
    details: error.message
  });
}
}


async function me(req, res) {
  try {
    const user = await User.findById(req.auth._id)
      .select("name email created updated");

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    return res.json({ user });
  } catch (error) {
    return res.status(500).json({
      error: "Could not retrieve user information."
    });
  }
}


function signout(req, res) {
  // JWTs are stateless; the client must discard its token after signing out.
  res.clearCookie("t");
  return res.status(200).json({ message: "Signed out. Discard the JWT on the client." });
}

export default { ...baseCrud, register, signin, signout, me };
