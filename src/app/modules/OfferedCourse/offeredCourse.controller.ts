export type Days = "Sat" | "Sun" | "Mon" | "Tue" | "Wed" | "Thu" | "Fri"
import { Types } from 'mongoose';


export type TOfferedCourse = {

    SemesterRegistration : Types.ObjectId,
    academicSemester : Types.ObjectId,
    academicFaculty : Types.ObjectId,
    academicDepartment : Types.ObjectId,
    course: Types.ObjectId,
    faculty : Types.ObjectId,
    maxCapacity: number,
    section : number,
    day: Days,
    startTime: string,
    endTime: string, 

}