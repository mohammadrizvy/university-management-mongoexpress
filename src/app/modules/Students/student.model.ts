import { Schema, model } from 'mongoose';
import {
  studentMethods,
  StudentModel,
  TGaurdian,
  TLocalGaurdian,
  TStudent,
  TUserName,
} from './student.interface';

const userNameSchema = new Schema<TUserName>({
  firstName: { type: String, required: true },
  secoundName: { type: String, required: false }, // Made explicitly not required
  lastName: { type: String, required: true },
});

const LocalGaurdianSchema = new Schema<TLocalGaurdian>({
  name: { type: String, required: true },
  occupation: { type: String, required: true },
  contactNo: { type: Number, required: true },
  address: { type: String, required: true },
});

const GaurdianSchema = new Schema<TGaurdian>({
  fatherName: { type: String, required: true },
  fatherOccupation: { type: String, required: true },
  fatherContactNumber: { type: String, required: true },
  motherName: { type: String, required: true },
  motherOccupation: { type: String, required: true },
  motherContactNumber: { type: String, required: true },
});

const studentSchema = new Schema<TStudent, StudentModel, studentMethods>({
  id: { type: String, required: true, unique: true },
  name: {
    type: userNameSchema,
    required: true,
  },
  gender: { type: String, enum: ['male', 'female'], required: true },
  contact: { type: Number, required: true },
  emergencyContact: { type: Number, required: true },
  email: { type: String, required: true },
  DOB: { type: String, required: true },
  bloodGroup: {
    type: String,
    enum: ['a+', 'ab+', 'a-', 'b+'],
    required: false,
  },
  presentAddress: { type: String, required: true },
  parmanentAddress: { type: String, required: true },
  gaurdian: GaurdianSchema,
  localGaurdian: LocalGaurdianSchema,
  profileImage: { type: String },
  isActive: {
    type: String,
    enum: ['active', 'inactive'],
    required: true,
  },
});

studentSchema.methods.isUserExists = async function (id: string) {
  const existingUser = await Student.findOne({ id });
  return existingUser;
};

export const Student = model<TStudent , StudentModel>('Student', studentSchema);
