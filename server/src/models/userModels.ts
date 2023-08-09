import mongoose, { Schema } from "mongoose";

export interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
  gender: string;
  DOB: string;
  department: string;
}

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, `Please input your firstname`],
    },
    lastName: {
      type: String,
      required: [true, `Please input your lastname`],
    },
    email: {
      type: String,
      required: [true, `Please input your email`],
    },
    password: {
      type: String,
      required: [false],
    },
    role: {
      type: String,
      required: [true, `Please input your role.`],
    },
    gender: {
      type: String,
      required: [false],
    },
    DOB: {
      type: String,
      required: [false],
    },
    department: {
      type: String,
      required: [false],
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model<IUser>("User", userSchema);

export default User;
