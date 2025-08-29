import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
    name: string;
    email: string;
    password?: string;
    googleId?: string;
    otp?: string;
    otpExpires?: Date;
    isVerified: boolean;
    createdAt: Date;
}

const UserSchema: Schema<IUser> = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: false, 
        },
        googleId:{
            type: String,
            required: false,
            unique: true,
        },
        otp: {
            type: String,
            required: false,
        },
        otpExpires: {
            type: Date,
            required: false,
        },
        isVerified: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

const User = mongoose.model<IUser>("User", UserSchema);

export default User;
