export interface ISupervisorsRequest {
    name: string;
    email: string;
    password: string;
    cpf: number;
    telephone: number;
    is_manager: boolean;
}

export interface ICreateSupervisorRequest {
    name: string,
    cpf: string,
    telephone: string,
    email: string,
    isManager: boolean,
    password: string
}