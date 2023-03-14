import setupTestDB from '../../setupTestDB';
import User from '../../../models/User.model';

describe('User Model', () => {
  setupTestDB();
  test('Should have the correct fields and data types', async () => {
    const user = new User({
      userId: '123456',
      apiKey: '<api-key>',    
      dateModified: new Date(),
      dateCreated: new Date(),
    });

    expect(user).toHaveProperty('userId', '123456');
    expect(user).toHaveProperty('apiKey', '<api-key>');
    expect(user).toHaveProperty('dateModified', expect.any(Date));
    expect(user).toHaveProperty('dateCreated', expect.any(Date));
  });
});

