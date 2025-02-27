import { TacademicSemester } from "./academicSemester.interface"
import { AcademicSemester } from "./academicSemester.model"

const createAcademicSemesterIntoDB = async (payload : TacademicSemester) => {
 
    const reslut = await AcademicSemester.create(payload)
    return reslut
    

}

export const academicSemesterServices = {
    createAcademicSemesterIntoDB
}