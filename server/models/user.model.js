import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: [ 'instructor', 'student'], // You can customize the roles as needed
      required: true,
      default: 'student', // Default role is student
    }

  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
