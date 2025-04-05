import { Types } from 'mongoose';

export type TAdminName = {
  firstName: string;
  secoundName?: string;
  lastName: string;
};

export type TAdmin = {
  id: string;
  user: Types.ObjectId;
  name: TAdminName;
  designation: string;
  gender: 'male' | 'female ';
  DOB: Date;
  email: string;
  contactNo: number;
  emergencyContact: number;
  presentAddress: string;
  parmanentAddress : string;
  profileImage?: string;
  managmentDeparment?: Types.ObjectId;
  academicFaculty: Types.ObjectId;
  isDeleted: boolean;
};
