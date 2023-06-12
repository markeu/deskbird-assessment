import jwt from 'jsonwebtoken';

export const decodeToken = (token: string): Partial< { email: string, role: string }> => {
    const decodedToken = jwt.verify(token, 'eZTdFm9@0qp-+s#F9A3nQI6XTwNRGKLX');
    return decodedToken as Partial<{ email: string, role: string }>;
  };
  


