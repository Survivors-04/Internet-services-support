export interface IClientRequest {
  name: string;
  cpf: string;
  telephone: string;
  email: string;
  password?: string;
}

export interface IClient {
  id: string;
  name: string;
  cpf: string;
  email: string;
  telephone: string;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
}

export interface IClientUpdate {
  telephone?: string;
  email?: string;
  password?: string;
  isActive?: boolean;
}
