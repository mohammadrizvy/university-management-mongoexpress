import { model, Schema } from 'mongoose';
import { TUser, UserModel } from './user.interface';
import config from '../../config';
import bcrypt from 'bcrypt';

const userSchema = new Schema<TUser, UserModel>(
  {
    id: { type: String },
    password: { type: String },
    needsPasswordChange: { type: Boolean, default: true },
    role: { type: String, enum: ['admin', 'student', 'faculty'] },
    status: {
      type: String,
      enum: ['in-progress', 'blocked'],
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
  return await User.findOne({ id });
};
userSchema.statics.isUserDeletedByCustomId = async function (id: string) {
  const user = await User.findOne({ id });
  return user?.isDeleted || false;
};

export const User = model<TUser, UserModel>('User', userSchema);
