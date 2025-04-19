import { flatten } from 'flat';
import { TAdmin } from './admin.interface';
import { Admin } from './admin.model';
import mongoose from 'mongoose';
import { AppError } from '../../Errors/AppErrors';
import httpStatus from 'http-status';
import { User } from '../user/user.model';

const getAdminFromDB = async () => {
  const result = await Admin.find();
  return result;
};

const getSingleAdminFromDB = async (id: string) => {
  const result = await Admin.findOne({ id });

  return result;
};

const updateAdminIntoDB = async (id: string, payload: Partial<TAdmin>) => {
  const flatModule = await import('flat');
  const flatten = flatModule.flatten;
  const updatedData: Record<string, unknown> = await flatten(payload);

  console.log(updatedData);

  const result = await Admin.findOneAndUpdate({ id }, updatedData, {
    new: true,
    runValidators: true,
  });

  return result;
};

const deleteAdminFromDB = async (id: string) => {
  console.log(id, 'Form service');

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const deleteAdmin = await Admin.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, runValidators: true, session },
    );
    if (!deleteAdmin) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Faild to delete admin');
    }

    const deleteUser = await User.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, runValidators: true, session },
    );
    if (!deleteUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Faild to delete user');
    }

    await session.commitTransaction();
    await session.endSession();

    return deleteAdmin;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, 'Fail to delete admin');
  }
};

export const adminService = {
  getAdminFromDB,
  getSingleAdminFromDB,
  updateAdminIntoDB,
  deleteAdminFromDB,
};
