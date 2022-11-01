import { ISupervisorsLogin, ISupervisorsRequest } from "../../interfaces/supervisors";

export const mockedSupervisor: ISupervisorsRequest = {
    name: "Teste",
    email: "teste@mail.com",
    password: "Teste123",
    cpf: 12345678901,
    telephone: 13984512783,
    is_manager: false
}

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