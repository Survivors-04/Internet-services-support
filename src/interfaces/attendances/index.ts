
export interface IAttendanceRequest {
  collaboratorId: string;
  clientId: string;
  serviceId: string;
};

export interface IAttendanceResponse extends IAttendanceRequest{
  id: string;
  is_active: boolean;
  date: Date;
};
