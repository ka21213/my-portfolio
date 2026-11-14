import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import config from "../../config/config.js";
import crudFactory from "./crudFactory.js";

const baseCrud = crudFactory(User, "User");

// Remove password before sending user information to the frontend
function safeUser(user) {
  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    created: user.created,
    updated: user.updated
  };
}


// Register a new regular user
async function register(req, res) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        error: "Name, email, and password are required."
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        error: "Password must be at least 8 characters."
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const existingUser = await User.findOne({
      email: normalizedEmail
    });

    if (existingUser) {
      return res.status(409).json({
        error: "Email already exists."
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      name,
      email: normalizedEmail,
      password: hashedPassword,
      role: "user"
    });

    return res.status(201).json({
      message: "Successfully signed up!",
      user: safeUser(user)
    });

  } catch (error) {
    return res.status(400).json({
      error: error.message || "Could not register user."
    });
  }
}


// Sign in
async function signin(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: "Email and password are required."
      });
    }

    const user = await User.findOne({
      email: email.trim().toLowerCase()
    }).select("+password");

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({
        error: "Email and password do not match."
      });
    }

    const token = jwt.sign(
      {
        _id: user._id.toString(),
        role: user.role
      },
      config.jwtSecret,
      {
        expiresIn: "1h"
      }
    );

    return res.json({
      message: "Signed in successfully.",
      token,
      user: safeUser(user)
    });

  } catch (error) {
    console.error("SIGN-IN ERROR:", error);

    return res.status(500).json({
      error: "Could not sign in."
    });
  }
}


// Get current signed-in user
async function me(req, res) {
  try {
    const user = await User.findById(req.auth._id)
      .select("name email role created updated");

    if (!user) {
      return res.status(404).json({
        error: "User not found."
      });
    }

    return res.json({ user });

  } catch (error) {
    return res.status(500).json({
      error: "Could not retrieve user information."
    });
  }
}


// Sign out
function signout(req, res) {
  res.clearCookie("t");

  return res.status(200).json({
    message: "Signed out successfully."
  });
}


// Admin creates a user
async function create(req, res) {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        error: "Name, email, and password are required."
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        error: "Password must be at least 8 characters."
      });
    }

    if (role && !["admin", "user"].includes(role)) {
      return res.status(400).json({
        error: "Invalid user role."
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const existingUser = await User.findOne({
      email: normalizedEmail
    });

    if (existingUser) {
      return res.status(409).json({
        error: "Email already exists."
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      name,
      email: normalizedEmail,
      password: hashedPassword,
      role: role || "user"
    });

    return res.status(201).json({
      message: "User created successfully.",
      user: safeUser(user)
    });

  } catch (error) {
    return res.status(400).json({
      error: error.message || "Could not create user."
    });
  }
}


// Admin updates a user
async function update(req, res) {
  try {
    const { name, email, password, role } = req.body;

    if (role && !["admin", "user"].includes(role)) {
      return res.status(400).json({
        error: "Invalid user role."
      });
    }

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        error: "User not found."
      });
    }

    if (name !== undefined) {
      user.name = name;
    }

    if (email !== undefined) {
      user.email = email.trim().toLowerCase();
    }

    if (role !== undefined) {
      user.role = role;
    }

    if (password) {
      if (password.length < 8) {
        return res.status(400).json({
          error: "Password must be at least 8 characters."
        });
      }

      user.password = await bcrypt.hash(password, 12);
    }

    await user.save();

    return res.json({
      message: "User updated successfully.",
      user: safeUser(user)
    });

  } catch (error) {
    return res.status(400).json({
      error: error.message || "Could not update user."
    });
  }
}


export default {
  ...baseCrud,
  register,
  signin,
  signout,
  me,
  create,
  update
};