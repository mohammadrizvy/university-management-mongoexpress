import { Admin } from './admin.model';

const getAdminFromDB = async () => {
  const result = await Admin.find();
  return result;
};

const getSingleAdminFromDB = async (id: string) => {
  console.log(id, 'From service');

  const result = await Admin.findOne({ id });

  return result;
};

export const adminService = {
  getAdminFromDB,
  getSingleAdminFromDB,
};
