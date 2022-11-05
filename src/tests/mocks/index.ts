import {
  IColaboratorRequest,
  ICollaborator,
  ITeams,
  ICollaboratorLogin,
} from "../../interfaces/collaborator";
import {
  ISupervisorsLogin,
  ISupervisorsRequest,
} from "../../interfaces/supervisors";
import { IInternetPlanRequest } from "../../interfaces/internetPlan";
import { IServiceRequest } from "../../interfaces/services";
import { IClientLogin, IClientRequest } from "../../interfaces/clients";

export const mockedSupervisor: ISupervisorsRequest = {
  name: "Teste",
  email: "supervisor@mail.com",
  password: "supervisor123",
  cpf: "12345678901",
  telephone: "13984512783",
  is_manager: false,
};

export const mockedSupervisorLogin: ISupervisorsLogin = {
  email: "supervisor@mail.com",
  password: "supervisor123",
};

export const mockedManager: ISupervisorsRequest = {
  name: "Manager",
  email: "manager@mail.com",
  password: "Manager123",
  cpf: "12345678901",
  telephone: "13984512783",
  is_manager: true,
};

export const mockedManagerLogin: ISupervisorsLogin = {
  email: "manager@mail.com",
  password: "Manager123",
};

export const mockedInternetPlans: IInternetPlanRequest = {
  name: "Teste",
  description: "Teste123",
  price: 400.0,
};

export const mockedCollaborator: ICollaborator = {
  name: "Teste",
  cpf: "12345678901",
  telephone: "13984512783",
  email: "collaborator@mail.com",
  password: "Teste123",
  is_active: true,
};

export const mockedCollaboratorLogin: ICollaboratorLogin = {
  email: "collaborator@mail.com",
  password: "Teste123",
};

export const mockedAttendance = {
  collaborator_id: "",
  client_id: "",
  service_id: "",
};

export const mockedService: IServiceRequest = {
  name: "Test",
  description: "Description",
};

export const mockedClient: IClientRequest = {
  name: "Client",
  cpf: "12345678901",
  telephone: "13984512783",
  email: "client@mail.com",
  password: "Client123",
  is_active: true,
};

export const mockedClientLogin: IClientLogin = {
  email: "client@mail.com",
  password: "Client123",
};

export const mockedTeams:ITeams = {
  supervisor_id: "",
  collaborator_id: "",
}