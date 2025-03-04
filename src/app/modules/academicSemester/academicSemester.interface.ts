

export type Months = | "January"
| "February"
| "March"
| "April"
| "May"
| "June"
| "July"
| "August"
| "September"
| "October"
| "November"
| "December";


export type TacademicSemesterName = "Autumn" | "Summer" | "Fall";

export type TacademicSemesterCode = "01" | "02" | "03";

export type TacademicSemester = {
    name: TacademicSemesterName,
    code: TacademicSemesterCode,
    year: string,
    startMonth: Months,
    endMonth: Months
};

export type TacademicSemesterNameCodeMapper = {
    [Key: string]: string;
  };