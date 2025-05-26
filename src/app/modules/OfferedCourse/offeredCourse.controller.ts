import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { offeredCourseServices } from "./offeredCourse.service";
import  httpStatus  from 'http-status';

const createOfferCourse = catchAsync(async (req , res , next) => {

    const result = await offeredCourseServices.createOfferedCourseIntoDb(req.body)

    sendResponse(res , {
        statusCode : httpStatus.CREATED,
        sucess : true,
        message : "Offered course created succesfully",
        data : result
    })
    
})



export const offeredCourseControllers = {
createOfferCourse
}