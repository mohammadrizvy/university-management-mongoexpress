import { model, Schema } from 'mongoose';
import { Months, TacademicSemester, TacademicSemesterCode, TacademicSemesterName } from './academicSemester.interface';

const Months: Months[] = [
  'January', 'February', 'March', 'April', 'May', 'June', 'July', 
  'August', 'September', 'October', 'November', 'December'
];

const AcademicSemesterName: TacademicSemesterName[] = ["Autumn", "Summer", "Fall"];
const AcademicSemesterCode: TacademicSemesterCode[] = ["01", "02", "03"];

const academicSemesterSchema = new Schema<TacademicSemester>({
  name: { 
    type: String, 
    enum: AcademicSemesterName, 
    required: true
  },

  code: { 
    type: String, 
    enum: AcademicSemesterCode, 
    required: true
  },

  year: { 
    type: Date, 
    required: true
  },

  startMonth: { 
    type: String, 
    enum: Months, 
    required: true
  },

  endMonth: { 
    type: String, 
    enum: Months, 
    required: true
  },
});

export const AcademicSemester = model<TacademicSemester>("academicSemester", academicSemesterSchema);
