import setupTestDB from '../../setupTestDB';
import User from '../../../models/User.model';
import { findOrCreateUser } from '../../../services/database/user.service';
import { userMock } from '../../mocks/database/user';



describe('Update or create user', () => {
    setupTestDB();
    test('should create a user when no user exists with the given id', async () => {
      // Create a user
      const createdUser = await findOrCreateUser(userMock);

      // The user should have been created
      expect(createdUser!.userId).toEqual(userMock.userId);
      
      // The created user should have been saved to the database
      const savedUser = await User.findOne({ userId: userMock.userId });
      expect(savedUser!.userId).toEqual(userMock.userId);
    });

    test('should get the same user when call findOrCreate User', async () => {
        await User.deleteMany();
        // Create a user
        const newUser = await User.create(userMock);
  
        // get the user
        const user = await findOrCreateUser(userMock);
  
        // The user should have been updated
        expect(newUser._id).toEqual(user._id);
  
      });
});