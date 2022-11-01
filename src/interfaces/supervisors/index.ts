export interface ISupervisorsRequest {
  name: string;
  email: string;
  password: string;
  cpf: number;
  telephone: number;
  is_manager: boolean;
}

export interface ISupervisorsLogin {
  email: string;
  password: string;
}

export interface IManager {
    
}

export interface IManagerLogin {

}