import jwt, { JwtPayload, Secret } from 'jsonwebtoken';
import config from '../../config';

export const createToken = (
  jwtPayload: {
    userId: string;
    role: string;
  },
  secret: Secret,
  expiresIn: string,
) => {
  return jwt.sign(jwtPayload, secret, {
    expiresIn,
  } as jwt.SignOptions);
};


export const verifyToken = (token: string, secret: string) => {

  return jwt.verify(
    token,
    secret
  ) as JwtPayload;

}