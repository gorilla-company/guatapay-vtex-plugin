import User from '../../models/User.model';
import { IUser } from '@/interfaces/user.interfaces';

//If the user does not exist, a new user is created.
export const findOrCreateUser = async (userData: IUser) => {
    const user = await User.findOne({ apiKey: userData.apiKey },{ upsert:true });
    if (!user) {
      return await new User(userData).save();
    }
    return user;
  };
