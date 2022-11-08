import { DataSource } from "typeorm";
import { AppDataSource } from "../../../data-source";
import request from "supertest";
import app from "../../../app";
import {
  mockedSupervisor,
  mockedSupervisorLogin,
  mockedCollaborator,
  mockedCollaboratorLogin,
  mockedManager,
  mockedManagerLogin,
} from "../../mocks";

describe("/collaborators", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) => {
        console.error("Error during Data Source initilization", err);
      });
    await request(app).post("/supervisors").send(mockedManager);
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("POST /collaborators - Must be able to create a collaborator", async () => {
    const managerLogin = await request(app)
      .post("/login")
      .send(mockedManagerLogin);
    const token = `Bearer ${managerLogin.body.token}`;

    const { body, status } = await request(app)
      .post("/collaborators")
      .send(mockedCollaborator)
      .set("Authorization", token);

    expect(body).toHaveProperty("id");
    expect(body).toHaveProperty("name");
    expect(body).toHaveProperty("email");
    expect(body).toHaveProperty("telephone");
    expect(body).toHaveProperty("cpf");
    expect(body).not.toHaveProperty("password");
    expect(body.name).toEqual("Teste");
    expect(body.email).toEqual("collaborator@mail.com");
    expect(body.telephone).toEqual("13984512783");
    expect(body.cpf).toEqual("12345678901");
    expect(body.is_active).toEqual(true);
    expect(status).toBe(201);
  });

  test("POST /collaborators - Should not be able to create a collaborator that already exists", async () => {
    const managerLogin = await request(app)
      .post("/login")
      .send(mockedManagerLogin);
    const token = `Bearer ${managerLogin.body.token}`;

    const { body, status } = await request(app)
      .post("/collaborators")
      .send(mockedCollaborator)
      .set("Authorization", token);

    expect(body).toHaveProperty("message");
    expect(status).toBe(400);
  });

  test("POST /collaborators - Should not be able to create a collaborator without supervisor permission", async () => {
    const managerLogin = await request(app)
      .post("/login")
      .send(mockedManagerLogin);
    const token = `Bearer ${managerLogin.body.token}`;

    await request(app)
      .post("/collaborators")
      .send(mockedCollaborator)
      .set("Authorization", token);

    const collaboratorLogin = await request(app)
      .post("/login")
      .send(mockedCollaboratorLogin)
      .set("Authorization", token);
    const collaboratorToken = `Bearer ${collaboratorLogin.body.token}`;

    const { body, status } = await request(app)
      .get("/collaborators")
      .set("Authorization", collaboratorToken);

    expect(body).toHaveProperty("message");
    expect(status).toBe(403);
  });

  test("GET /supevisors - Must be able to list all collaborators", async () => {
    const managerLogin = await request(app)
      .post("/login")
      .send(mockedManagerLogin);
    const token = `Bearer ${managerLogin.body.token}`;

    const { body } = await request(app)
      .get("/collaborators")
      .set("Authorization", token);

    expect(body).toHaveLength(1);
  });

  test("GET /collaborators - Should not be able to list collaborators without supervisor permission", async () => {
    const collaboratorLogin = await request(app)
      .post("/login")
      .send(mockedCollaboratorLogin);
    const collaboratorToken = `Bearer ${collaboratorLogin.body.token}`;

    const { body, status } = await request(app)
      .get("/collaborators")
      .set("Authorization", collaboratorToken);

    expect(body).toHaveProperty("message");
    expect(status).toBe(403);
  });

  test("PATCH /collaborators/:id - Must be able to update a collaborator", async () => {
    const newValues = { name: "Joana Brito", email: "joanabrito@mail.com" };

    const managerLogin = await request(app)
      .post("/login")
      .send(mockedManagerLogin);
    const token = `Bearer ${managerLogin.body.token}`;

    const updatedCollaborator = await request(app)
      .get("/collaborators")
      .set("Authorization", token);
    const updatedCollaboratorId = updatedCollaborator.body[0].id;

    const { body, status } = await request(app)
      .patch(`/collaborators/${updatedCollaboratorId}`)
      .send(newValues)
      .set("Authorization", token);

    expect(body).toHaveProperty("id");
    expect(body).toHaveProperty("name");
    expect(body).toHaveProperty("email");
    expect(body).toHaveProperty("telephone");
    expect(body).toHaveProperty("cpf");
    expect(body).not.toHaveProperty("password");
    expect(body.name).toEqual("Joana Brito");
    expect(body.email).toEqual("joanabrito@mail.com");
    expect(body.telephone).toEqual("13984512783");
    expect(body.cpf).toEqual("12345678901");
    expect(body.is_active).toEqual(true);
    expect(status).toBe(200);
  });

  test("PATCH /collaborators/:id - Should not be able to update collaborator without supervisor permission", async () => {
    const newValues = { name: "false" };

    const managerLogin = await request(app)
      .post("/login")
      .send(mockedManagerLogin);
    const token = `Bearer ${managerLogin.body.token}`;

    const collaborator = {
      name: "Teste",
      cpf: "12345678901",
      telephone: "13984512783",
      email: "collaborator2@mail.com",
      password: "Teste123"
    };

    const login = {
      email: 'collaborator2@mail.com',
      password: "Teste123"
    }

    await request(app)
      .post("/collaborators")
      .send(collaborator)
      .set("Authorization", token);

    const collaboratorLogin = await request(app)
      .post("/login")
      .send(login);
    console.log(collaboratorLogin)
    const collaboratorToken = `Bearer ${collaboratorLogin.body.token}`;
    console.log("collaboratorToken", collaboratorToken);

    const updatedCollaborator = await request(app)
      .get("/collaborators")
      .set("Authorization", token);
    const collaboratorId = updatedCollaborator.body[0].id;

    const { body, status } = await request(app)
      .patch(`/collaborators/${collaboratorId}`)
      .send(newValues)
      .set("Authorization", collaboratorToken);

    expect(body).toHaveProperty("message");
    expect(status).toBe(403);
  });

  test("PATCH /collaborators/:id - Should not be ablue to update collaborator with invalid id", async () => {
    const newValues = { name: "bob" };

    const managerLogin = await request(app)
      .post("/login")
      .send(mockedManagerLogin);
    const token = `Bearer ${managerLogin.body.token}`;

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

    const managerLogin = await request(app)
      .post("/login")
      .send(mockedManagerLogin);
    const token = `Bearer ${managerLogin.body.token}`;

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

    const managerLogin = await request(app)
      .post("/login")
      .send(mockedManagerLogin);
    const token = `Bearer ${managerLogin.body.token}`;

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

    const managerLogin = await request(app)
      .post("/login")
      .send(mockedManagerLogin);
    const token = `Bearer ${managerLogin.body.token}`;

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
    const managerLogin = await request(app)
      .post("/login")
      .send(mockedManagerLogin);
    const token = `Bearer ${managerLogin.body.token}`;

    const deletedCollaborator = await request(app)
      .get("/collaborators")
      .set("Authorization", token);
    const deletedCollaboratorId = deletedCollaborator.body[0].id;

    const { body, status } = await request(app)
      .delete(`/collaborators/${deletedCollaboratorId}`)
      .set("Autorization", token);

    expect(body).toHaveProperty("message");
    expect(status).toBe(204);
  });

  test("DELETE /collaborators/:id - Should not be able to delete a collaborator without supervisor permission", async () => {
    const managerLogin = await request(app)
      .post("/login")
      .send(mockedManagerLogin);
    const token = `Bearer ${managerLogin.body.token}`;

    const collaboratorLogin = await request(app)
      .post("/login")
      .send(mockedCollaboratorLogin);
    const collaboratorToken = `Bearer ${collaboratorLogin.body.token}`;

    const deletedCollaborator = await request(app)
      .get("/collaborators")
      .set("Authorization", token);
    const deletedCollaboratorId = deletedCollaborator.body[0].id;

    const { body, status } = await request(app)
      .delete(`/collaborators/${deletedCollaboratorId}`)
      .set("Autorization", collaboratorToken);

    expect(body).toHaveProperty("message");
    expect(status).toBe(403);
  });

  test("DELETE /collaborators/:id - Should not be able to delete user with is_active = false", async () => {
    const managerLogin = await request(app)
      .post("/login")
      .send(mockedManagerLogin);
    const token = `Bearer ${managerLogin.body.token}`;

    const deletedCollaborator = await request(app)
      .get("/collaborators")
      .set("Authorization", token);
    const deletedCollaboratorId = deletedCollaborator.body[0].id;

    const { body, status } = await request(app)
      .delete(`/collaborators/${deletedCollaboratorId}`)
      .set("Authorization", token);

    expect(body).toHaveProperty("message");
    expect(status).toBe(400);
  });

  test("DELETE /collaborators/:id - Should not be able to delete user with invalid id", async () => {
    const managerLogin = await request(app)
      .post("/login")
      .send(mockedManagerLogin);
    const token = `Bearer ${managerLogin.body.token}`;

    const { body, status } = await request(app)
      .delete(`/collaborators/13970660-5dbe-423a-9a9d-5c23b37943cf`)
      .set("Authorization", token);

    expect(body).toHaveProperty("message");
    expect(status).toBe(404);
  });
});
