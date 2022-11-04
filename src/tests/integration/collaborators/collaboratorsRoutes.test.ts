import { DataSource } from "typeorm";
import { AppDataSource } from "../../../data-source";
import request from "supertest";
import app from "../../../app";
import {
  mockedSupervisor,
  mockedSupervisorLogin,
  mockedCollaborator,
  mockedCollaboratorLogin,
} from "../../mocks";

describe("/collaborators", () => {
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

  test("POST /collaborators - Must be able to create a collaborator", async () => {
    const { body, status } = await request(app)
      .post("/collaborators")
      .send(mockedCollaborator);

    expect(body).toHaveProperty("id");
    expect(body).toHaveProperty("name");
    expect(body).toHaveProperty("email");
    expect(body).toHaveProperty("telephone");
    expect(body).toHaveProperty("cpf");
    expect(body).not.toHaveProperty("password");
    expect(body.name).toEqual("Teste");
    expect(body.email).toEqual("teste@mail.com");
    expect(body.telephone).toEqual("13984512783");
    expect(body.cpf).toEqual("12345678901");
    expect(body.is_active).toEqual(true);
    expect(status).toBe(201);
  });

  test("POST /collaborators - Should not be able to create a collaborator that already exists", async () => {
    const { body, status } = await request(app)
      .post("/collaborators")
      .send(mockedCollaborator);

    expect(body).toHaveProperty("message");
    expect(status).toBe(400);
  });

  test("POST /collaborators - Should not be able to create a collaborator without supervisor permission", async () => {
    const collaboratorLogin = await request(app)
      .post("/login")
      .send(mockedCollaboratorLogin);
    const token = `Bearer ${collaboratorLogin.body.token}`;

    const { body, status } = await request(app)
      .get("/collaborators")
      .set("Authorization", token);

    expect(body).toHaveProperty("message");
    expect(status).toBe(403);
  });

  test("GET /supevisors - Must be able to list all collaborators", async () => {
    await request(app).post("/collaborators").send(mockedSupervisor);

    const supervisorLogin = await request(app)
      .post("/login")
      .send(mockedSupervisorLogin);
    const token = `Bearer ${supervisorLogin.body.token}`;

    const { body } = await request(app)
      .get("/collaborators")
      .set("Authorization", token);

    expect(body).toHaveLength(1);
  });

  test("GET /collaborators - Should not be able to list collaborators without supervisor permission", async () => {
    const collaboratorLogin = await request(app)
      .post("/login")
      .send(mockedCollaboratorLogin);
    const token = `Bearer ${collaboratorLogin.body.token}`;

    const { body, status } = await request(app)
      .get("/collaborators")
      .set("Authorization", token);

    expect(body).toHaveProperty("message");
    expect(status).toBe(403);
  });

  test("PATCH /collaborators/:id - Must be able to update a collaborator", async () => {
    const newValues = { name: "Joana Brito", email: "joanabrito@mail.com" };

    const supervisorLogin = await request(app)
      .post("/login")
      .send(mockedSupervisorLogin);
    const token = `Bearer ${supervisorLogin.body.token}`;

    const updatedCollaborator = await request(app)
      .get("/collaborators")
      .set("Authorization", token);
    const updatedCollaboratorId = updatedCollaborator.body[0].id;

    const { body, status } = await request(app)
      .patch(`/collaborators/${updatedCollaboratorId}`)
      .set("Autorization", token)
      .send(newValues);

    expect(body[0].name).toEqual("Joana Brito");
    expect(body[0]).not.toHaveProperty("password");
    expect(status).toBe(200);
  });

  test("PATCH /collaborators/:id - Should not be able to update collaborator without supervisor permission", async () => {
    await request(app).post('/supevisors').send(mockedSupervisor)
    
    const newValues = { name: "false" };

    const supervisorLogin = await request(app)
      .post("/login")
      .send(mockedSupervisorLogin);
    const supervisorToken = `Bearer ${supervisorLogin.body.token}`;

    const collaboratorLogin = await request(app)
      .post("/login")
      .send(mockedCollaboratorLogin);
    const collaboratorToken = collaboratorLogin.body.token;

    const updatedCollaborator = await request(app)
      .get("/collaborators")
      .set("Authorization", supervisorToken);
    const collaboratorId = updatedCollaborator.body[0].token;

    const { body, status } = await request(app)
      .patch(`/supervisors/${collaboratorId}`)
      .send(newValues)
      .set("Authorization", collaboratorToken);

    expect(body).toHaveProperty("message");
    expect(status).toBe(403);
  });

  test("PATCH /collaborators/:id - Should not be ablue to update collaborator with invalid id", async () => {
    const newValues = { name: "bob" };

    const supervisorLogin = await request(app)
      .post("/login")
      .send(mockedSupervisorLogin);
    const token = `Bearer ${supervisorLogin}`;

    const updatedCollaborator = await request(app)
      .get("/collaborators")
      .set("Authorization", token);
    const updatedCollaboratorId = updatedCollaborator.body[0].id;

    const { body, status } = await request(app)
      .patch("/collaborators/13970660-5dbe-423a-9a9d-5c23b37943cf")
      .set("Authorization", token)
      .send(newValues);

    expect(body).toHaveProperty("message");
    expect(status).toBe(404);
  });

  test("PATCH /collaborators/:id - Should not be able to update is_supervisor field value", async () => {
    const newValues = { is_supervisor: false };

    const supervisorLogin = await request(app)
      .post("/login")
      .send(mockedSupervisorLogin);
    const token = `Bearer ${supervisorLogin.body.token}`;

    const updatedCollaborator = await request(app)
      .get("/collaborators")
      .set("Authorization", token);
    const updatedCollaboratorId = updatedCollaborator.body[0].id;

    const response = await request(app)
      .patch(`/collaborators/${updatedCollaboratorId}`)
      .set("Authorization", token)
      .send(newValues);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("PATCH /collaborators/:id - Should not be able to update is_active field value", async () => {
    const newValues = { is_active: false };

    const supervisorLogin = await request(app)
      .post("/login")
      .send(mockedSupervisorLogin);
    const token = `Bearer ${supervisorLogin.body.token}`;

    const updatedCollaborator = await request(app)
      .get("/collaborators")
      .set("Authorization", token);
    const updatedCollaboratorId = updatedCollaborator.body[0].id;

    const response = await request(app)
      .patch(`/collaborators/${updatedCollaboratorId}`)
      .set("Authorization", token)
      .send(newValues);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("PATCH /collaborators/:id - Should not be able to update id field value", async () => {
    const newValues = { id: false };

    const supervisorLogin = await request(app)
      .post("/login")
      .send(mockedSupervisorLogin);
    const token = `Bearer ${supervisorLogin.body.token}`;

    const updatedCollaborator = await request(app)
      .get("/collaborators")
      .set("Authorization", token);
    const updatedCollaboratorId = updatedCollaborator.body[0].id;

    const response = await request(app)
      .patch(`/collaborators/${updatedCollaboratorId}`)
      .set("Authorization", token)
      .send(newValues);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("DELETE /collaborators/:id - Must be able to soft delete a collaborator", async () => {
    await request(app).post("/collaborators").send(mockedSupervisor);

    const supervisorLogin = await request(app)
      .post("/login")
      .send(mockedSupervisorLogin);
    const token = `Bearer ${supervisorLogin.body.token}`;

    const deletedCollaborator = await request(app)
      .get("/collaborators")
      .set("Authorization", token);
    const deletedCollaboratorId = deletedCollaborator.body[0].id;

    const { status } = await request(app)
      .delete(`/collaborators/${deletedCollaboratorId}`)
      .set("Autorization", token);
    const { body } = await request(app)
      .get("/collaborators")
      .set("Authorization", token);

    expect(status).toBe(204);
    expect(body[0].is_active).toBe(false);
  });

  test("DELETE /collaborators/:id - Should not be able to delete a collaborator without supervisor permission", async () => {
    const supervisorLogin = await request(app)
      .post("/login")
      .send(mockedSupervisorLogin);
    const token = `Bearer ${supervisorLogin.body.token}`;

    const deletedCollaborator = await request(app)
      .get("/collaborators")
      .set("Authorization", token);
    const deletedCollaboratorId = deletedCollaborator.body[0].id;
    const deletedCollaboratorToken = deletedCollaborator.body.token;

    const { body, status } = await request(app)
      .delete(`/collaborators/${deletedCollaboratorId}`)
      .set("Autorization", deletedCollaboratorToken);

    expect(body).toHaveProperty("message");
    expect(status).toBe(403);
  });

  test("DELETE /collaborators/:id - Should not be able to delete user with is_active = false", async () => {
    await request(app).post("/supervisors").send(mockedSupervisor);

    const supervisorLogin = await request(app)
      .post("/login")
      .send(mockedSupervisorLogin);
    const token = `Bearer ${supervisorLogin.body.token}`;

    const deletedCollaborator = await request(app)
      .get("/collaborators")
      .set("Authorization", token);
    const deletedCollaboratorId = deletedCollaborator.body[0].id;

    const { body, status } = await request(app)
      .delete(`/collaborators/${deletedCollaboratorId}`)
      .set("Authorization", token);

    expect(status).toBe(400);
    expect(body).toHaveProperty("message");
  });

  test("DELETE /collaborators/:id - Should not be able to delete user with invalid id", async () => {
    await request(app).post("/supervisors").send(mockedSupervisor);

    const supervisorLogin = await request(app)
      .post("/login")
      .send(mockedSupervisorLogin);
    const token = supervisorLogin.body.token;

    const response = await request(app)
      .delete(`/collaborators/13970660-5dbe-423a-9a9d-5c23b37943cf`)
      .set("Authorization", token);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message");
  });
});
