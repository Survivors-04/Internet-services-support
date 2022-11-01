import { DataSource } from "typeorm";
import { AppDataSource } from "../../../data-source";

describe("Create an Supervisor", () => {
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

  test("Should insert the information of new user in the database", async () => {});
});
