import { verify } from 'jsonwebtoken';

export const decodeToken = (token: string): Partial<{ email: string; role: string }> => {
  const decodedToken = verify(token, 'eZTdFm9@0qp-+s#F9A3nQI6XTwNRGKLX');
  return decodedToken as Partial<{ email: string; role: string }>;
};
