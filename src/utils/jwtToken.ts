import { verify, sign } from 'jsonwebtoken';

//move to env file
const SECRET_KEY = 'eZTdFm9@0qp-+s#F9A3nQI6XTwNRGKLX';

export const decodeToken = (token: string): Partial<{ email: string; role: string }> => {
  const decodedToken = verify(token, SECRET_KEY);  
  return decodedToken as Partial<{ email: string; role: string }>;
};

export const createToken = (payload: { email: string; role: string }): string => {
  const token = sign(payload, SECRET_KEY, { expiresIn: '1h' });
  return token;
};