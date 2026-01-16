import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();


// JWT secret key
const JWT_SECRET = process.env.JWT_SECRET;

// -------------------- SIGNUP --------------------
export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });
    await newUser.save();

    // Generate JWT token
    const token = jwt.sign({ id: newUser._id }, JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(201).json({
      success: true,
      user: newUser,
      token,
      message: "Account created successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

// -------------------- SIGNIN --------------------
export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "7d" });

    res.status(200).json({
      success: true,
      user,
      token,
      message: "Logged in successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

// -------------------- UPDATE PROFILE --------------------
export const updateProfile = async (req, res) => {
  try {
    const userId = req.user._id; // from protectRoute middleware
    const { name, password, location } = req.body;

    const updatedData = {};

    if (name) updatedData.name = name;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      updatedData.password = await bcrypt.hash(password, salt);
    }
    if (location) {
      updatedData.location = {
        lat: location.lat,
        lon: location.lon,
        updatedAt: Date.now(),
      };
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updatedData, {
      new: true,
    });

    res.status(200).json({ success: true, user: updatedUser });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

// -------------------- CHECK AUTH --------------------
export const checkAuth = async (req, res) => {
  try {
    const userId = req.user._id; // from protectRoute middleware
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

// -------------------- GET CURRENT USER --------------------
export const me = (req, res) => {
  res.status(200).json({ success: true, user: req.user });
};

// -------------------- CHANGE LOCATION --------------------
export const changeLoc = async (req, res) => {
  try {
    const { lat, lon } = req.body;

    req.user.location = { lat, lon, updatedAt: new Date() };
    await req.user.save();

    res.status(200).json({ success: true, message: "Location updated" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};
