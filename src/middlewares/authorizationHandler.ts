import { Request, Response, NextFunction } from 'express';
import { decodeToken } from '../utils/decipherToken';
import { ApplicationError } from '../utils/ApiError';
import { JsonWebTokenError } from 'jsonwebtoken';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      headers: { authorization },
    } = req;

    if (!authorization) {
      throw new ApplicationError('No authorization header provided');
    }

    const token = authorization.split(' ')[1];
    const tokenData = decodeToken(token);

    if (!tokenData || !tokenData.email || !tokenData.role) {
      throw new ApplicationError('Invalid token');
    }

    const { email, role } = tokenData;
    req.user = { email, role };
    next();
  } catch (err) {
    if (err instanceof ApplicationError) {
      res.status(err.statusCode).json({ status: false, error: err.message });
    } else if (err instanceof JsonWebTokenError) {
      res.status(400).json({ status: false, error: err.message });
    } else {
      console.log(err);
      res.status(500).json({ status: false, error: 'Internal Server Error' });
    }
  }
};
