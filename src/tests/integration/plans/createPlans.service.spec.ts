 import { DataSource } from "typeorm";
 import { AppDataSource } from "../../../data-source";
 import request from "supertest";
 import app from "../../../app";

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

   test("Post /plans", async () => {});

   describe("create internet_Plan", () => {
     test("Should indert the information of new internet_plan in the database", async () => {
       const name = "100 mega";
       const description = "internet boa";
       const price = 200.5;

      const userData = { name, description, price };

      const adminLoginResponse = await request(app)
        .post("/login")
         .send(userData);
       const response = await request(app)
         .post("/categories")
         .set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
        .send(userData);

       expect(response.body).toHaveProperty("name");
       expect(response.body).toHaveProperty("description");
       expect(response.body).toHaveProperty("price");
      expect(response.body).toHaveProperty("id");
      expect(response.status).toBe(201);
     });
   });
 });
