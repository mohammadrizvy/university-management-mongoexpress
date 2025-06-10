import { TSchedules } from './offeredCourse.interface';

// TODO : Important concept must understand later !

export const hasTimeConflict = (
  assignedSchedules: TSchedules[],
  newSchedules: TSchedules,
) => {
  for (const shcedule of assignedSchedules) {
    const existingStartTime = new Date(`1970-01-01T${shcedule.startTime}`);
    const existingEndTime = new Date(`1970-01-01T${shcedule.endTime}`);
    const newStartTime = new Date(`1970-01-01T${newSchedules.startTime}`);
    const newEndTime = new Date(`1970-01-01T${newSchedules.endTime}`);

    if (newStartTime < existingEndTime && newEndTime > existingStartTime) {
      return true;
    }
  }

  return false;
};
