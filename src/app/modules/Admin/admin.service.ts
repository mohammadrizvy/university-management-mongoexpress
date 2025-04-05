import { Admin } from './admin.model';

const getAdminFromDB = async () => {
  const result = await Admin.find();
  return result;
};

export const adminService = {
  getAdminFromDB,
};
