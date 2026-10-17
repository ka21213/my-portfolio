
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: { type: String, required: true, select: false },
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now }
});

UserSchema.pre("save", function () {
  this.updated = new Date();
});

export default mongoose.model("User", UserSchema);

