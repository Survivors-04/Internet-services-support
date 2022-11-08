import { DataSource, TableForeignKey } from "typeorm";
import { AppDataSource } from "../../../data-source";
import request from "supertest";
import app from "../../../app";
import {
  mockedAttendance,
  mockedClient,
  mockedClientDeleted,
  mockedClientLogin,
  mockedCollaborator,
  mockedInternetPlans,
  mockedInternetPlans2,
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
    await request(app).post("/supervisors").send(mockedManager);
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("POST /clients - Must be able to create a client", async () => {
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

  test("POST /clients/:id/plans - Must be able to create a client internet plan", async () => {
    const managerLogin = await request(app)
      .post("/login")
      .send(mockedManagerLogin);
    const token = `Bearer ${managerLogin.body.token}`;

    const client = await request(app)
      .get("/clients")
      .set("Authorization", token);
    const clientId = client.body[0].id;

    const plan = await request(app)
      .post("/plans")
      .send(mockedInternetPlans)
      .set("Authorization", token);
    const internet_plan_id = plan.body.id;

    const { body, status } = await request(app)
      .post(`/clients/${clientId}/plans`)
      .send({ internet_plan_id })
      .set("Authorization", token);

    expect(body).toHaveProperty("message");
    expect(status).toBe(201);
  });

  test("POST /clients/:id/plans - Should not be able to create a client internet plan with invalid client id", async () => {
    const managerLogin = await request(app)
      .post("/login")
      .send(mockedManagerLogin);
    const token = `Bearer ${managerLogin.body.token}`;

    const client = await request(app)
      .get("/clients")
      .set("Authorization", token);
    const clientId = client.body[0].id;

    const plan = await request(app).get("/plans").set("Authorization", token);
    const internet_plan_id = plan.body[0].id;

    const { body, status } = await request(app)
      .post(`/clients/13970660-5dbe-423a-9a9d-5c23b37943cf/plans`)
      .send({ internet_plan_id })
      .set("Authorization", token);

    expect(body).toHaveProperty("message");
    expect(status).toBe(404);
  });

  test("POST /clients/:id/plans - Should not be able to create a client internet plan with invalid plan id", async () => {
    const managerLogin = await request(app)
      .post("/login")
      .send(mockedManagerLogin);
    const token = `Bearer ${managerLogin.body.token}`;

    const client = await request(app)
      .get("/clients")
      .set("Authorization", token);
    const clientId = client.body[0].id;

    const plan = await request(app).get("/plans").set("Authorization", token);
    const internet_plan_id = "13970660-5dbe-423a-9a9d-5c23b37943cf";

    const { body, status } = await request(app)
      .post(`/clients/${clientId}/plans`)
      .send({ internet_plan_id })
      .set("Authorization", token);

    expect(body).toHaveProperty("message");
    expect(status).toBe(404);
  });

  test("POST /clients/:id/plans - Should not be able to create a client internet plan without collaborator permission", async () => {
    const managerLogin = await request(app)
      .post("/login")
      .send(mockedManagerLogin);
    const token = `Bearer ${managerLogin.body.token}`;

    const client = await request(app)
      .get("/clients")
      .set("Authorization", token);
    const clientId = client.body[0].id;

    const clientLogin = await request(app)
      .post("/login")
      .send(mockedClientLogin);
    const clientToken = `Bearer ${clientLogin.body.token}`;

    const plan = await request(app)
      .post("/plans")
      .send(mockedInternetPlans2)
      .set("Authorization", token);
    const internet_plan_id = plan.body.id;

    const { body, status } = await request(app)
      .post(`/clients/${clientId}/plans`)
      .send({ internet_plan_id })
      .set("Authorization", clientToken);

    expect(body).toHaveProperty("message");
    expect(status).toBe(403);
  });

  test("GET /clients - Must be able to list all clients", async () => {
    const managerLogin = await request(app)
      .post("/login")
      .send(mockedManagerLogin);
    const token = `Bearer ${managerLogin.body.token}`;

    const { body, status } = await request(app)
      .get("/clients")
      .set("Authorization", token);

    expect(body).toHaveLength(1);
    expect(status).toBe(200);
  });

  test("GET /clients - Should not be able to list all attendances without collaborator permission", async () => {
    const managerLogin = await request(app)
      .post("/login")
      .send(mockedManagerLogin);
    const token = `Bearer ${managerLogin.body.token}`;

    const clientLogin = await request(app)
      .post("/login")
      .send(mockedClientLogin);
    const clientToken = `Bearer ${clientLogin.body.token}`;

    const { body, status } = await request(app)
      .get("/clients")
      .set("Authorization", clientToken);

    expect(body).toHaveProperty("message");
    expect(status).toBe(403);
  });

  test("GET /clients/:id - Must be able to list a client by own id", async () => {
    const managerLogin = await request(app)
      .post("/login")
      .send(mockedManagerLogin);
    const token = `Bearer ${managerLogin.body.token}`;

    const client = await request(app)
      .get("/clients")
      .set("Authorization", token);
    const clientId = client.body[0].id;

    const clientLogin = await request(app)
      .post("/login")
      .send(mockedClientLogin);
    const clientToken = `Bearer ${clientLogin.body.token}`;

    const { body, status } = await request(app)
      .get(`/clients/${clientId}`)
      .set("Authorization", clientToken);

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
    expect(status).toBe(200);
  });

  test("GET /clients/:id - Should not be able to list a client with invalid id", async () => {
    const managerLogin = await request(app)
      .post("/login")
      .send(mockedManagerLogin);
    const token = `Bearer ${managerLogin.body.token}`;

    const client = await request(app)
      .get("/clients")
      .set("Authorization", token);
    const clientId = client.body[0].id;

    const { body, status } = await request(app)
      .get(`/clients/13970660-5dbe-423a-9a9d-5c23b37943cf`)
      .set("Authorization", token);

    expect(body).toHaveProperty("message");
    expect(status).toBe(404);
  });

  test("GET /clients/:id - Should not be able to list other client without collaborator permission", async () => {
    const managerLogin = await request(app)
      .post("/login")
      .send(mockedManagerLogin);
    const token = `Bearer ${managerLogin.body.token}`;

    const client2 = {
      name: "Supervisor",
      email: "client2@mail.com",
      password: "client2",
      cpf: "19995555599",
      telephone: "999999999",
      is_manager: false,
    };

    await request(app)
      .post("/clients")
      .send(client2)
      .set("Authorization", token);

    const client = await request(app)
      .get("/clients")
      .set("Authorization", token);
    const clientId = client.body[1].id;

    const clientLogin = await request(app)
      .post("/login")
      .send(mockedClientLogin);
    const clientToken = `Bearer ${clientLogin.body.token}`;
    // console.log(clientId)
    // console.log(clientToken)
    const { body, status } = await request(app)
      .get(`/clients/${clientId}`)
      .set("Authorization", clientToken);

    expect(body).toHaveProperty("message");
    expect(status).toBe(403);
  });

  test("DELETE /clients - Must be able to soft delete a client", async () => {
    const managerLogin = await request(app)
      .post("/login")
      .send(mockedManagerLogin);
    const token = `Bearer ${managerLogin.body.token}`;

    const deletedClient = await request(app)
      .post("/clients")
      .send(mockedClientDeleted)
      .set("Authorization", token);
    const deletedClientId = deletedClient.body.id;

    const { body, status } = await request(app)
      .delete(`/clients/${deletedClientId}`)
      .set("Authorization", token);

    expect(body).toHaveProperty("message");
    expect(status).toBe(202);
  });

  test("DELETE /clients - Should not be able to soft delete a client with invalid id", async () => {
    const managerLogin = await request(app)
      .post("/login")
      .send(mockedManagerLogin);
    const token = `Bearer ${managerLogin.body.token}`;

    const deletedClient = await request(app)
      .get("/clients")
      .set("Authorization", token);

    const { body, status } = await request(app)
      .delete(`/clients/13970660-5dbe-423a-9a9d-5c23b37943cf`)
      .set("Authorization", token);

    expect(body).toHaveProperty("message");
    expect(status).toBe(404);
  });

  test("DELETE /clients/:id - Should not be able to soft delete a client without collaborator permission", async () => {
    const managerLogin = await request(app)
      .post("/login")
      .send(mockedManagerLogin);
    const token = `Bearer ${managerLogin.body.token}`;

    const deletedClient = await request(app)
      .get("/clients")
      .set("Authorization", token);
    const deletedClientId = deletedClient.body[0].id;

    const clientLogin = await request(app)
      .post("/login")
      .send(mockedClientLogin);
    const clientToken = `Bearer ${clientLogin.body.token}`;

    const { body, status } = await request(app)
      .delete(`/clients/${deletedClientId}`)
      .set("Authorization", clientToken);

    expect(body).toHaveProperty("message");
    expect(status).toBe(403);
  });

  test("DELETE /clients/:id - Should not be able to soft delete a client with is_active = false", async () => {
    const managerLogin = await request(app)
      .post("/login")
      .send(mockedManagerLogin);
    const token = `Bearer ${managerLogin.body.token}`;

    const deletedClient = await request(app)
      .get("/clients")
      .set("Authorization", token);
    const deletedClientId = deletedClient.body[2].id;

    const { body, status } = await request(app)
      .delete(`/clients/${deletedClientId}`)
      .set("Authorization", token);

    expect(body).toHaveProperty("message");
    expect(status).toBe(400);
  });

  test("DELETE /clients/:id/plans - Must be able to delete internet plan from client", async () => {
    const managerLogin = await request(app)
      .post("/login")
      .send(mockedManagerLogin);
    const token = `Bearer ${managerLogin.body.token}`;

    const client = await request(app)
      .get("/clients")
      .set("Authorization", token);
    const clientId = client.body[0].id;

    const internet_plan_id = client.body[0].client_plan[0].id;

    const { body, status } = await request(app)
      .delete(`/clients/${clientId}/plans`)
      .set("Authorization", token)
      .send({ internet_plan_id });

    expect(body).toHaveProperty("message");
    expect(status).toBe(202);
  });

  test("DELETE /clients/:id/plans - Should not be able to delete a client internet plan with invalid id", async () => {
    const managerLogin = await request(app)
      .post("/login")
      .send(mockedManagerLogin);
    const token = `Bearer ${managerLogin.body.token}`;

    const client = await request(app)
      .get("/clients")
      .set("Authorization", token);
    const clientId = client.body[0].id;

    const internet_plan_id = "13970660-5dbe-423a-9a9d-5c23b37943cf";

    const { body, status } = await request(app)
      .delete(`/clients/${clientId}/plans`)
      .send({ internet_plan_id })
      .set("Authorization", token);

    expect(body).toHaveProperty("message");
    expect(status).toBe(404);
  });

  test("DELETE /clients/:id/plans - Should not be able to soft delete a client without collaborator permission", async () => {
    const managerLogin = await request(app)
      .post("/login")
      .send(mockedManagerLogin);
    const token = `Bearer ${managerLogin.body.token}`;

    const client = await request(app)
      .get("/clients")
      .set("Authorization", token);
    const clientId = client.body[0].id;

    const clientLogin = await request(app)
      .post("/login")
      .send(mockedClientLogin);
    const clientToken = `Bearer ${clientLogin.body.token}`;

    const internet_plan_id = client.body[0].client_plan[0].id;

    const { body, status } = await request(app)
      .delete(`/clients/${clientId}/plans`)
      .set("Authorization", clientToken)
      .send({ internet_plan_id });
    console.log(body)
    expect(body).toHaveProperty("message");
    expect(status).toBe(403);
  });
});
