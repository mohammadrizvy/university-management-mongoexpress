import catchAsync from "../../utils/catchAsync";
import { FacultyServices } from "./faculty.service";
import httpStatus from 'http-status';
import sendResponse from './../../utils/sendResponse';

const getFaculty = catchAsync(async (req, res, next) => {
    const result = await FacultyServices.getFacultyFromDB()
    sendResponse(res, {
        sucess: true,
        statusCode: httpStatus.FOUND,
        message: "Faculties retrived sucessfully",
        data: result,
    })
})

const getSingleFaculty = catchAsync(async (req, res, next) => {
    const factultyId = req.params.facultyId
    console.log(factultyId, "From controller")
    const result = await FacultyServices.getSingleFacultyFromDB(factultyId)
    sendResponse(res , {
        sucess : true ,
        statusCode : httpStatus.FOUND,
        message : "Single faculty retrived sucessfully",
        data : result
    })
    
})


export const facultyController = {
    getFaculty,
    getSingleFaculty
}