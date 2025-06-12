import { JwtPayload } from 'jsonwebtoken';

declare global {
  import { Request } from 'express';
  namespace Express {
    interface Request {
      user: JwtPayload;
    }
  }
}
