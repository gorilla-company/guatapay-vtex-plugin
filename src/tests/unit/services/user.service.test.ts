import setupTestDB from '../../setupTestDB';
import User from '../../../models/User.model';
import { /* createUser, */ findUser } from '../../../services/database/user.service';
import { userMock } from '../../mocks/database/user';

describe('Update or create user', () => {
  setupTestDB();
  test('Should create a user', async () => {
    // Create a user
    // eslint-disable-next-line no-new
    const createdUser = await User.create(userMock);

    // The user should have been created
    expect(createdUser.username).toEqual(userMock.username);

    // The created user should have been saved to the database
    const savedUser = await User.findOne({ username: userMock.username });
    expect(savedUser!.username).toEqual(userMock.username);
  });
  test('should get the same user when call findOrCreate User', async () => {
    await User.deleteMany();
    // Create a user
    const newUser = await User.create(userMock);

    // get the user
    const user = await findUser(userMock.username);

    // The user should have been updated
    expect(newUser.apiKey).toEqual(user?.apiKey);
  });
});
