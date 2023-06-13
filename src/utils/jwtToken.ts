import dotenv from 'dotenv';
import { verify, sign } from 'jsonwebtoken';

dotenv.config();

export const decodeToken = (token: string): Partial<{ email: string; role: string }> => {
  const decodedToken = verify(token, process.env.TOKEN_SECRET as string);
  return decodedToken as Partial<{ email: string; role: string }>;
};

export const createToken = (payload: { email: string; role: string }): string => {
  const token = sign(payload, process.env.TOKEN_SECRET as string, { expiresIn: '1w' });
  return token;
};
