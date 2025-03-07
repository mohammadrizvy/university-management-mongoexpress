import { model, Schema } from 'mongoose';
import config from '../../config';
import bcrypt from 'bcrypt';
import { TAcademicFaculty } from './academicFaculty.interface';

const academicFacultySchema = new Schema<TAcademicFaculty>(
  {
   name : {type : String , required : true , unique : true }
  },
  { timestamps: true },
);



export const academicFaculty = model<TAcademicFaculty>('academicFaculty', academicFacultySchema);
