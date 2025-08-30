import mongoose from "mongoose";

export interface IUser extends mongoose.Document {
  name: string;
  dob?: Date;
  email: string;
  otp?: string;
  googleId?: string;
}

const UserSchema = new mongoose.Schema<IUser>({
  name: { type: String, required: true },
  dob: { type: Date },
  email: { type: String, required: true, unique: true },
  otp: { type: String },
  googleId: { type: String, unique: true, sparse: true },
});

export default mongoose.model<IUser>("User", UserSchema);
