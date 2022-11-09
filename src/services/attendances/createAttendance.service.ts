import { AppDataSource } from "../../data-source";
import { Attendance } from "../../entities/attendance.entity";
import { Client } from "../../entities/client.entity";
import { Collaborator } from "../../entities/collaborator.entity";
import { Services } from "../../entities/services.entity";
import { IAttendanceRequest, IAttendanceResponse } from "../../interfaces/attendances";

export const createAttendanceService = async (
  data: IAttendanceRequest
): Promise<IAttendanceResponse> => {
  const attendanceRepo = AppDataSource.getRepository(Attendance);
  const clientsRepo    = AppDataSource.getRepository(Client);
  const collaborRepo   = AppDataSource.getRepository(Collaborator);
  const servicesRepo   = AppDataSource.getRepository(Services);

  const { clientId, collaboratorId, date, serviceId } = data;

  const client =       await clientsRepo.findOneBy({ id: clientId });
  const collaborator = await collaborRepo.findOneBy({ id: collaboratorId });
  const service =      await servicesRepo.findOneBy({ id: serviceId });
 
  const newAttendance  = attendanceRepo.create({
    client:{
      id:           client?.id,
      cpf:          client?.cpf,
      name:         client?.name,
      email:        client?.email,
      is_active:    client?.is_active,
      client_plan:  client?.client_plan,
      telephone:    client?.telephone,
      updated_date: client?.updated_date,
      attendance:   client?.attendance,
      created_date: client?.created_date, 
    },
    date: date,
    service: {
      id:          service?.id,
      name:        service?.name,
      description: service?.description
    },
    collaborator: {
      id:          collaborator?.id,
      name:        collaborator?.name,
      email:       collaborator?.email,
      cpf:         collaborator?.cpf,
      team:        collaborator?.team,
      telephone:   collaborator?.telephone
    },
  });

  
  await attendanceRepo.save(newAttendance);
  
  const { 
    collaborator: collab, 
    service:      serv, 
    client:       clnt, 
    date:         dte, 
    id, 
  } = newAttendance;

  const attendanceResponse: IAttendanceResponse = {
    id:             id,
    date:           dte,
    clientId:       clnt.id,
    serviceId:      serv.id,
    collaboratorId: collab.id
  }

  return attendanceResponse;
};
