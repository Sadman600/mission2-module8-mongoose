import { Schema, model } from 'mongoose';
import { TUser } from './user.interface';

const userSchema = new Schema<TUser>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    needChangePassword: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      enum: {
        values: ['admin', 'student', 'faculty'],
      },
    },
    status: {
      type: String,
      enum: {
        values: ['in-prograss', 'blocked'],
      }, // Enforce that the value must be one of the enum values
      default: 'in-prograss', // Set the default value to 'active'
    },
    isDelete: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

export const UserModel = model<TUser>('User', userSchema);
