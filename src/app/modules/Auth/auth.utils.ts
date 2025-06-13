import jwt, { Secret } from 'jsonwebtoken';

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
