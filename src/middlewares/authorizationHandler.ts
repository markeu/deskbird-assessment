import { Request, Response, NextFunction } from 'express';

import { decodeToken } from '../utils/jwtToken';
import { ApplicationError } from '../utils/ApiError';

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
    next(err);
  }
};
