import { Model, Types } from 'mongoose';

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
  user : Types.ObjectId; 
  pass : string; 
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
  isDeleted : boolean
};

// ! creating statics function

export interface StudentModel extends Model<TStudent> {
  isUserExists(id: string): Promise<TStudent | null>;
}

// !custom instance method
// export type studentMethods = {
//   // eslint-disable-next-line no-unused-vars
//   isUserExists(id: string): Promise<TStudent | null >;
//   // ?So this method will find the data by and id and it will return a promiss of stdent data so we need to set student type as for the use ;
// };

// export type StudentModel = Model<TStudent, object, studentMethods>;
