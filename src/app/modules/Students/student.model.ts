import { Schema, model } from 'mongoose';
import {
  StudentModel,
  TGaurdian,
  TLocalGaurdian,
  TStudent,
  TUserName,
} from './student.interface';

import bcrypt from 'bcrypt';
import config from '../../config';

const userNameSchema = new Schema<TUserName>(
  {
    firstName: { type: String },
    secoundName: { type: String, required: false }, // Made explicitly not required
    lastName: { type: String },
  },
  { _id: false },
);

const LocalGaurdianSchema = new Schema<TLocalGaurdian>(
  {
    name: { type: String },
    occupation: { type: String },
    contactNo: { type: Number },
    address: { type: String },
  },
  { _id: false },
);

const GaurdianSchema = new Schema<TGaurdian>(
  {
    fatherName: { type: String },
    fatherOccupation: { type: String },
    fatherContactNumber: { type: String },
    motherName: { type: String },
    motherOccupation: { type: String },
    motherContactNumber: { type: String },
  },
  { _id: false },
);

// *For custom method it will have
const studentSchema = new Schema<TStudent, StudentModel>({
  id: { type: String, unique: true },
  pass: { type: String},
  name: userNameSchema,
  gender: { type: String, enum: ['male', 'female'] },
  contact: { type: Number },
  emergencyContact: { type: Number },
  email: { type: String },
  DOB: { type: String },
  bloodGroup: {
    type: String,
    enum: ['a+', 'ab+', 'a-', 'b+'],
    required: false,
  },
  presentAddress: { type: String },
  parmanentAddress: { type: String },
  gaurdian: GaurdianSchema,
  localGaurdian: LocalGaurdianSchema,
  profileImage: { type: String },
  isActive: {
    type: String,
    enum: ['active', 'inactive'],
  },
});

// !Applying middlewares / hooks

studentSchema.pre('save', async function (this: TStudent, next) {
  try {
    if (!this.pass) {
      throw new Error('Password is required');
    }
    this.pass = await bcrypt.hash(this.pass, Number(config.salt_round));
    next();
  } catch (err: any) {
    next(err); // Pass the error to the next middleware
  }
});

studentSchema.post('save', async function (doc, next) {
  doc.pass = '';
  next();
});

// ! creating statics function
studentSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Student.findOne({ id });
  return existingUser;
};

// ! creatin a custom instance method
// studentSchema.methods.isUserExists = async function (id: string) {
//   const existingUser = await Student.findOne({ id });
//   return existingUser;
// };

export const Student = model<TStudent, StudentModel>('Student', studentSchema);
