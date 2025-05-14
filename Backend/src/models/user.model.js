import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required."],
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required."],
      trim: true,
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);

/**
 * Mongoose hook to hash password
 */
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

/**
 * Mongoose custom hook to check password
 *
 * @param {string} password - password to be compared
 * @returns {boolean} - password is correct or not
 */
userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

export const User = mongoose.model("User", userSchema);
