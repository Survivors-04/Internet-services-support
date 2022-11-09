import { AppDataSource } from "../../data-source";
import { Attendance } from "../../entities/attendance.entity";
import { Collaborator } from "../../entities/collaborator.entity";
import { AppError } from "../../errors/appError";
import { IAttendanceResponse } from "../../interfaces/attendances";

export const listAttendancesService = async ( id:string ):Promise<IAttendanceResponse | IAttendanceResponse[]>  =>{

  const attendancesRepo = AppDataSource.getRepository(Attendance);
  const collaboratorsRepo = AppDataSource.getRepository(Collaborator);

  const padronizeAttendanceResponse = (attendance:Attendance):IAttendanceResponse =>{

    const {client, collaborator, date, id, service } = attendance;

    const padronizedResponse:IAttendanceResponse = {
      id:             id,
      date:           date,
      clientId:       client.id,
      serviceId:      service.id,
      collaboratorId: collaborator.id,

    };

    return padronizedResponse;
  };

  if( id ){
  
    const attendance   = await attendancesRepo.findOneBy({ id:id });
    const collaborator = await collaboratorsRepo.findOneBy({ id:id });

    if ( attendance ) {
      const att:IAttendanceResponse = padronizeAttendanceResponse(attendance);
      return att;
    };

    if( collaborator ){ 
      const { attendance } = collaborator;
      const atts:IAttendanceResponse[] = attendance.map( att => padronizeAttendanceResponse(att) );
      return atts;
    };

    throw new AppError("Attendance information not found!",404);
  };

  const attendances = await attendancesRepo.find();
  const attdcs = attendances.map(attdc => padronizeAttendanceResponse(attdc)); 

  return attdcs;
};