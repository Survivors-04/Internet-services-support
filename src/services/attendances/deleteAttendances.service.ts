import { AppDataSource } from "../../data-source";
import { Attendance } from "../../entities/attendance.entity";
import { AppError } from "../../errors/appError";

export const deleteAttendancesService = async (id:string):Promise<{
  message:string;
}> => {
 
  const attendanceRepo = AppDataSource.getRepository(Attendance);
  const attendanceToBeDeleted = await attendanceRepo.findOneBy({ id:id });

  if( !attendanceToBeDeleted ){
    throw new AppError("Attendance not information not found, maybe it not exists!", 404);
  };

<<<<<<< Updated upstream
  await attendanceRepo.update(id,{ isActive: false });
=======
  await attendanceRepo.update(id,{ is_active: false });
  
>>>>>>> Stashed changes
  return {message: "Attendance was deleted"};

};