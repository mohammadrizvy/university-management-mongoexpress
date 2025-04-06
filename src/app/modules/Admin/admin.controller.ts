import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { adminService } from './admin.service';
import httpStatus from 'http-status';

const getAdmins = catchAsync(async (req, res, next) => {
  try {
    const result = await adminService.getAdminFromDB();

    sendResponse(res, {
      sucess: true,
      statusCode: httpStatus.FOUND,
      message: 'Admins retrived successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
});

const getSingleAdmin = catchAsync(async (req, res, next) => {
  try {
    const { adminId } = req.params;

    const result = await adminService.getSingleAdminFromDB(adminId);

    sendResponse(res, {
      sucess: true,
      statusCode: httpStatus.FOUND,
      message: 'Admin retrived successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
});

const updateAdmin = catchAsync(async (req, res, next) => {
  try {
    const {adminId} = req.params;
    const data = req.body

    console.log(adminId, data);

    const result = await adminService.updateAdminIntoDB(adminId, data)

    sendResponse(res, {
      sucess: true,
      statusCode: httpStatus.FOUND,
      message: 'Admin updated successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
});

export const adminController = {
  getAdmins,
  getSingleAdmin,
  updateAdmin,
};
