import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";


// import User from '../models/User.js'; // Adjust the path as necessary
import dotenv from 'dotenv';

dotenv.config();

export const signuphandeler = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if the email already exists
    const match = await User.findOne({ email });
    if (match) {
      return res.status(400).json({ success: false, message: "Email already exists" });
    }

    // Hash the password
    const hashedPassword = await bcryptjs.hash(password, 10);

    // Create the user
    const newUser = await User.create({ username, email, password: hashedPassword });

    // Create a JWT token
    const payload = {
      userID: newUser._id,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '1h', // Adjust expiration as needed
    });

    // Set the cookie and respond
    res
      .cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Use HTTPS in production
        sameSite: 'strict',
        maxAge: 60 * 60 * 1000, // 1 hour
      })
      .status(201)
      .json({ success: true, message: "User created successfully" });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};



export const loginhandeler = async (req, res) => {
  const { email, password } = req.body;
  const match = await User.findOne({ email });
  if (!match) {
    return res.status(404).json({ success: false, message: "User not found" });
  } else {
    const isMatch = await bcryptjs.compare(password, match.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    } else {
      const payload = {
        userID: match._id,
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      res
        .cookie("token", token)
        .status(200)
        .json({ success: true, message: "login success" });
    }
  }
};
export const profile = async (req, res) => {
  try {
    const user = await User.findById(req.userID);
    res.status(200).json({ success: true,  user });
  } catch (err) {
    console.log(err);
  }
};
export const logout = (req, res) => {
  res
      .cookie("token", null, {
          expires: new Date(0),        // Expire the cookie
          httpOnly: true,              // Make sure it's only accessible by HTTP(S), not client-side JavaScript
          secure: process.env.NODE_ENV === 'production',  // Set to true if you're in production (use HTTPS)
          sameSite: 'strict',          // Ensure the cookie is sent only in a first-party context
      })
      .json({ success: true, message: "User logged out" });
};

