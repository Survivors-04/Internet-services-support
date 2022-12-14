export interface ISupervisorsRequest {
  name: string;
  email: string;
  password: string;
  cpf: string;
  telephone: string;
  is_manager: boolean;
}

export interface ISupervisorsLogin {
  email: string;
  password: string;
}

export interface ICreateSupervisorRequest {
  name: string;
  cpf: string;
  telephone: string;
  email: string;
  isManager: boolean;
  password: string;
}

export interface IUpdateSupervisorRequest {
  id: string;
  telephone: string;
  email: string;
  is_manager: boolean;
  password: string;
}

export interface ISupervisor {
  id: string;
  name: string;
  email: string;
  password: string;
  cpf: string;
  telephone: string;
  is_manager: boolean;
  is_active: boolean;
}

export interface ISupervisorsUpdate {
  id?: string;
  name?: string;
  email?: string;
  password?: string;
  telephone?: string;
  is_manager?: boolean;
  is_active?: boolean;
}

export interface IManager {}

export interface IManagerLogin {}
