// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Request } from 'express';

declare module 'express-serve-static-core' {
  interface Request {
    user: {
      email: string;
      role: string;
    };
  }
}
