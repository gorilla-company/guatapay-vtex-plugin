import setupTestDB from '../../setupTestDB';
import User from '../../../models/User.model';

describe('User Model', () => {
  setupTestDB();
  test('Should have the correct fields and data types', async () => {
    const user = new User({
      username: 'conexa',
      password: '123',
      apiKey: '<api-key>',
      dateModified: new Date(),
      dateCreated: new Date(),
    });

    expect(user).toHaveProperty('username', 'conexa');
    expect(user).toHaveProperty('password', '123');
    expect(user).toHaveProperty('apiKey', '<api-key>');
    expect(user).toHaveProperty('dateModified', expect.any(Date));
    expect(user).toHaveProperty('dateCreated', expect.any(Date));
  });
});
