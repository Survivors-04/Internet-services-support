import { DataSource } from "typeorm";
import { AppDataSource } from "../../../data-source";
import request from "supertest";
import app from "../../../app";
import {
  mockedClient,
  mockedClientLogin,
  mockedManager,
  mockedManagerLogin,
  mockedSupervisor,
  mockedSupervisorDeleted,
  mockedSupervisorLogin,
} from "../../mocks";

describe("/supervisors", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) => {
        console.error("Error during Data Source initilization", err);
      });

    await request(app).post("/supervisors").send(mockedManager);
    await request(app).post("/clients").send(mockedClient);
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("POST /supervisors - Must be able to create a supervisor", async () => {
    const { body, status } = await request(app)
      .post("/supervisors")
      .send(mockedSupervisor);

    expect(body).toHaveProperty("id");
    expect(body).toHaveProperty("name");
    expect(body).toHaveProperty("email");
    expect(body).toHaveProperty("is_manager");
    expect(body).toHaveProperty("telephone");
    expect(body).not.toHaveProperty("cpf");
    expect(body).not.toHaveProperty("password");
    expect(body.name).toEqual("Supervisor");
    expect(body.email).toEqual("supervisor@mail.com");
    expect(body.telephone).toEqual("13984512783");
    expect(body.is_manager).toEqual(false);
    expect(body.is_active).toEqual(true);
    expect(status).toBe(201);
  });

  test("POST /supervisors - Should not be able to create a supervisor that already exists", async () => {
    const { body, status } = await request(app)
      .post("/supervisors")
      .send(mockedSupervisor);

    expect(body).toHaveProperty("message");
    expect(status).toBe(400);
  });

  test("GET /supevisors - Must be able to list all supervisors", async () => {
    const managerLogin = await request(app)
      .post("/login")
      .send(mockedManagerLogin);
    const token = `Bearer ${managerLogin.body.token}`;

    const { body, status } = await request(app)
      .get("/supervisors")
      .set("Authorization", token);

    expect(body).toHaveLength(2);
    expect(status).toBe(200);
  });

  test("GET /supervisors - Should not be able to list supervisors without manager permission", async () => {
    const supervisorLogin = await request(app)
      .post("/login")
      .send(mockedSupervisorLogin);
    const token = `Bearer ${supervisorLogin.body.token}`;

    const { body, status } = await request(app)
      .get("/supervisors")
      .set("Authorization", token);

    expect(body).toHaveProperty("message");
    expect(status).toBe(403);
  });

  test("PATCH /supervisors/:id - Must be able to update a supervisor", async () => {
    const newValues = { name: "Joana Brito", email: "joanabrito@mail.com" };

    const managerLogin = await request(app)
      .post("/login")
      .send(mockedManagerLogin);
    const token = `Bearer ${managerLogin.body.token}`;

    const updatedSupervisor = await request(app)
      .get("/supervisors")
      .set("Authorization", token);
    const updatedSupervisorId = updatedSupervisor.body[0].id;

    const { body, status } = await request(app)
      .patch(`/supervisors/${updatedSupervisorId}`)
      .set("Authorization", token)
      .send(newValues);

    expect(body.name).toEqual("Joana Brito");
    expect(body.email).toEqual("joanabrito@mail.com");
    expect(body).not.toHaveProperty("password");
    expect(status).toBe(200);
  });

  test("PATCH /supervisors/:id - Should not be able to update supervisor without manager permission", async () => {
    const newValues = { name: "false" };
    await request(app).post("/supervisors").send(mockedManager);

    const managerLogin = await request(app)
      .post("/login")
      .send(mockedManagerLogin);
    const token = `Bearer ${managerLogin.body.token}`;

    const clientLogin = await request(app)
      .post("/login")
      .send(mockedClientLogin);
    const clientToken = `Bearer ${clientLogin.body.token}`;

    const updatedSupervisor = await request(app)
      .get("/supervisors")
      .set("Authorization", token);
    const supervisorId = updatedSupervisor.body[0].id;

    const { body, status } = await request(app)
      .patch(`/supervisors/${supervisorId}`)
      .send(newValues)
      .set("Authorization", clientToken);

    expect(body).toHaveProperty("message");
    expect(status).toBe(403);
  });

  test("PATCH /supervisors/:id - Should not be ablue to update supervisor with invalid id", async () => {
    const newValues = { name: "bob" };

    const managerLogin = await request(app)
      .post("/login")
      .send(mockedManagerLogin);
    const token = `Bearer ${managerLogin.body.token}`;

    const updatedSupervisor = await request(app)
      .get("/supervisors")
      .set("Authorization", token);
    const updatedSupervisorId = updatedSupervisor.body[0].id;

    const { body, status } = await request(app)
      .patch("/supervisors/13970660-5dbe-423a-9a9d-5c23b37943cf")
      .set("Authorization", token)
      .send(newValues);

    expect(body).toHaveProperty("message");
    expect(status).toBe(404);
  });

  test("PATCH /supervisors/:id - Should not be able to update is_manager field value", async () => {
    const newValues = { is_manager: false };

    const managerLogin = await request(app)
      .post("/login")
      .send(mockedManagerLogin);
    const token = `Bearer ${managerLogin.body.token}`;

    const updatedSupervisor = await request(app)
      .get("/supervisors")
      .set("Authorization", token);
    const updatedSupervisorId = updatedSupervisor.body[0].id;

    const response = await request(app)
      .patch(`/supervisors/${updatedSupervisorId}`)
      .set("Authorization", token)
      .send(newValues);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("PATCH /supervisors/:id - Should not be able to update is_active field value", async () => {
    const newValues = { is_active: false };

    const managerLogin = await request(app)
      .post("/login")
      .send(mockedManagerLogin);
    const token = `Bearer ${managerLogin.body.token}`;

    const updatedSupervisor = await request(app)
      .get("/supervisors")
      .set("Authorization", token);
    const updatedSupervisorId = updatedSupervisor.body[0].id;

    const response = await request(app)
      .patch(`/supervisors/${updatedSupervisorId}`)
      .set("Authorization", token)
      .send(newValues);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("PATCH /supervisors/:id - Should not be able to update id field value", async () => {
    const newValues = { id: "13970660-5dbe-423a-9a9d-5c23b37943cf" };

    const managerLogin = await request(app)
      .post("/login")
      .send(mockedManagerLogin);
    const token = `Bearer ${managerLogin.body.token}`;

    const updatedSupervisor = await request(app)
      .get("/supervisors")
      .set("Authorization", token);
    const updatedSupervisorId = updatedSupervisor.body[0].id;

    const response = await request(app)
      .patch(`/supervisors/${updatedSupervisorId}`)
      .set("Authorization", token)
      .send(newValues);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("DELETE /supervisors/:id - Should not be able to delete a supervisor without manager permission", async () => {
    await request(app).post("/supervisors").send(mockedSupervisor);
    const managerLogin = await request(app)
      .post("/login")
      .send(mockedManagerLogin);
    const token = `Bearer ${managerLogin.body.token}`;

    const supervisorLogin = await request(app)
      .post("/login")
      .send(mockedSupervisorLogin);
    const supervisorToken = `Bearer ${supervisorLogin.body.token}`;

    const deletedSupervisor = await request(app)
      .get("/supervisors")
      .set("Authorization", token);
    const deletedSupervisorId = deletedSupervisor.body[0].id;

    const { body, status } = await request(app)
      .delete(`/supervisors/${deletedSupervisorId}`)
      .set("Authorization", supervisorToken);

    expect(body).toHaveProperty("message");
    expect(status).toBe(403);
  });

  test("DELETE /supervisors/:id - Should not be able to delete supervisor with invalid id", async () => {
    const managerLogin = await request(app)
      .post("/login")
      .send(mockedManagerLogin);
    const token = `Bearer ${managerLogin.body.token}`;

    const response = await request(app)
      .delete(`/supervisors/13970660-5dbe-423a-9a9d-5c23b37943cf`)
      .set("Authorization", token);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(404);
  });

  test("DELETE /supervisors/:id - Should not be able to delete supervisor with is_active = false", async () => {
    const managerLogin = await request(app)
      .post("/login")
      .send(mockedManagerLogin);
    const token = `Bearer ${managerLogin.body.token}`;

    const deletedSupervisor = await request(app)
      .get("/supervisors")
      .set("Authorization", token);
    const deletedSupervisorId = deletedSupervisor.body[0].id;

    await request(app)
      .delete(`/supervisors/${deletedSupervisorId}`)
      .set("Authorization", token);

    const { body, status } = await request(app)
      .delete(`/supervisors/${deletedSupervisorId}`)
      .set("Authorization", token);

    expect(body).toHaveProperty("message");
    expect(status).toBe(400);
  });

  test("DELETE /supervisors/:id - Must be able to soft delete a supervisor", async () => {
    const managerLogin = await request(app)
      .post("/login")
      .send(mockedManagerLogin);
    const token = `Bearer ${managerLogin.body.token}`;

    await request(app).post("/supervisors").send(mockedSupervisorDeleted);

    const deletedSupervisor = await request(app)
      .get("/supervisors")
      .set("Authorization", token);
    const deletedSupervisorId = deletedSupervisor.body[1].id;

    const { body, status } = await request(app)
      .delete(`/supervisors/${deletedSupervisorId}`)
      .set("Authorization", token);

    expect(status).toBe(204);
  });
});
