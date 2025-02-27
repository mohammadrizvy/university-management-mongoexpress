import { model, Schema } from 'mongoose';
import { TacademicSemester, TacademicSemesterCode, TacademicSemesterName } from './academicSemester.interface';
import { AcademicSemesterCode, AcademicSemesterName, MonthList } from './academicSemester.const';


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
    type: String, 
    required: true
  },

  startMonth: { 
    type: String, 
    enum: MonthList, 
    required: true
  },

  endMonth: { 
    type: String, 
    enum: MonthList, 
    required: true
  },
},{
  timestamps : true
});

export const AcademicSemester = model<TacademicSemester>("academicSemester", academicSemesterSchema);
