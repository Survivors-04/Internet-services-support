import { DataSource } from "typeorm";
import { AppDataSource } from "../../../data-source";
import request from "supertest";
import app from "../../../app";
import { mockedCollaborator, mockedInternetPlans } from "../../mocks";

describe("/internet_plan", () => {
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

  test("POST /plans", async () => {});

  describe("create internet_Plan", () => {
    test("Should indert the information of new internet_plan in the database", async () => {
      const { body, status } = await request(app)
        .post("/plans")
        .send(mockedInternetPlans);

      expect(body).toHaveProperty("name");
      expect(body).toHaveProperty("description");
      expect(body).toHaveProperty("price");
      expect(body).toHaveProperty("id");
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
  });

  test("GET /plans -  Must be able to list all Internet Plans", async () => {
    const response = await request(app).get("/plans");
    expect(response.body).toHaveLength(1);
    expect(response.status).toBe(200);
  });

  test("PATCH /plans/:id -  should not be able to update user without authentication", async () => {
    const role = { role: 2 };
    const adminLoginResponse = await request(app)
      .post("/login")
      .send(mockedCollaborator);
    const token = `Bearer ${adminLoginResponse.body.token}`;

    const userTobeUpdateRequest = await request(app)
      .get("/plans")
      .set("Authorization", token);
    const userTobeUpdateId = userTobeUpdateRequest.body[0].id;

    const response = await request(app)
      .patch(`/users/${userTobeUpdateId}`)
      .set("Authorization", token)
      .send(role);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });
});
