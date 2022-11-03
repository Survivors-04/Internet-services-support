import { DataSource } from "typeorm";
import { AppDataSource } from "../../../data-source";
import request from "supertest";
import app from "../../../app";
import {
  mockedAttendance,
  mockedCollaborator,
  mockedInternetPlans,
  mockedManagerLogin,
  mockedSupervisorLogin,
} from "../../mocks";

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
    const { body, status } = await request(app)
      .post("/plans")
      .send(mockedInternetPlans);

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
    const { body, status } = await request(app).get("/plans");

    expect(status).toBe(200);
    expect(body).toHaveProperty("map");
  });

  test("PATCH /plans/:id -  Must be able to update supervisor", async () => {
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
      .patch(`/supervisors/${plansTobeUpdateId}`)
      .set("Autorization", token)
      .send(newValues);

    expect(body[0].name).toEqual("planoTeste");
    expect(body[0].description).toEqual("planoTeste");
    expect(body[0].price).toEqual(500.0);
    expect(status).toBe(200);
  });

  test("PATCH /plans/:id - Should not be able to update internet_plan without manager permission", async () => {
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
    const { body, status } = await request(app).get(
      "/plans/b855d86b-d4c9-41cd-ab98-d7fa734c6ce4"
    );

    expect(body).toHaveProperty("message");
    expect(status).toBe(404);
  });
});
