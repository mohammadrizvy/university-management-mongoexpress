// import { Schema, model, connect } from 'mongoose';
// 1. Create an interface representing a document in MongoDB.
export type Gaurdian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNumber: string;
  motherName: string;
  motherOccupation: string;
  motherContactNumber: string;
};

export type UserName = {
  firstName: string;
  secoundName: string;
  lastName: string;
};

export type LocalGaurdian = {
  name: string;
  occupation: string;
  contactNo: number;
  address: string;
};

export type Student = {
  id: string;
  name: UserName;
  gender: 'male' | 'female';
  contact: number;
  emergencyContact: number;
  email: string;
  DOB: string;
  bloodGroup?: 'a+' | 'ab+' | 'a-' | 'b+';
  presentAddress: string;
  parmanentAddress: string;
  gaurdian: Gaurdian;
  localGaurdian: LocalGaurdian;
  profileImage?: string;
  isActive: 'active' | 'inactive';
};
