import { Schema, model } from 'mongoose';
import {
  StudentModel,
  TGaurdian,
  TLocalGaurdian,
  TStudent,
  TUserName,
} from './student.interface';

const userNameSchema = new Schema<TUserName>(
  {
    firstName: { type: String },
    secoundName: { type: String, required: false }, // Made explicitly not required
    lastName: { type: String },
  },
  { _id: false },
);

const LocalGaurdianSchema = new Schema<TLocalGaurdian>(
  {
    name: { type: String },
    occupation: { type: String },
    contactNo: { type: Number },
    address: { type: String },
  },
  { _id: false },
);

const GaurdianSchema = new Schema<TGaurdian>(
  {
    fatherName: { type: String },
    fatherOccupation: { type: String },
    fatherContactNumber: { type: String },
    motherName: { type: String },
    motherOccupation: { type: String },
    motherContactNumber: { type: String },
  },
  { _id: false },
);

const studentSchema = new Schema<TStudent, StudentModel>(
  {
    id: { type: String, unique: true },
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      unique: true,
      // * For refencing the user
      ref: 'User',
    },
    name: userNameSchema,
    gender: { type: String, enum: ['male', 'female'] },
    contact: { type: Number },
    emergencyContact: { type: Number },
    email: { type: String },
    DOB: { type: Date },
    bloodGroup: {
      type: String,
      enum: ['a+', 'ab+', 'a-', 'b+'],
      required: false,
    },
    presentAddress: { type: String },
    parmanentAddress: { type: String },
    gaurdian: GaurdianSchema,
    localGaurdian: LocalGaurdianSchema,
    admissionSemester: { type: Schema.Types.ObjectId, ref: 'AcademicSemester' },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicDepartment',
    },
    profileImage: { type: String },

    isDeleted: {
      type: Boolean,
      default: false,
    },
    
    
  },
  
  {
    toJSON: {
      virtuals: true,
    },
    timestamps: true,
  },
);

// !Applying middlewares / hooks

//* Query middlewares

studentSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  // this.find({isDeleted : {$eq : true}})
  next();
});
studentSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  // this.find({isDeleted : {$eq : true}})
  next();
});
// ?You can also use it in aggregate
studentSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

// !Virtual
studentSchema.virtual('fullName').get(function () {
  return `${this.name.firstName} ${this.name.secoundName} ${this.name.lastName}`;
});

// ! creating statics function
studentSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Student.findOne({ id });
  return existingUser;
};

// ! creatin a custom instance method
// studentSchema.methods.isUserExists = async function (id: string) {
//   const existingUser = await Student.findOne({ id });
//   return existingUser;
// };

export const Student = model<TStudent, StudentModel>('Student', studentSchema);
