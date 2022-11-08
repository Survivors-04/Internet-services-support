import { DataSource } from "typeorm";
import { AppDataSource } from "../../../data-source";
import request from "supertest";
import app from "../../../app";
import {
  mockedAttendance,
  mockedClient,
  mockedCollaborator,
  mockedInternetPlans,
  mockedManager,
  mockedManagerLogin,
  mockedSupervisor,
  mockedSupervisorLogin,
} from "../../mocks";
import { stat } from "fs";

describe("/plans", () => {
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

  test("POST /plans - Must be able to create a internet_plan", async () => {
    await request(app).post("/supervisors").send(mockedManager);

    const managerLogin = await request(app)
      .post("/login")
      .send(mockedManagerLogin);
    const token = `Bearer ${managerLogin.body.token}`;

    const { body, status } = await request(app)
      .post("/plans")
      .send(mockedInternetPlans)
      .set("Authorization", token);

    expect(body).toHaveProperty("id");
    expect(body).toHaveProperty("name");
    expect(body).toHaveProperty("description");
    expect(body).toHaveProperty("price");
    expect(body.name).toEqual("Teste");
    expect(body.description).toEqual("Teste123");
    expect(body.price).toEqual(400.0);
    expect(status).toBe(201);
  });

  test("POST /plans - Should not be able to create a Internet Plans that already exists", async () => {
    const { body, status } = await request(app)
      .post("/plans")
      .send(mockedInternetPlans);

    expect(body).toHaveProperty("message");
    expect(status).toBe(400);
  });

  test("POST /plans - Should not be able to create a internet_plans without manager permission", async () => {
    const supervisorLogin = await request(app)
      .post("/login")
      .send(mockedSupervisorLogin);

    const token = `Bearer ${supervisorLogin.body.token}`;

    const { body, status } = await request(app)
      .get("/plans")
      .set("Authorization", token);

    expect(body).toHaveProperty("message");
    expect(status).toBe(403);
  });

  test("GET /plans -  Must be able to list all Internet Plans", async () => {
    await request(app).post("/plans").send(mockedInternetPlans);

    const { body, status } = await request(app).get("/plans");

    expect(body).toHaveLength(1);
    expect(status).toBe(200);
  });

  test("GET /plans/:id/clients - Must be able to list all Clients by Internet Plan", async () => {
    await request(app).post("/supervisors").send(mockedSupervisor);

    const supervisorLogin = await request(app)
      .post("/login")
      .send(mockedSupervisorLogin);
    const token = `Bearer ${supervisorLogin.body.token}`;

    await request(app).post("/plans").send(mockedInternetPlans);

    const plan = await request(app).get("/plans").set("Authorization", token);
    const planId = plan.body[0].id;

    await request(app)
      .post("/clients")
      .send(mockedClient)
      .set("Authorization", token);

    const client = await request(app)
      .get("/clients")
      .set("Authorization", token);
    const clientId = client.body[0].id;

    await request(app)
      .post(`/clients/${clientId}/plans`)
      .send({ planId })
      .set("Authorization", token);

    const { body, status } = await request(app)
      .get(`/plans/${planId}/clients`)
      .set("Authorization", token);

    expect(body).toHaveLength(1);
    expect(status).toBe(200);
  });

  test("GET /plans/:id/clients - Should not be able to list all Clients by Internet Plan without collaborators permission", async () => {
    await request(app).post("/supervisors").send(mockedSupervisor);

    const supervisorLogin = await request(app)
      .post("/login")
      .send(mockedSupervisorLogin);
    const token = `Bearer ${supervisorLogin.body.token}`;

    await request(app).post("/plans").send(mockedInternetPlans);

    const plan = await request(app).get("/plans").set("Authorization", token);
    const planId = plan.body[0].id;

    await request(app)
      .post("/clients")
      .send(mockedClient)
      .set("Authorization", token);

    const client = await request(app)
      .get("/clients")
      .set("Authorization", token);
    const clientId = client.body[0].id;

    await request(app)
      .post(`/clients/${clientId}/plans`)
      .send({ planId })
      .set("Authorization", token);

    const { body, status } = await request(app)
      .get(`/plans/${planId}/clients`)
      .set("Authorization", "token");

    expect(body).toHaveProperty("message");
    expect(status).toBe(403);
  });

  test("PATCH /plans/:id -  Must be able to update internet plan", async () => {
    const newValues = {
      name: "planoTeste",
      description: "PlanoTesteDescription",
      price: 500.0,
    };

    const supervisorLogin = await request(app)
      .post("/login")
      .send(mockedSupervisorLogin);

    const token = `Bearer ${supervisorLogin.body.token}`;

    const userTobeUpdateRequest = await request(app).get("/plans");
    const plansTobeUpdateId = userTobeUpdateRequest.body[0].id;

    const { body, status } = await request(app)
      .patch(`/plans/${plansTobeUpdateId}`)
      .set("Authorization", token)
      .send(newValues);

    expect(body[0].name).toEqual("planoTeste");
    expect(body[0].description).toEqual("planoTeste");
    expect(body[0].price).toEqual(500.0);
    expect(status).toBe(200);
  });

  test("PATCH /plans/:id - Should not be able to update internet_plan without manager permission", async () => {
    await request(app).post("/supervisors").send(mockedSupervisor);
    const newValues = { name: "false" };

    const supervisorLogin = await request(app)
      .post("/login")
      .send(mockedSupervisorLogin);
    const supervisorToken = supervisorLogin.body.token;

    const updatedPlans = await request(app).get("/plans");
    const plansTobeUpdateId = updatedPlans.body[0].id;

    const { body, status } = await request(app)
      .patch(`/plans/${plansTobeUpdateId}`)
      .send(newValues)
      .set("Authorization", supervisorToken);

    expect(body).toHaveProperty("message");
    expect(status).toBe(403);
  });

  test("PATCH /plans/:id - Should not be ablue to update internet_Plans with invalid id", async () => {
    await request(app).post("/supervisors").send(mockedManager);
    const newValues = { name: "false" };

    const managerLogin = await request(app)
      .post("/login")
      .send(mockedManagerLogin);
    const token = managerLogin.body.token;

    const updatedPlans = await request(app).get("/plans");
    const plansTobeUpdateId = updatedPlans.body[0].id;

    const { body, status } = await request(app)
      .patch("/plans/b855d86b-d4c9-41cd-ab98-d7fa734c6ce4")
      .send(newValues)
      .set("Authorization", token);

    expect(body).toHaveProperty("message");
    expect(status).toBe(404);
  });

  test("DELETE /plans/:id - Must be able to delete internet_plan", async () => {
    await request(app).post("/supervisors").send(mockedManager);

    const managerLogin = await request(app)
      .post("/login")
      .send(mockedManagerLogin);
    const token = `Bearer ${managerLogin.body.token}`;

    const deletedPlan = await request(app)
      .get("/plans")
      .set("Authorization", token);
    const deletedPlanId = deletedPlan.body[0].id;

    const { body, status } = await request(app)
      .delete(`/plans/${deletedPlanId}`)
      .set("Authorization", token);

    expect(body).toHaveProperty("message");
    expect(status).toBe(204);
  });

  test("DELETE /plans/:id - Should not be able to delete internet_plan without manager permission", async () => {
    await request(app).post("/supervisors").send(mockedManager);
    await request(app).post("/supervisors").send(mockedSupervisor);

    const managerLogin = await request(app)
      .post("/login")
      .send(mockedManagerLogin);
    const token = `Bearer ${managerLogin.body.token}`;

    const supervisorLogin = await request(app)
      .post("/login")
      .send(mockedSupervisorLogin);
    const supervisorToken = supervisorLogin.body.token;

    await request(app)
      .post("/plans")
      .send(mockedInternetPlans)
      .set("Authorization", token);

    const deletedPlan = await request(app).get("/plans");
    const deletedPlanId = deletedPlan.body[0].id;

    const { body, status } = await request(app)
      .delete(`/plans/${deletedPlanId}`)
      .set("Authorization", supervisorToken);

    expect(body).toHaveProperty("message");
    expect(status).toBe(403);
  });

  test("DELETE /plan/:id - Should not be able to delete internet_plan with invalid id", async () => {
    const managerLogin = await request(app)
      .post("/login")
      .send(mockedManagerLogin);
    const token = `Bearer ${managerLogin.body.token}`;

    await request(app)
      .post("/plans")
      .send(mockedInternetPlans)
      .set("Authorization", token);

    const deletedPlan = await request(app).get("/plans");
    const deletedPlanId = deletedPlan.body[0].id;

    const { body, status } = await request(app)
      .delete(`/plans/13970660-5dbe-423a-9a9d-5c23b37943cf`)
      .set("Authorization", token);

    expect(body).toHaveProperty("message");
    expect(status).toBe(404);
  });
});
