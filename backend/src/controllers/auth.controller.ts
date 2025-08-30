import { Request, Response } from "express";
import crypto from "crypto";
import User from "../models/User";
import { generateToken } from "../utils/jwt";
import mongoose from "mongoose";

import { sendEmail } from "../config/sendGrid";

export const signup = async (req: Request, res: Response) => {
  try {
    const { name, email, dob } = req.body;

    if (!name || !email || !dob) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // check if user exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // generate permanent OTP (6-digit)
    const otp = crypto.randomInt(100000, 999999).toString();

    // create user with OTP
    user = new User({ name, email, dob, otp });
    await user.save();

    // send OTP via email
    await sendEmail({
      to: email,
      subject: "Your Signup OTP Code",
      text: `Hello ${name},\n\nYour OTP code is ${otp}.`,
      html: `<p>Hello <strong>${name}</strong>,</p>
             <p>Your OTP code is: <h2>${otp}</h2></p>
             <p>This code is valid for signup verification.</p>`,
    });

    return res.status(201).json({
      success: true,
      message: "Signup successful. OTP has been sent to your email.",
    });
  } catch (error) {
    console.error("Signup Error:", error);
    return res.status(500).json({ message: "Server error", error });
  }
};

// Login Controller
export const login = async (req: Request, res: Response) => {
    try {
        const { email, otp } = req.body;

        if (!email || !otp) {
            return res.status(400).json({ message: "Email and OTP are required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        if (user.otp !== otp) {
            return res.status(400).json({ message: "Invalid OTP" });
        }

        // OTP is valid, generate JWT
        const token = generateToken((user._id as mongoose.Types.ObjectId).toString());

        return res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            user: { id: user._id, name: user.name, email: user.email, dob: user.dob },
        });
    } catch (error) {
        console.error("Login Error:", error);
        return res.status(500).json({ message: "Server error", error });
    }
};
