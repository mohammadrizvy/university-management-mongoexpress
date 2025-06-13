import { Model } from 'mongoose';
import { USER_ROLE } from './user.const';
export interface TUser {
  id: string;
  password: string;
  needsPasswordChange: boolean;
  passwordChangeAt?: Date;
  role: 'admin' | 'student' | 'faculty';
  status: 'in-progress' | 'blocked';
  isDeleted: boolean;
}

export interface UserModel extends Model<TUser> {
  isUserExistsByCustomId(id: string): Promise<TUser>;
  isUserDeletedByCustomId(id: string): Promise<TUser>;
  isUserBlockedByCustomId(id: string): Promise<TUser>;
  isPasswordMatch(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<Boolean>;
  isJWTIssuedBeforePasswordChange(
    passwordChangeTimeStamp: Date,
    jwtIssuedTimeStamp: number,
  ): boolean;
}

export type TUserRole = keyof typeof USER_ROLE;
