import { Types } from 'mongoose';

export type TFacultyName = {
  firstName: string;
  secoundName?: string;
  lastName: string;
};

export type TFaculty = {
  id: string;
  user: Types.ObjectId;
  designation: string;
  name: TFacultyName;
  gender: 'male' | 'female';
  DOB: Date;
  email: string;
  contactNo: number;
  emergencyContact: number;
  presentAddress: string;
  profileImage?: string;
  academicDepartment: Types.ObjectId;
  academicFaculty: Types.ObjectId;
  isDeleted: boolean;
};
