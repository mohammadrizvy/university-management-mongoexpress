import { Types } from 'mongoose';

export type TAdmin = {
  id: string;
  user: Types.ObjectId;
  designation: string;
  name: {
    firstName: string;
    middleName?: string;
    lastName: string;
  };
  gender: 'male' | 'female';
  email: string;
  dateOfBirth: string;
  contactNo: string;
  emergencyContactNo: string;
  presentAddress: string;
  permanentAddress: string;
  managmentDeparment?: Types.ObjectId;
  academicFaculty: Types.ObjectId;
  profileImage?: string;
  isDeleted?: boolean;
};
