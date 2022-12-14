export interface IClientRequest {
  name: string;
  cpf: string;
  telephone: string;
  email: string;
  password?: string;
  is_active?: boolean;
}

export interface IClient {
  id: string;
  name: string;
  cpf: string;
  email: string;
  telephone: string;
  password: string;
  created_date: Date;
  updated_date: Date;
  is_active: boolean;
}

export interface IClientUpdate {
  name?: string;
  telephone?: string;
  email?: string;
  password?: string;
}

export interface IClientLogin {
  email: string;
  password: string;
}

export interface IAddingOrRemovingPlanToClient {
  internet_plan_id: string;
}
