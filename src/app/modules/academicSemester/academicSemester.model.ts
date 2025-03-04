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

academicSemesterSchema.pre("save", async function (next){

  const isSemesterExists = await AcademicSemester.findOne({
    year : this.year,
    name : this.name ,
  })

  if(isSemesterExists){
    throw new Error ("Semester is already exists !")
  }next() 
  
})


export const AcademicSemester = model<TacademicSemester>("academicSemester", academicSemesterSchema);


// testing all project 