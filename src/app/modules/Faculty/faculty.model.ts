import { model, Schema } from 'mongoose';
import { TFaculty, TFacultyName } from './faculty.interface';

const facultyNameSchema = new Schema<TFacultyName>({
  firstName: {
    type: String,
  },
  secoundName: {
    type: String,
  },
  lastName: {
    type: String,
  },
});

const facultySchema = new Schema<TFaculty>(
  {
    id: { type: String, unique: true },
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      query: true,
      ref: 'User',
    },
    designation : {
      type: String,
    },
    name: facultyNameSchema,
    gender: {
      type: String,
      enum: ['male', 'female'],
    },
    DOB: { type: Date },
    contactNo: { type: Number },
    emergencyContact: { type: Number },
    email: { type: String },
    presentAddress: {
      type: String,
    },
    profileImage: {
      type: String,
    },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicSemester',
    },
    academicFaculty: { type: Schema.Types.ObjectId, ref: 'AcademicFaculty' },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

export const Faculty = model<TFaculty>('Faculty', facultySchema);
