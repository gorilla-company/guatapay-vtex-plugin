import mongoose from 'mongoose';
import toJSON from '../lib/toJSON/toJSON';
import { IUser } from '../interfaces/user.interfaces';
import { protectedString } from '../lib/db.protection';

const userSchema = new mongoose.Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      index: true,
    },
    // Client Auth
    password: protectedString,
    apiKey: String,
    // Dates
    dateModified: Date,
    dateCreated: Date,
  },
  {
    timestamps: true,
  },
);

// Add plugin that converts mongoose to json
userSchema.plugin(toJSON);

const User = mongoose.model<IUser>('User', userSchema);

export default User;
