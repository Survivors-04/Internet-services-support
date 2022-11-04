import { AppDataSource } from "../../data-source";
import { Attendance } from "../../entities/attendance.entity";
import { AppError } from "../../errors/appError";

export const listAttendancesService = async ( id:string ):Promise<Attendance | Attendance[]>  =>{

  const attendancesRepo = AppDataSource.getRepository(Attendance);

  if( id ){
    const attendances = await attendancesRepo.findOneBy({ id:id });
    const attendancesCollaborator = await attendancesRepo.findBy({collaborator:{id:id}})

    if ( attendances ) return attendances;

    if( attendancesCollaborator ) return attendancesCollaborator;

    throw new AppError("Attendance information not found!",404);
  };

  const attendances = await attendancesRepo.find();
  
  return attendances;
};