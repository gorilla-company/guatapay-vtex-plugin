import { IUser } from '@/interfaces/user.interfaces';
import User from '../../models/User.model';
import { generateApiKey } from '../../lib/provider';

export const findUser = async (username: string) => User.findOne({ username }, { upsert: true });

export const createUser = async (username: string, password: string) => {
  const newUser: IUser = {
    username,
    password,
    apiKey: await generateApiKey(username, password),
    dateModified: new Date(),
    dateCreated: new Date(),
  };

  return new User(newUser).save();
};
