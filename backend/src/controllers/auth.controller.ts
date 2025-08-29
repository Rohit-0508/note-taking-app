import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import User from "../models/User";
import { generateToken } from "../utils/jwt"
import mongoose from "mongoose";
// Signup Controller
export const signup = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // check if user exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // generate OTP (6-digit)
        const otp = crypto.randomInt(100000, 999999).toString();
        const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 min validity

        // create user
        const user = new User({
            name,
            email,
            password: hashedPassword,
            otp,
            otpExpires,
        });

        await user.save();

        // TODO: send OTP via email (nodemailer will come later)
        console.log(`OTP for ${email}: ${otp}`);

        return res.status(201).json({
            message: "User registered. Please verify your email with OTP.",
        });
    } catch (error) {
        console.error("Signup Error:", error);
        return res.status(500).json({ message: "Server error", error });
    }
};


// Verify OTP Controller
export const verifyOtp = async (req: Request, res: Response) => {
    try {
        const { email, otp } = req.body;

        // find user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        // check if already verified
        if (user.isVerified) {
            return res.status(400).json({ message: "User already verified" });
        }

        // check OTP + expiry
        if (user.otp !== otp || !user.otpExpires || user.otpExpires < new Date()) {
            return res.status(400).json({ message: "Invalid or expired OTP" });
        }

        // update user as verified
        user.isVerified = true;
        user.otp = undefined;
        user.otpExpires = undefined;
        await user.save();

        const token = generateToken((user._id as mongoose.Types.ObjectId).toString());

        return res.status(200).json({ message: "Account verified successfully!", token, user: { id: user._id, name: user.name, email: user.email } });
    } catch (error) {
        console.error("OTP Verification Error:", error);
        return res.status(500).json({ message: "Server error", error });
    }
};


// Login Controller
export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // find user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // check if verified
        if (!user.isVerified) {
            return res.status(400).json({ message: "Please verify your email first" });
        }
        if (!user.password) {
            return res.status(400).json({ message: "Password login not available for this user. Login with Google." });
        }

        // check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // generate JWT
        const token = generateToken((user._id as mongoose.Types.ObjectId).toString());

        return res.status(200).json({
            message: "Login successful",
            token,
            user: { id: user._id, name: user.name, email: user.email }
        });
    } catch (error) {
        console.error("Login Error:", error);
        return res.status(500).json({ message: "Server error", error });
    }
};
