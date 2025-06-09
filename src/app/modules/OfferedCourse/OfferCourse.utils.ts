import { TDays } from "./offeredCourse.interface"

export type TSchedules = {
    days: TDays,
    startTime: string;
    endTime: string;
}


const hasTimeConflict = (assignedSchedules : TSchedules[], schedules : TSchedules) => {


}