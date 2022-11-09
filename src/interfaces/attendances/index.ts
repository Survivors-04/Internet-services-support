
export interface IAttendanceRequest {
  collaboratorId: string;
  clientId: string;
  serviceId: string;
  date: Date;
};

export interface IAttendanceResponse extends IAttendanceRequest{
  id: string;
  is_active: boolean;
};
