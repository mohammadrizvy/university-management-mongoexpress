import { model, Schema } from 'mongoose';
import { TUser, UserModel } from './user.interface';
import config from '../../config';
import bcrypt from 'bcrypt';
import { UserStatus } from './user.const';

const userSchema = new Schema<TUser, UserModel>(
  {
    id: { type: String },
    email: { type: String, unique: true },
    password: { type: String, select: 0 },
    needsPasswordChange: { type: Boolean, default: true },
    passwordChangeAt: { type: Date },
    role: { type: String, enum: ['admin', 'student', 'faculty'] },
    status: {
      type: String,
      enum: UserStatus,
      default: 'in-progress',
    },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true },
);

// Document middlewares
userSchema.pre('save', async function (this: TUser, next) {
  try {
    if (!this.password) {
      throw new Error('password is required');
    }
    this.password = await bcrypt.hash(this.password, Number(config.salt_round));
    next();
  } catch (err: any) {
    next(err); //* password  the error to the next middleware
  }
});

userSchema.post('save', async function (doc, next) {
  doc.password = '';
  next();
});

userSchema.statics.isUserExistsByCustomId = async function (id: string) {
  return await User.findOne({ id }).select('+password');
};
userSchema.statics.isUserDeletedByCustomId = async function (id: string) {
  const user = await User.findOne({ id });
  return user?.isDeleted || false;
};
userSchema.statics.isUserBlockedByCustomId = async function (id: string) {
  const user = await User.findOne({ id });
  return user?.status === 'blocked';
};
userSchema.statics.isPasswordMatch = async function (
  plainTextPassword,
  hashedPassword,
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

userSchema.statics.isJWTIssuedBeforePasswordChange = async function (
  passwordChangeTimeStamp: Date,
  jwtIssuedTimeStamp: number,
) {
  const passwordChangeTime = new Date(passwordChangeTimeStamp).getTime() / 1000;

  console.log(passwordChangeTimeStamp, jwtIssuedTimeStamp, passwordChangeTime);

  return jwtIssuedTimeStamp < passwordChangeTime;
};

export const User = model<TUser, UserModel>('User', userSchema);
