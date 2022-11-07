import { DataSource, TableForeignKey } from "typeorm";
import { AppDataSource } from "../../../data-source";
import request from "supertest";
import app from "../../../app";
import {
  mockedAttendance,
  mockedClient,
  mockedCollaborator,
  mockedManager,
  mockedManagerLogin,
  mockedService,
} from "../../mocks";

describe("/client", () => {
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

  test("POST /clients - Must be able to create a client", async () => {
    await request(app).post("/supervisors").send(mockedManager);

    const managerLogin = await request(app)
      .post("/login")
      .send(mockedManagerLogin);
    const token = `Bearer ${managerLogin.body.token}`;

    const { body, status } = await request(app)
      .post("/clients")
      .send(mockedClient)
      .set("Authorization", token);

    expect(body).toHaveProperty("id");
    expect(body).toHaveProperty("name");
    expect(body).toHaveProperty("cpf");
    expect(body).toHaveProperty("telephone");
    expect(body).toHaveProperty("email");
    expect(body).toHaveProperty("is_active");
    expect(body).toHaveProperty("created_date");
    expect(body).toHaveProperty("updated_date");
    expect(body).not.toHaveProperty("password");
    expect(body.name).toBe("Client");
    expect(body.cpf).toBe("12345678901");
    expect(body.telephone).toBe("13984512783");
    expect(body.email).toBe("client@mail.com");
    expect(body.is_active).toBe(true);
    expect(status).toBe(201);
  });

  test("POST /clients - Should not be able to create a client that already exist", async () => {
    await request(app).post("/supervisors").send(mockedManager);

    const managerLogin = await request(app)
      .post("/login")
      .send(mockedManagerLogin);
    const token = `Bearer ${managerLogin.body.token}`;

    const { body, status } = await request(app)
      .post("/clients")
      .send(mockedClient)
      .set("Authorization", token);

    expect(body).toHaveProperty("message");
    expect(status).toBe(400);
  });

  test("GET /clients - Must be able to list all clients", async () => {
    await request(app).post("/supervisors").send(mockedManager);

    const managerLogin = await request(app)
      .post("/login")
      .send(mockedManagerLogin);
    console.log(managerLogin);
    const token = `Bearer ${managerLogin.body.token}`;
    console.log(token);

    const { body, status } = await request(app)
      .get("/clients")
      .set("Authorization", token);

    expect(body).toHaveLength(1);
    expect(status).toBe(200);
  });

  test("GET /clients - Should not be able to list all attendances without collaborator permission", async () => {
    await request(app).post("/supervisors").send(mockedManager);

    const managerLogin = await request(app)
      .post("/login")
      .send(mockedManagerLogin);
    const token = `Bearer ${managerLogin.body.token}`;

    const { body, status } = await request(app)
      .get("/clients")
      .set("Authorization", "token");

    expect(body).toHaveProperty("message");
    expect(status).toBe(403);
  });

  test("GET /clients/:id - Must be able to list an attendance by id", async () => {
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
    mockedAttendance.serviceId = serviceId;

    const attendance = await request(app)
      .post("/clients")
      .send(mockedAttendance)
      .set("Authorization", token);
    const attendanceId = attendance.body.id;

    const { body, status } = await request(app)
      .get(`/clients/${attendanceId}`)
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
    expect(status).toBe(200);
  });

  test("GET /clients/:id - Should not be able to list an attendance with invalid id", async () => {
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
    mockedAttendance.serviceId = serviceId;

    const attendance = await request(app)
      .post("/clients")
      .send(mockedAttendance)
      .set("Authorization", token);
    const attendanceId = attendance.body.id;

    const { body, status } = await request(app)
      .get(`/clients/13970660-5dbe-423a-9a9d-5c23b37943cf`)
      .set("Authorization", token);

    expect(body).toHaveProperty("message");
    expect(status).toBe(404);
  });

  test("GET /clients/:id - Should not be able to list an attendance without collaborator permission", async () => {
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
    mockedAttendance.serviceId = serviceId;

    const attendance = await request(app)
      .post("/clients")
      .send(mockedAttendance)
      .set("Authorization", token);
    const attendanceId = attendance.body.id;

    const { body, status } = await request(app)
      .get(`/clients/${attendanceId}`)
      .set("Authorization", "token");

    expect(body).toHaveProperty("message");
    expect(status).toBe(403);
  });

  test("GET /attedances/collaborators/:id - Must be able to read all atendances by collaborator", async () => {
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
    mockedAttendance.serviceId = serviceId;

    const attendance = await request(app)
      .post("/clients")
      .send(mockedAttendance)
      .set("Authorization", token);
    const attendanceId = attendance.body.id;

    const { body, status } = await request(app)
      .get(`/clients/collaborators/${collaboratorId}`)
      .set("Authorization", token);

    expect(body).toHaveLength(5);
    expect(status).toBe(200);
  });

  test("GET /clients/collaborators/:id - Should not be able to list attendances by collaborator with invalid collaborator id", async () => {
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
    mockedAttendance.serviceId = serviceId;

    const attendance = await request(app)
      .post("/clients")
      .send(mockedAttendance)
      .set("Authorization", token);
    const attendanceId = attendance.body.id;

    const { body, status } = await request(app)
      .get(`/clients/collaborators/13970660-5dbe-423a-9a9d-5c23b37943cf`)
      .set("Authorization", token);

    expect(body).toHaveProperty("message");
    expect(status).toBe(404);
  });

  test("GET /clients/collaborators/:id - Should not be able to list an attendance by collaborator without collaborator permission", async () => {
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
    mockedAttendance.serviceId = serviceId;

    const attendance = await request(app)
      .post("/clients")
      .send(mockedAttendance)
      .set("Authorization", token);
    const attendanceId = attendance.body.id;

    const { body, status } = await request(app)
      .get(`/clients/collaborators/${collaboratorId}`)
      .set("Authorization", "token");

    expect(body).toHaveProperty("message");
    expect(status).toBe(403);
  });

  test("DELETE /clients - Must be able to soft delete an attendance", async () => {
    const managerLogin = await request(app)
      .post("/login")
      .send(mockedManagerLogin);
    const token = managerLogin.body.token;

    const deletedAttendance = await request(app)
      .get("/clients")
      .set("Authorization", token);
    const deletedAttendanceId = deletedAttendance.body[0].id;

    const { body, status } = await request(app)
      .delete(`/clients/${deletedAttendanceId}`)
      .set("Authorization", token);

    expect(body).toHaveProperty("message");
    expect(status).toBe(204);
  });

  test("DELETE /clients - Should not be able to delete an attendance with invalid id", async () => {
    const managerLogin = await request(app)
      .post("/login")
      .send(mockedManagerLogin);
    const token = managerLogin.body.token;

    const deletedAttendance = await request(app)
      .get("/clients")
      .set("Authorization", token);
    const deletedAttendanceId = deletedAttendance.body[0].id;

    const { body, status } = await request(app)
      .delete(`/clients/13970660-5dbe-423a-9a9d-5c23b37943cf`)
      .set("Authorization", token);

    expect(body).toHaveProperty("message");
    expect(status).toBe(404);
  });

  test("DELETE /clients - Should not be able to delete an attendance without collaborator permission", async () => {
    const managerLogin = await request(app)
      .post("/login")
      .send(mockedManagerLogin);
    const token = managerLogin.body.token;

    const deletedAttendance = await request(app)
      .get("/clients")
      .set("Authorization", token);
    const deletedAttendanceId = deletedAttendance.body[0].id;

    const { body, status } = await request(app)
      .delete(`/clients/${deletedAttendanceId}`)
      .set("Authorization", "token");

    expect(body).toHaveProperty("message");
    expect(status).toBe(403);
  });

  test("DELETE /clients - Should not be able to delete an attendance with is_active = false", async () => {
    const managerLogin = await request(app)
      .post("/login")
      .send(mockedManagerLogin);
    const token = managerLogin.body.token;

    const deletedAttendance = await request(app)
      .get("/clients")
      .set("Authorization", token);
    const deletedAttendanceId = deletedAttendance.body[0].id;
    console.log(deletedAttendance.body);

    const { body, status } = await request(app)
      .delete(`/clients/${deletedAttendanceId}`)
      .set("Authorization", token);

    expect(body).toHaveProperty("message");
    expect(status).toBe(400);
  });
});
