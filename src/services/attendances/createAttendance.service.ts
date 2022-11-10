import { AppDataSource } from "../../data-source";
import { Attendance } from "../../entities/attendance.entity";
import { Client } from "../../entities/client.entity";
import { Collaborator } from "../../entities/collaborator.entity";
import { Services } from "../../entities/services.entity";
import { AppError } from "../../errors/appError";
import { IAttendanceRequest, IAttendanceResponse } from "../../interfaces/attendances";

export const createAttendanceService = async (
  data: IAttendanceRequest
): Promise<IAttendanceResponse> => {
  const attendanceRepo = AppDataSource.getRepository(Attendance);
  const clientsRepo    = AppDataSource.getRepository(Client);
  const collaborRepo   = AppDataSource.getRepository(Collaborator);
  const servicesRepo   = AppDataSource.getRepository(Services);

  const { clientId, collaboratorId, serviceId } = data;

  const client =       await clientsRepo.findOneBy({ id: clientId });
  const collaborator = await collaborRepo.findOneBy({ id: collaboratorId });
  const service =      await servicesRepo.findOneBy({ id: serviceId });
  
  if(!client) throw new AppError("Client id is invalid",404);
  if(!collaborator) throw new AppError("Collaborator id is invalid",404);
  if(!service) throw new AppError("Service id is invalid",404);

  const newAttendance = attendanceRepo.create({
    client: client, 
    collaborator: collaborator, 
    service: service
  });

  await attendanceRepo.save(newAttendance);
  
  const attendanceResponse: IAttendanceResponse = {
    clientId:       newAttendance.client.id,
    collaboratorId: newAttendance.collaborator.id,
    serviceId:      newAttendance.service.id,
    date:           newAttendance.date,
    id:             newAttendance.id,
    is_active:      newAttendance.is_active
  };

  return attendanceResponse;
};
