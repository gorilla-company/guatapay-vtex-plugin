import { IUser } from '@/interfaces/user.interfaces';
import User from '../../models/User.model';
import { generateApiKey } from '../../lib/provider';

type UserData = Omit<IUser, 'apiKey' | 'dateModified' | 'dateCreated'>;

// If the user does not exist, a new user is created.
export const findOrCreateUser = async (userData: UserData) => {
  const { username, password } = userData;
  const user = await User.findOne({ username }, { upsert: true });
  if (!user) {
    const newUser: IUser = {
      username,
      password,
      apiKey: await generateApiKey(username, password),
      dateModified: new Date(),
      dateCreated: new Date(),
    };
    return new User(newUser).save();
  }
  return user;
};
