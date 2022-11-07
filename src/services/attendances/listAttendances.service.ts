import { AppDataSource } from "../../data-source";
import { Attendance } from "../../entities/attendance.entity";
import { Collaborator } from "../../entities/collaborator.entity";
import { AppError } from "../../errors/appError";

export const listAttendancesService = async ( id:string ):Promise<Attendance | Attendance[]>  =>{

  const attendancesRepo = AppDataSource.getRepository(Attendance);
  const collaboratorsRepo = AppDataSource.getRepository(Collaborator);

  if( id ){
  
    const attendance = await attendancesRepo.findOneBy({ id:id });
    const collaborator = await collaboratorsRepo.findOneBy({ id:id });

    if ( attendance ) return attendance;

    if( collaborator ) return collaborator?.attendance;

    throw new AppError("Attendance information not found!",404);
  };

  const attendances = await attendancesRepo.find();
  
  return attendances;
};