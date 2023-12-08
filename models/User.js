import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
const { Schema, model } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    index: { unique: true },
  },
  password: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    trim: true,
  },
  rol: {
    type: String,
    required: true,
    trim: true,
  },
});

userSchema.pre("save", async function (next) {
  const user = this;

  if (!user.isModified("password")) return next();

  try {
    const salt = await bcryptjs.genSalt(10);
    user.password = await bcryptjs.hash(user.password, salt);
    user.username = user.username.toUpperCase();
    user.rol = user.rol.toUpperCase();
    next();
  } catch (error) {
    console.log(error);
  }
  throw new Error("Fallo el hash de contraseña");
});

userSchema.methods.comparePassword = async function (clientPassword) {
  return await bcryptjs.compare(clientPassword, this.password)
}

export const User = model("User", userSchema);
