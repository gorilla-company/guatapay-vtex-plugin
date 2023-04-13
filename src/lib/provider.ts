import { authService } from 'guatapay-sdk';

const generateApiKey = async (username: string, password: string) => {
  const authToken = await authService.authenticate(username, password);
  const headers = {
    Authorization: `Bearer ${authToken}`,
    'Content-Type': 'application/json',
    'User-Agent': 'Guatapay VTEX',
  };
  const apiKey = await authService.getApiKey(username, { headers });
  return apiKey;
};

export { generateApiKey };
