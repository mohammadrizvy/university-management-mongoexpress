import { flatten } from 'flat';
import { TAdmin } from './admin.interface';
import { Admin } from './admin.model';

const getAdminFromDB = async () => {
  const result = await Admin.find();
  return result;
};

const getSingleAdminFromDB = async (id: string) => {
  const result = await Admin.findOne({ id });

  return result;
};

const updateAdminIntoDB = async (id: string, payload: Partial<TAdmin>) => {

  const updatedData: Record<string, unknown> = flatten(payload);

  console.log(updatedData);

  const result = await Admin.findOneAndUpdate({ id }, updatedData, {
    new: true,
    runValidators: true,
  });

  

  return result;
};

export const adminService = {
  getAdminFromDB,
  getSingleAdminFromDB,
  updateAdminIntoDB,
};
