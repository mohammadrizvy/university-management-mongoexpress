import { model, Schema } from 'mongoose';
import { TacademicSemester } from './academicSemester.interface';

const academicSemesterSchema = new Schema<TacademicSemester>({
  name: { type: String, enum: ['Autumn', 'Summer', 'Fall'] },

  code: { type: String, enum: ['01', '02', '03'] },
  year: { type: Date },
  startMonth: {
    type: String,
    enum: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
  },

  endMonth: {
    type: String,
    enum: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
  },
});

export const AcademicSemester = model<TacademicSemester>("academicSemester" , academicSemesterSchema)
