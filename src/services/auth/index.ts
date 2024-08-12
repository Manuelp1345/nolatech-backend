import { JWT_SECRET } from "../../utils/constants";
import { LoginData, RegisterData } from "./types";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { AppError } from "../../utils/AppError";
import userModel from "../../models/User.model";

export const registerService = async (data: RegisterData) => {
  const { username, email, password, role } = data;

  try {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      throw new AppError("Email already exists", 400, false);
    }

    const existingUsername = await userModel.findOne({ username });
    if (existingUsername) {
      throw new AppError("Username already exists", 401);
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new userModel({
      username,
      email,
      password: hashedPassword,
      role,
    });

    await newUser.save();

    const token = jwt.sign(
      { id: newUser._id, role: newUser.role },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    return token;
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    } else {
      console.error("Unexpected error:", error);
      throw new AppError("An unexpected error occurred", 500, false);
    }
  }
};

export const loginService = async (data: LoginData) => {
  const { email, password } = data;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      throw new AppError("User or password incorrect", 404, false);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new AppError("User or password incorrect", 404, false);
    }

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
      expiresIn: "1h",
    });

    return token;
  } catch (error) {
    console.log(error);
    if (error instanceof AppError) {
      throw error;
    } else {
      console.error("Unexpected error:", error);
      throw new AppError("An unexpected error occurred", 500, false);
    }
  }
};
