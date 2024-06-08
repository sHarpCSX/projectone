import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  //TODO: Custom User-ID
  {
    firstname: {
      type: String,
      required: true,
      min: 2,
    },
    lastname: {
      type: String,
      required: true,
      min: 2,
    },
    dob: {
      type: Date,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    img: {
      type: String,
    },
    phone: {
      type: String,
    },
    position: {
      type: String,
      required: true,
    },
    unit: {
      type: Number,
      required: true,
    },
    role: {
      type: String,
      required: true,
      default: "User",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export const User = mongoose.models.User || mongoose.model("User", userSchema);
