import { Types } from "mongoose"

export type TSemesteRegistration = {
    academicSemester : Types.ObjectId; 
    status : "UPCOMING" | "ONGOING" | "ENDED",
    startDate : Date;
    endDate : Date ; 
    minCredit : number; 
    maxCredit : number;
    createdAt  : Date ;
    updatedAt : Date ; 
}