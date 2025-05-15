import { model, Schema } from 'mongoose';
import { TSemesteRegistration } from './semisterRegistration.interface';
import { SemesterRegistrationStatus } from './semesterRegistration.const';

const semesterRegistrationSchema = new Schema<TSemesteRegistration>({
  academicSemester: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'AcademicSemester',
    unique: true,
  },
  status: {
    type: String,
    enum: SemesterRegistrationStatus,
    default: 'UPCOMING',
  },
  startDate : {type : Date , required : true},
  endDate : {type : Date , required : true},
  minCredit : {type : Number , default : 3},
  maxCredit : {type : Number , default : 16}
},{timestamps : true});

export const SemesterRegistration = model<TSemesteRegistration>(
  'semesterRegistration',
  semesterRegistrationSchema,
);
