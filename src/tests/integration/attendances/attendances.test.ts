import { DataSource } from "typeorm";
import { AppDataSource } from "../../../data-source";
import request from "supertest";
import app from "../../../app";
import { mockedAttendance } from "../../mocks";

describe("/attendance", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });
  });

  afterAll(async () => {
    await connection.destroy();
  });

  let createdAttendance = {
    id: "",
    collaborator: {},
    client: {},
    service: {},
    date: "",
    is_active: true,
  };

  let idCollaborator = "";

  test("creating a attendance", async () => {
    const responseCollaborator = await request(app)
      .post("/collaborator")
      .send("passe o collaborator para cadastro aqui");
    const responseClient = await request(app)
      .post("/clients")
      .send("passe o client para cadastro aqui");

    const responseService = await request(app)
      .post("/services")
      .send("passe o service para cadastro aqui");

    mockedAttendance.collaborator_id = responseCollaborator.body.id;
    mockedAttendance.client_id = responseClient.body.id;
    mockedAttendance.service_id = responseService.body.id;

    idCollaborator = responseCollaborator.body.id;

    const response = await request(app)
      .post("/attendance")
      .send(mockedAttendance);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("collaborator");
    expect(response.body).toHaveProperty("client");
    expect(response.body).toHaveProperty("service");
    expect(response.body).toHaveProperty("date");
    expect(response.body).toHaveProperty("is_active");
    createdAttendance = response.body;
  });

  test("listing the attendances", async () => {
    const response = await request(app).get("/attendance");

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("map");
  });

  test("listing attendance by id", async () => {
    const response = await request(app).get(
      `/attendance/${createdAttendance.id}`
    );

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        id: createdAttendance.id,
        collaborator: createdAttendance.collaborator,
        client: createdAttendance.client,
        service: createdAttendance.service,
        date: createdAttendance.date,
        is_active: createdAttendance.is_active,
      })
    );
  });

  test("trying to list attendance by id with incorrect id", async () => {
    const response = await request(app).get(`/attendance/idIncorreto`);

    expect(response.status).toBe(409);
    expect(response.body).toHaveProperty("message");
  });

  test("listing the attendances by collaborator id", async () => {
    await request(app)
      .post("/supervisors")
      .send("passe o supervisor para cadastro aqui");
    const responseLoginSupervisor = await request(app)
      .post("/login")
      .send("passe o supervisor para login aqui");
    const response = await request(app)
      .get(`/attendance/collaborator/${idCollaborator}`)
      .set("Authorization", `Bearer ${responseLoginSupervisor.body.token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("map");
  });

  test("trying to list attendance by id collaborator with incorrect id", async () => {
    await request(app)
      .post("/supervisors")
      .send("passe o supervisor para cadastro aqui");
    const responseLoginSupervisor = await request(app)
      .post("/login")
      .send("passe o supervisor para login aqui");
    const response = await request(app)
      .get(`/attendance/collaborator/idIncorreto`)
      .set("Authorization", `Bearer ${responseLoginSupervisor.body.token}`);

    expect(response.status).toBe(409);
    expect(response.body).toHaveProperty("message");
  });

  test("trying to delete service with wrong id", async () => {
    const response = await request(app).delete(
      `/attendance/${createdAttendance.id}`
    );

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
  });

  test("trying to delete service with wrong id", async () => {
    await request(app)
      .post("/supervisors")
      .send("passe o supervisor para cadastro aqui");
    const responseLoginSupervisor = await request(app)
      .post("/login")
      .send("passe o supervisor para login aqui");
    const response = await request(app)
      .delete(`/attendance/idIncorreto`)
      .set("Authorization", `Bearer ${responseLoginSupervisor.body.token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message");
  });

  test("deleting attendance", async () => {
    await request(app)
      .post("/supervisors")
      .send("passe o supervisor para cadastro aqui");
    const responseLoginSupervisor = await request(app)
      .post("/login")
      .send("passe o supervisor para login aqui");
    const response = await request(app)
      .delete(`/attendance/${createdAttendance.id}`)
      .set("Authorization", `Bearer ${responseLoginSupervisor.body.token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message");
  });
});
