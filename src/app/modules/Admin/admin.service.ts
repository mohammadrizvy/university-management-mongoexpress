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

  console.log(id , payload , "From service")



};

export const adminService = {
  getAdminFromDB,
  getSingleAdminFromDB,
  updateAdminIntoDB
};
