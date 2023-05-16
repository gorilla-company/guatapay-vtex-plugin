import User from '../../models/User.model';
import { generateApiKey } from '../../lib/provider';

export const findUser = async (username: string) => User.findOne({ username });

export const createUser = async (username: string, password: string) =>
  new User({
    username,
    password,
    apiKey: await generateApiKey(username, password),
    dateModified: new Date(),
    dateCreated: new Date(),
  }).save();
