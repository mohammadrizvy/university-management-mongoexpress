

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

export type TacademicSemester = {
    name : "Autum" | "Summer" | "Fall",
    code : "01" | "04" | "03",
    year : Date ,
    startMonth :  Months,
    endMonth : Months 
}