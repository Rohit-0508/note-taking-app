import { Router } from "express";
import mongoose from "mongoose";
import passport from "passport";
import { generateToken } from "../utils/jwt";
import { signup, login } from "../controllers/auth.controller";
import "../config/passport"; //ensure passport stratergy is loaded

import dotenv from "dotenv";

dotenv.config();

const router = Router();

// Email/Password auth
router.post("/signup", signup);
router.post("/login", login);

// Google OAuth
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false, failureRedirect: "/" }),
  (req, res) => {
    const user: any = req.user; // use 'any' or IUser if you want strict typing
    const token = generateToken((user._id as mongoose.Types.ObjectId).toString());

    const frontendURL = process.env.CLIENT_URL || "http://localhost:5173";
    const encodedUser = encodeURIComponent(JSON.stringify(user));

    // Redirect to frontend with JWT and user data
    res.redirect(`${frontendURL}/dashboard?token=${token}&user=${encodedUser}`);
  }
);

export default router;
