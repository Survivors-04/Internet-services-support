import { AppDataSource } from "../../data-source";
import { Attendance } from "../../entities/attendance.entity";
import { AppError } from "../../errors/appError";

export const deleteAttendancesService = async (id:string):Promise<{
  message:string;
}> => {
 
  const attendanceRepo = AppDataSource.getRepository(Attendance);
  const attendanceToBeDeleted = await attendanceRepo.findOneBy({ id:id });

  if( !attendanceToBeDeleted ){
    throw new AppError("Attendance information not found, maybe it not exists!", 404);
  };
  if( attendanceToBeDeleted.is_active === false) {
    throw new AppError("Attendance already was deleted!");
  };

  await attendanceRepo.update(id,{ is_active: false });
  const wasDeleted = attendanceRepo.findOneBy({ id:id });
  
  
  return {message: "Attendance was deleted"};

};