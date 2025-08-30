import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User, { IUser } from "../models/User";
import dotenv from "dotenv";

dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      callbackURL:
        process.env.GOOGLE_CALLBACK_URL ||
        "http://localhost:5000/api/auth/google/callback",
    },
    async (accessToken: any, refreshToken: any, profile: any, done: any) => {
      try {
        const email = profile.emails?.[0]?.value;
        const name = profile.displayName || "Google User";

        if (!email) {
          return done(new Error("No email found in Google profile"), null);
        }

        // Step 1: check by Google ID first
        let user: IUser | null = await User.findOne({ googleId: profile.id });

        if (user) {
          return done(null, user);
        }

        // Step 2: if no googleId match, check by email
        user = await User.findOne({ email });

        if (user) {
          // Link Google account to existing OTP account
          user.googleId = profile.id;
          await user.save();
          return done(null, user);
        }

        // Step 3: if no email match, create a brand new user
        user = await User.create({
          googleId: profile.id,
          name,
          email,
          isVerified: true,
        });

        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);
