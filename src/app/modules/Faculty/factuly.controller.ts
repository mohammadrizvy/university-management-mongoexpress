import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { FacultyServices } from "./faculty.service";
import httpStatus from 'http-status';

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
    const result = await FacultyServices.getSingleFacultyFromDB(factultyId),
    send

})


export const facultyController = {
    getFaculty,
    getSingleFaculty
}