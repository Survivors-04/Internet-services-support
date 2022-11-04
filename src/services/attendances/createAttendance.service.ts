import { AppDataSource } from "../../data-source";
import { Attendance } from "../../entities/attendance.entity";
import { IAttendanceRequest } from "../../interfaces/attendances";

export const createAttendanceService = async (data:IAttendanceRequest):Promise<Attendance> => {

  const attendanceRepo = AppDataSource.getRepository(Attendance);

  const newAttendance = attendanceRepo.create(data);
  data.date = new Date();

  await attendanceRepo.save(newAttendance);

  return newAttendance;
};