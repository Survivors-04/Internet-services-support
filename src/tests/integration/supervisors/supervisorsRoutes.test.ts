import { DataSource } from "typeorm";
import { AppDataSource } from "../../../data-source";
import request from "supertest";
import app from "../../../app";
import { mockedSupervisor } from "../../mocks";

describe("/supervisors", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) => {
        console.error("Error during Data Source initilization", err);
      });
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("POST /supervisors - Should insert the information of new user in the database", async () => {
    const { body, status } = await request(app)
      .post("/supervisors")
      .send(mockedSupervisor);
    
    expect(body).toHaveProperty("id");
    expect(body).toHaveProperty("name");
    expect(body).toHaveProperty("email");
    expect(body).toHaveProperty("is_manager");
    expect(body).toHaveProperty("cpf");
    expect(body).toHaveProperty("telephone");
    expect(body).not.toHaveProperty("password");
    expect(body.name).toEqual("Teste");
    expect(body.email).toEqual("teste@mail.com");
    expect(body.cpf).toEqual("12345678901");
    expect(body.telephone).toEqual(13984512783);
    expect(body.is_manager).toEqual(false);
    expect(status).toBe(201);
  });

  test("POST /supervisors - Should not be able to create a supervisor that already exists", async () => {
    const { body, status } = await request(app)
      .post("/supervisors")
      .send(mockedSupervisor);

    expect(body).toHaveProperty("message");
    expect(status).toBe(400);
  });

  test('')

});
