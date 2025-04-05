import { Schema, model } from 'mongoose';
import { TAdmin } from './admin.interface';

const adminSchema = new Schema<TAdmin>(
  {
    id: {
      type: String,
      required: true,
      unique: true
    },
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      unique: true,
      ref: 'User'
    },
    designation: {
      type: String,
      required: true
    },
    name: {
      firstName: {
        type: String,
        required: true
      },
      middleName: {
        type: String
      },
      lastName: {
        type: String,
        required: true
      }
    },
    gender: {
      type: String,
      enum: ['male', 'female'],
      required: true
    },
    dateOfBirth: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    contactNo: {
      type: String,
      required: true
    },
    emergencyContactNo: {
      type: String,
      required: true
    },
    presentAddress: {
      type: String,
      required: true
    },
    permanentAddress: {
      type: String,
      required: true
    },
    managmentDeparment: {
      type: Schema.Types.ObjectId,
      ref: 'ManagementDepartment'
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicFaculty',
      required: true
    },
    profileImage: {
      type: String
    },
    isDeleted: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true
    }
  }
);

adminSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

export const Admin = model<TAdmin>('Admin', adminSchema);
