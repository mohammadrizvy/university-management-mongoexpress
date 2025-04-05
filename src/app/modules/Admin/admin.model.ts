import { model, Schema, Types } from 'mongoose';
import { TAdmin, TAdminName } from './admin.interface';
import { boolean } from 'zod';

const adminNameSchema = new Schema<TAdminName>({
  firstName: { type: String },
  secoundName: { type: String },
  lastName: { type: String },
});

const adminSchema = new Schema<TAdmin>(
  {
    id: { types: String, unique: true },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    name: adminNameSchema,
    designation: { type: String },
    gender: { type: String, enum: ['male', 'female'] },
    DOB: { types: Date },
    email: { type: String },
    contactNo: { type: Number },
    emergencyContact: { type: Number },
    presentAddress: { type: String },
    parmanentAddress: { type: String },
    profileImage: { type: String },
    managmentDeparment: { types: Schema.Types.ObjectId, required: false },
    academicFaculty: { type: Schema.Types.ObjectId, ref: 'AcademicFaculty' },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export const Admin = model<TAdmin>('Admin', adminSchema);
