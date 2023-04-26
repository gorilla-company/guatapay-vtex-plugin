import setupTestDB from '../../setupTestDB';
import User from '../../../models/User.model';

describe('User Model', () => {
  setupTestDB();
  test('Should have the correct fields and data types', async () => {
    const user = await User.create({
      username: 'andres@conexa.ai',
      password: '12345678',
      apiKey: 'ExKoHIq/bPSRFnpEb9JU5A0E60UXss6sV2fBw0FlHDY=',
      dateModified: new Date(),
      dateCreated: new Date(),
    });

    expect(user).toHaveProperty('username', 'andres@conexa.ai');
    expect(user).toHaveProperty('password', '12345678');
    expect(user).toHaveProperty('apiKey', 'ExKoHIq/bPSRFnpEb9JU5A0E60UXss6sV2fBw0FlHDY=');
    expect(user).toHaveProperty('dateModified', expect.any(Date));
    expect(user).toHaveProperty('dateCreated', expect.any(Date));
  });
});
