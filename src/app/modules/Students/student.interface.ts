// import { Schema, model, connect } from 'mongoose';

import { Model } from 'mongoose';

// 1. Create an interface representing a document in MongoDB.
export type TGaurdian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNumber: string;
  motherName: string;
  motherOccupation: string;
  motherContactNumber: string;
};

export type TUserName = {
  firstName: string;
  secoundName?: string; // Made optional with ?
  lastName: string;
};

export type TLocalGaurdian = {
  name: string;
  occupation: string;
  contactNo: number;
  address: string;
};

export type TStudent = {
  id: string;
  name: TUserName;
  gender: 'male' | 'female';
  contact: number;
  emergencyContact: number;
  email: string;
  DOB: string;
  bloodGroup?: 'a+' | 'ab+' | 'a-' | 'b+';
  presentAddress: string;
  parmanentAddress: string;
  gaurdian: TGaurdian;
  localGaurdian: TLocalGaurdian;
  profileImage?: string;
  isActive: 'active' | 'inactive';
};

// custom instance method
export type studentMethods = {
  // eslint-disable-next-line no-unused-vars
  isUserExists(id: string): Promise<TStudent | null >;
};

export type StudentModel = Model<TStudent, object, studentMethods>;
