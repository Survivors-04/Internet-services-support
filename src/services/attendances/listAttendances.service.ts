import { AppDataSource } from "../../data-source";
import { Attendance } from "../../entities/attendance.entity";
import { Collaborator } from "../../entities/collaborator.entity";
import { AppError } from "../../errors/appError";
import { IAttendanceResponse } from "../../interfaces/attendances";

export const listAttendancesService = async ( id:string ) =>{

  const attendancesRepo = AppDataSource.getRepository(Attendance);
  const collaboratorsRepo = AppDataSource.getRepository(Collaborator);

  if (id) {
  
    const attendance   = await attendancesRepo.findOneBy({ id });
    const collaborator = await collaboratorsRepo.findOneBy({ id });
    

    if ( attendance ) return attendance;

    if ( collaborator ) return collaborator.attendance;

    throw new AppError("Attendance information not found!",404);
  };

  const attendances = await attendancesRepo.find();
  
    return attendances;

};