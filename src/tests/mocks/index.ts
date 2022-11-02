import { ISupervisorsLogin, ISupervisorsRequest } from "../../interfaces/supervisors";
import { ICollaborator } from "../../interfaces/collaborator";
import { IInternetPlan } from "../../interfaces/internetPlan";

export const mockedSupervisor: ISupervisorsRequest = {
  name: "Teste",
  email: "teste@mail.com",
  password: "Teste123",
  cpf: 12345678901,
  telephone: 13984512783,
  is_manager: false,
};

export const mockedInternetPlans: IInternetPlan = {
  name: "Teste",
  description: "Teste123",
  price: 400.0,
};

export const mockedCollaborator:ICollaborator = {
  name: "Teste",
  cpf: "12345678901",
  telephone: "13984512783",
  email: "teste@mail.com",
  password: "Teste123",
  is_Active: true
};

export const mockedSupervisorLogin: ISupervisorsLogin = {
    email: "teste@mail.com",
    password: "Teste132",
}

export const mockedManager: ISupervisorsRequest = {
    name: "Manager",
    email: "manager@mail.com",
    password: "Manager123",
    cpf: 12345678901,
    telephone: 13984512783,
    is_manager: true,
}   

export const mockedManagerLogin: ISupervisorsLogin = {
    email: "manager@mail.com",
    password: "Manager123"
}

export const mockedAttendance = {
  collaborator_id: "",
  client_id: "",
  service_id: "",
};
