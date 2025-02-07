import { Schema, model } from 'mongoose';
import {
  studentMethods,
  StudentModel,
  TGaurdian,
  TLocalGaurdian,
  TStudent,
  TUserName,
} from './student.interface';

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

const studentSchema = new Schema<TStudent, StudentModel, studentMethods>({
  id: { type: String, unique: true },

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

studentSchema.methods.isUserExists = async function (id: string) {
  const existingUser = await Student.findOne({ id });
  return existingUser;
};

export const Student = model<TStudent, StudentModel>('Student', studentSchema);
