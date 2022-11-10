import { DataSource, TableForeignKey } from "typeorm";
import { AppDataSource } from "../../../data-source";
import request from "supertest";
import app from "../../../app";
import {
  mockedAttendance,
  mockedClient,
  mockedClientLogin,
  mockedCollaborator,
  mockedManager,
  mockedManagerLogin,
  mockedService,
} from "../../mocks";

describe("/attendance", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });
    await request(app).post("/supervisors").send(mockedManager);
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("POST /attendances - Must be able to create an attendance", async () => {
    const managerLogin = await request(app)
      .post("/login")
      .send(mockedManagerLogin);
    const token = `Bearer ${managerLogin.body.token}`;

    const collaborator = await request(app)
      .post("/collaborators")
      .send(mockedCollaborator)
      .set("Authorization", token);
    const collaboratorId = collaborator.body.id;

    const client = await request(app)
      .post("/clients")
      .send(mockedClient)
      .set("Authorization", token);
    const clientId = client.body.id;

    const service = await request(app)
      .post("/services")
      .send(mockedService)
      .set("Authorization", token);
    const serviceId = service.body.id;

    mockedAttendance.collaboratorId = collaboratorId;
    mockedAttendance.clientId = clientId;
    mockedAttendance.serviceId = serviceId;

    const { body, status } = await request(app)
      .post("/attendances")
      .send(mockedAttendance)
      .set("Authorization", token);

    expect(body).toHaveProperty("id");
    expect(body).toHaveProperty("collaboratorId");
    expect(body).toHaveProperty("clientId");
    expect(body).toHaveProperty("serviceId");
    expect(body).toHaveProperty("date");
    expect(body).toHaveProperty("is_active");
    expect(body.collaboratorId).toBe(collaboratorId);
    expect(body.clientId).toBe(clientId);
    expect(body.serviceId).toBe(serviceId);
    expect(body.is_active).toBe(true);
    expect(status).toBe(201);
  });

  test("POST /attendances - Should not be able to create attedance with invalid collaboratorId", async () => {
    await request(app).post("/supervisors").send(mockedManager);

    const managerLogin = await request(app)
      .post("/login")
      .send(mockedManagerLogin);
    const token = `Bearer ${managerLogin.body.token}`;

    const collaborator = await request(app)
      .get("/collaborators")
      .set("Authorization", token);
    const collaboratorId = collaborator.body[0].id;

    const client = await request(app)
      .get("/clients")
      .set("Authorization", token);
    const clientId = client.body[0].id;

    const service = await request(app)
      .get("/services")
      .set("Authorization", token);
    const serviceId = service.body[0].id;

    mockedAttendance.collaboratorId = "13970660-5dbe-423a-9a9d-5c23b37943cf";
    mockedAttendance.clientId = clientId;
    mockedAttendance.serviceId = serviceId;

    const { body, status } = await request(app)
      .post("/attendances")
      .send(mockedAttendance)
      .set("Authorization", token);

    expect(body).toHaveProperty("message");
    expect(status).toBe(404);
  });

  test("POST /attendances - Should not be able to create attedance with invalid clientId", async () => {
    await request(app).post("/supervisors").send(mockedManager);

    const managerLogin = await request(app)
      .post("/login")
      .send(mockedManagerLogin);
    const token = `Bearer ${managerLogin.body.token}`;

    const collaborator = await request(app)
      .get("/collaborators")
      .set("Authorization", token);
    const collaboratorId = collaborator.body[0].id;

    const client = await request(app)
      .get("/clients")
      .set("Authorization", token);
    const clientId = client.body[0].id;

    const service = await request(app)
      .get("/services")
      .set("Authorization", token);
    const serviceId = service.body[0].id;

    mockedAttendance.collaboratorId = collaboratorId;
    mockedAttendance.clientId = "13970660-5dbe-423a-9a9d-5c23b37943cf";
    mockedAttendance.serviceId = serviceId;

    const { body, status } = await request(app)
      .post("/attendances")
      .send(mockedAttendance)
      .set("Authorization", token);

    expect(body).toHaveProperty("message");
    expect(status).toBe(404);
  });

  test("POST /attendances - Should not be able to create attedance with invalid serviceId", async () => {
    await request(app).post("/supervisors").send(mockedManager);

    const managerLogin = await request(app)
      .post("/login")
      .send(mockedManagerLogin);
    const token = `Bearer ${managerLogin.body.token}`;

    const collaborator = await request(app)
      .get("/collaborators")
      .set("Authorization", token);
    const collaboratorId = collaborator.body[0].id;

    const client = await request(app)
      .get("/clients")
      .set("Authorization", token);
    const clientId = client.body[0].id;

    const service = await request(app)
      .get("/services")
      .set("Authorization", token);
    const serviceId = service.body[0].id;

    mockedAttendance.collaboratorId = collaboratorId;
    mockedAttendance.clientId = clientId;
    mockedAttendance.serviceId = "13970660-5dbe-423a-9a9d-5c23b37943cf";

    const { body, status } = await request(app)
      .post("/attendances")
      .send(mockedAttendance)
      .set("Authorization", token);

    expect(body).toHaveProperty("message");
    expect(status).toBe(404);
  });

  test("GET /attendances - Must be able to list all attendances", async () => {
    await request(app).post("/supervisors").send(mockedManager);

    const managerLogin = await request(app)
      .post("/login")
      .send(mockedManagerLogin);
    const token = `Bearer ${managerLogin.body.token}`;

    const { body, status } = await request(app)
      .get("/attendances")
      .set("Authorization", token);

    expect(body).toHaveLength(1);
    expect(status).toBe(200);
  });

  test("GET /attendances - Should not be able to list all attendances without collaborator permission", async () => {
    await request(app).post("/supervisors").send(mockedManager);

    const managerLogin = await request(app)
      .post("/login")
      .send(mockedManagerLogin);
    const token = `Bearer ${managerLogin.body.token}`;

    const clientLogin = await request(app)
      .post("/login")
      .send(mockedClientLogin);
    const clientToken = `Bearer ${clientLogin.body.token}`;

    const { body, status } = await request(app)
      .get("/attendances")
      .set("Authorization", clientToken);

    expect(body).toHaveProperty("message");
    expect(status).toBe(403);
  });

  test("GET /attendances/:id - Must be able to list an attendance by id", async () => {
    const managerLogin = await request(app)
      .post("/login")
      .send(mockedManagerLogin);
    const token = `Bearer ${managerLogin.body.token}`;

    mockedCollaborator.email = "collaborator789@mail.com";
    mockedCollaborator.cpf = "73912061617717";
    const collaborator = await request(app)
      .post("/collaborators")
      .send(mockedCollaborator)
      .set("Authorization", token);
    const collaboratorId = collaborator.body.id;

    mockedClient.email = "client78541@mail.com";
    mockedClient.cpf = "86891564620840";
    const client = await request(app)
      .post("/clients")
      .send(mockedClient)
      .set("Authorization", token);
    const clientId = client.body.id;

    mockedService.name = "aasws";
    const service = await request(app)
      .post("/services")
      .send(mockedService)
      .set("Authorization", token);
    const serviceId = service.body.id;

    mockedAttendance.collaboratorId = collaboratorId;
    mockedAttendance.clientId = clientId;
    mockedAttendance.serviceId = serviceId;

    const attendance = await request(app)
      .post("/attendances")
      .send(mockedAttendance)
      .set("Authorization", token);
    const attendanceId = attendance.body.id;

    const { body, status } = await request(app)
      .get(`/attendances/${attendanceId}`)
      .set("Authorization", token);

    expect(body).toHaveProperty("id");
    expect(body).toHaveProperty("client");
    expect(body).toHaveProperty("service");
    expect(body).toHaveProperty("collaborator");
    expect(body).toHaveProperty("date");
    expect(body).toHaveProperty("is_active");
    expect(status).toBe(200);
  });

  test("GET /attendances/:id - Should not be able to list an attendance with invalid id", async () => {
    const managerLogin = await request(app)
      .post("/login")
      .send(mockedManagerLogin);
    const token = `Bearer ${managerLogin.body.token}`;

    const collaborator = await request(app)
      .get("/collaborators")
      .set("Authorization", token);
    const collaboratorId = collaborator.body[0].id;

    const client = await request(app)
      .get("/clients")
      .set("Authorization", token);
    const clientId = client.body[0].id;

    const service = await request(app)
      .get("/services")
      .set("Authorization", token);
    const serviceId = service.body[0].id;

    mockedAttendance.collaboratorId = collaboratorId;
    mockedAttendance.clientId = clientId;
    mockedAttendance.serviceId = serviceId;

    const attendance = await request(app)
      .post("/attendances")
      .send(mockedAttendance)
      .set("Authorization", token);
    const attendanceId = attendance.body.id;

    const { body, status } = await request(app)
      .get(`/attendances/13970660-5dbe-423a-9a9d-5c23b37943cf`)
      .set("Authorization", token);

    expect(body).toHaveProperty("message");
    expect(status).toBe(404);
  });

  test("GET /attendances/:id - Should not be able to list an attendance without collaborator permission", async () => {
    const managerLogin = await request(app)
      .post("/login")
      .send(mockedManagerLogin);
    const token = `Bearer ${managerLogin.body.token}`;

    const collaborator = await request(app)
      .get("/collaborators")
      .set("Authorization", token);
    const collaboratorId = collaborator.body[0].id;

    const client = await request(app)
      .get("/clients")
      .set("Authorization", token);
    const clientId = client.body[0].id;

    const service = await request(app)
      .get("/services")
      .set("Authorization", token);
    const serviceId = service.body[0].id;

    mockedAttendance.collaboratorId = collaboratorId;
    mockedAttendance.clientId = clientId;
    mockedAttendance.serviceId = serviceId;

    const attendance = await request(app)
      .post("/attendances")
      .send(mockedAttendance)
      .set("Authorization", token);
    const attendanceId = attendance.body.id;

    const clientLogin = await request(app)
      .post("/login")
      .send(mockedClientLogin);
    const clientToken = `Bearer ${clientLogin.body.token}`;

    const { body, status } = await request(app)
      .get(`/attendances/${attendanceId}`)
      .set("Authorization", clientToken);

    expect(body).toHaveProperty("message");
    expect(status).toBe(403);
  });

  test("GET /attedances/collaborators/:id - Must be able to read all atendances by collaborator", async () => {
    const managerLogin = await request(app)
      .post("/login")
      .send(mockedManagerLogin);
    const token = `Bearer ${managerLogin.body.token}`;

    const collaborator = await request(app)
      .get("/collaborators")
      .set("Authorization", token);
    const collaboratorId = collaborator.body[0].id;

    const attendance = await request(app)
      .get("/attendances")
      .set("Authorization", token);

    const { body, status } = await request(app)
      .get(`/attendances/collaborators/${collaboratorId}`)
      .set("Authorization", token);

    expect(body).toHaveLength(1);
    expect(status).toBe(200);
  });

  test("GET /attendances/collaborators/:id - Should not be able to list attendances by collaborator with invalid collaborator id", async () => {
    const managerLogin = await request(app)
      .post("/login")
      .send(mockedManagerLogin);
    const token = `Bearer ${managerLogin.body.token}`;

    const collaborator = await request(app)
      .get("/collaborators")
      .set("Authorization", token);
    const collaboratorId = collaborator.body[0].id;

    const client = await request(app)
      .get("/clients")
      .set("Authorization", token);
    const clientId = client.body[0].id;

    const service = await request(app)
      .get("/services")
      .set("Authorization", token);
    const serviceId = service.body[0].id;

    mockedAttendance.collaboratorId = collaboratorId;
    mockedAttendance.clientId = clientId;
    mockedAttendance.serviceId = serviceId;

    const attendance = await request(app)
      .post("/attendances")
      .send(mockedAttendance)
      .set("Authorization", token);
    const attendanceId = attendance.body.id;

    const { body, status } = await request(app)
      .get(`/attendances/collaborators/13970660-5dbe-423a-9a9d-5c23b37943cf`)
      .set("Authorization", token);

    expect(body).toHaveProperty("message");
    expect(status).toBe(404);
  });

  test("GET /attendances/collaborators/:id - Should not be able to list an attendance by collaborator without collaborator permission", async () => {
    const managerLogin = await request(app)
      .post("/login")
      .send(mockedManagerLogin);
    const token = `Bearer ${managerLogin.body.token}`;

    const collaborator = await request(app)
      .get("/collaborators")
      .set("Authorization", token);
    const collaboratorId = collaborator.body[0].id;

    const client = await request(app)
      .get("/clients")
      .set("Authorization", token);
    const clientId = client.body[0].id;

    const service = await request(app)
      .get("/services")
      .set("Authorization", token);
    const serviceId = service.body[0].id;

    mockedAttendance.collaboratorId = collaboratorId;
    mockedAttendance.clientId = clientId;
    mockedAttendance.serviceId = serviceId;

    const attendance = await request(app)
      .post("/attendances")
      .send(mockedAttendance)
      .set("Authorization", token);
    const attendanceId = attendance.body.id;

    const clientLogin = await request(app)
      .post("/login")
      .send(mockedClientLogin);
    const clientToken = `Bearer ${clientLogin.body.token}`;

    const { body, status } = await request(app)
      .get(`/attendances/collaborators/${collaboratorId}`)
      .set("Authorization", clientToken);

    expect(body).toHaveProperty("message");
    expect(status).toBe(403);
  });

  test("DELETE /attendances - Must be able to soft delete an attendance", async () => {
    const managerLogin = await request(app)
      .post("/login")
      .send(mockedManagerLogin);
    const token = `Bearer ${managerLogin.body.token}`;

    const deletedAttendance = await request(app)
      .get("/attendances")
      .set("Authorization", token);
    const deletedAttendanceId = deletedAttendance.body[0].id;

    const { body, status } = await request(app)
      .delete(`/attendances/${deletedAttendanceId}`)
      .set("Authorization", token);

    //expect(body).toHaveProperty("message");
    expect(status).toBe(204);
  });

  test("DELETE /attendances - Should not be able to delete an attendance with invalid id", async () => {
    const managerLogin = await request(app)
      .post("/login")
      .send(mockedManagerLogin);
    const token = `Bearer ${managerLogin.body.token}`;

    const deletedAttendance = await request(app)
      .get("/attendances")
      .set("Authorization", token);
    const deletedAttendanceId = deletedAttendance.body[0].id;

    const { body, status } = await request(app)
      .delete(`/attendances/13970660-5dbe-423a-9a9d-5c23b37943cf`)
      .set("Authorization", token);

    expect(body).toHaveProperty("message");
    expect(status).toBe(404);
  });

  test("DELETE /attendances - Should not be able to delete an attendance without collaborator permission", async () => {
    const managerLogin = await request(app)
      .post("/login")
      .send(mockedManagerLogin);
    const token = `Bearer ${managerLogin.body.token}`;

    const deletedAttendance = await request(app)
      .get("/attendances")
      .set("Authorization", token);
    const deletedAttendanceId = deletedAttendance.body[0].id;

    const { body, status } = await request(app)
      .delete(`/attendances/${deletedAttendanceId}`)
      .set("Authorization", "clientToken");

    expect(body).toHaveProperty("message");
    expect(status).toBe(403);
  });

  test("DELETE /attendances - Should not be able to delete an attendance with is_active = false", async () => {
    const managerLogin = await request(app)
      .post("/login")
      .send(mockedManagerLogin);
    const token = `Bearer ${managerLogin.body.token}`;

    const deletedAttendance = await request(app)
      .get("/attendances")
      .set("Authorization", token);
    const deletedAttendanceId = deletedAttendance.body[0].id;

    const { body, status } = await request(app)
      .delete(`/attendances/${deletedAttendanceId}`)
      .set("Authorization", token);

    expect(body).toHaveProperty("message");
    expect(status).toBe(400);
  });
});
