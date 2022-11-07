import { DataSource } from "typeorm";
import { AppDataSource } from "../../../data-source";
import request from "supertest";
import app from "../../../app";
import {
  mockedClient,
  mockedClientLogin,
  mockedCollaborator,
  mockedCollaboratorLogin,
  mockedManager,
  mockedManagerLogin,
  mockedService,
  mockedSupervisor,
  mockedSupervisorLogin,
} from "../../mocks";

describe("/services", () => {
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

  test("POST /services - Must be able to create a service", async () => {
    const { body, status } = await request(app)
      .post("/services")
      .send(mockedService);

    expect(body).toHaveProperty("id");
    expect(body).toHaveProperty("name");
    expect(body).toHaveProperty("description");
    expect(body.name).toEqual("Test");
    expect(body.description).toEqual("Description");
    expect(status).toBe(201);
  });

  test("POST /services - Should not be able to create a service without collaborator permission", async () => {
    await request(app).post("/clients").send(mockedClient);
    const clientLogin = await request(app)
      .post("/login")
      .send(mockedClientLogin);
    const token = `Bearer ${clientLogin.body.token}`;

    const { body, status } = await request(app)
      .get("/services")
      .set("Authorization", token);

    expect(body).toHaveProperty("message");
    expect(status).toBe(403);
  });

  test("GET /services - Must be able to list all services", async () => {
    await request(app).post("/supervisors").send(mockedManager);

    const managerLogin = await request(app)
      .post("/login")
      .send(mockedManagerLogin);
    const managerToken = managerLogin.body.token;

    const tste = await request(app)
      .post("/collaborators")
      .send(mockedCollaborator)
      .set("Authorization", managerToken);

    const collaboratorLogin = await request(app)
      .post("/login")
      .send(mockedCollaboratorLogin);
    const token = `Bearer ${collaboratorLogin.body.token}`;

    const { body } = await request(app)
      .get("/services")
      .set("Authorization", token);

    expect(body).toHaveLength(1);
  });

  test("GET /services - Should not be able to list services without collaborator permission", async () => {
    const clientLogin = await request(app)
      .post("/login")
      .send(mockedClientLogin);
    const token = `Bearer ${clientLogin.body.token}`;

    const { body, status } = await request(app)
      .get("/services")
      .set("Authorization", token);

    expect(body).toHaveProperty("message");
    expect(status).toBe(403);
  });

  test("PATCH /services/:id - Must be able to update a service", async () => {
    const newValues = {
      name: "Joana Brito",
      description: "joanabrito@mail.com",
    };

    const collaborator = await request(app)
      .post("/login")
      .send(mockedCollaboratorLogin);
    const token = `Bearer ${collaborator.body.token}`;

    const updatedService = await request(app)
      .get("/services")
      .set("Authorization", token);
    const updatedServiceId = updatedService.body[0].id;

    const { body, status } = await request(app)
      .patch(`/services/${updatedServiceId}`)
      .set("Authorization", token)
      .send(newValues);

    expect(body.name).toEqual("Joana Brito");
    expect(body.description).toEqual("joanabrito@mail.com");
    expect(status).toBe(200);
  });

  test("PATCH /services/:id - Should not be able to update service without collaborator permission", async () => {
    const newValues = { name: "false" };

    const collaboratorLogin = await request(app)
      .post("/login")
      .send(mockedCollaboratorLogin);
    const collaboratorToken = `Bearer ${collaboratorLogin.body.token}`;

    const clientLogin = await request(app)
      .post("/login")
      .send(mockedClientLogin);
    const clientToken = `Bearer ${clientLogin.body.token}`;

    const updatedService = await request(app)
      .get("/services")
      .set("Authorization", collaboratorToken);
    const serviceId = updatedService.body[0].token;

    const { body, status } = await request(app)
      .patch(`/services/${serviceId}`)
      .set("Authorization", clientToken)
      .send(newValues);

    expect(body).toHaveProperty("message");
    expect(status).toBe(403);
  });

  test("PATCH /services/:id - Should not be ablue to update service with invalid id", async () => {
    const newValues = { name: "bob" };

    const collaboratorLogin = await request(app)
      .post("/login")
      .send(mockedCollaboratorLogin);
    const token = `Bearer ${collaboratorLogin.body.token}`;

    const updatedService = await request(app)
      .get("/services")
      .set("Authorization", token);
    const updatedServiceId = updatedService.body[0].id;

    const { body, status } = await request(app)
      .patch("/services/13970660-5dbe-423a-9a9d-5c23b37943cf")
      .set("Authorization", token)
      .send(newValues);

    expect(body).toHaveProperty("message");
    expect(status).toBe(404);
  });

  test("PATCH /services/:id - Should not be able to update id field value", async () => {
    const newValues = { id: "13970660-5dbe-423a-9a9d-5c23b37943cf" };

    const collaboratorLogin = await request(app)
      .post("/login")
      .send(mockedCollaboratorLogin);
    const token = `Bearer ${collaboratorLogin.body.token}`;

    const updatedService = await request(app)
      .get("/services")
      .set("Authorization", token);
    const updatedServiceId = updatedService.body[0].id;

    const response = await request(app)
      .patch(`/services/${updatedServiceId}`)
      .set("Authorization", token)
      .send(newValues);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("DELETE /services/:id - Must be able to delete a service", async () => {
    await request(app).post("/supervisors").send(mockedManager);

    const managerLogin = await request(app)
      .post("/login")
      .send(mockedManagerLogin);
    const token = `Bearer ${managerLogin.body.token}`;
    console.log(token);

    const deletedService = await request(app)
      .get("/services")
      .set("Authorization", token);
    console.log(deletedService.body);
    const deletedServiceId = deletedService.body[0].id;

    const { status, body } = await request(app)
      .delete(`/services/${deletedServiceId}`)
      .set("Autorization", token);

    expect(body).toHaveProperty("message");
    expect(status).toBe(204);
  });

  test("DELETE /services/:id - Should not be able to delete a service without collaborator permission", async () => {
    await request(app).post("/supervisors").send(mockedSupervisor);
    await request(app).post("/services").send(mockedService);

    const supervisorLogin = await request(app)
      .post("/login")
      .send(mockedSupervisorLogin);
    const token = `Bearer ${supervisorLogin.body.token}`;

    const clientLogin = await request(app)
      .post("/login")
      .send(mockedClientLogin);
    const clientToken = `Bearer ${clientLogin.body.token}`;

    const deletedService = await request(app)
      .get("/services")
      .set("Authorization", token);
    const deletedServiceId = deletedService.body[0].id;

    const { body, status } = await request(app)
      .delete(`/services/${deletedServiceId}`)
      .set("Autorization", clientToken);

    expect(body).toHaveProperty("message");
    expect(status).toBe(403);
  });

  test("DELETE /services/:id - Should not be able to delete service with invalid id", async () => {
    await request(app).post("/services").send(mockedCollaborator);

    const collaboratorLogin = await request(app)
      .post("/login")
      .send(mockedCollaboratorLogin);
    const token = collaboratorLogin.body.token;

    const response = await request(app)
      .delete(`/services/13970660-5dbe-423a-9a9d-5c23b37943cf`)
      .set("Authorization", token);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(404);
  });
});
