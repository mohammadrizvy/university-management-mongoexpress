import { z } from "zod";


const createAcademicSemesterValidationSchema = z.object({
    name : z.enum(['Autumn', 'Summer', 'Fall']),
    code : z.enum(['01', '02', '03']),
    year : z.date(),
    startMonth : z.enum( [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ]),
    endtMonth : z.enum( [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ])
})


export const academicSemesterValidation = {
    createAcademicSemesterValidationSchema
}