import { DataSource } from "typeorm";
import { AppDataSource } from "../../../data-source";
import request from "supertest";
import app from "../../../app";
import {
  mockedAttendance,
  mockedCollaborator,
  mockedInternetPlans,
  mockedManager,
  mockedManagerLogin,
  mockedSupervisorLogin,
  mockedTeams,
} from "../../mocks";

describe("/teams", () => {
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

  test("POST /teams - Must be able to create a team ", async () => {
    const supervisorLogin = await request(app)
      .post("/login")
      .send(mockedSupervisorLogin);
    const tokenSupervisor = `Bearer ${supervisorLogin.body.token}`;

    const managerLogin = await request(app)
      .post("/login")
      .send(mockedSupervisorLogin);
    const tokenManeger = `Bearer ${managerLogin.body.token}`;

    const collaborator = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${tokenSupervisor}`);

    const supervisor = await request(app)
      .get("/supervisors")
      .set("Authorization", tokenManeger);
    mockedTeams.collaborator_id = collaborator.body[0].id;
    mockedTeams.supervisor_id = supervisor.body[1].id;

    const { body, status } = await request(app)
      .post("/teams")
      .send(mockedTeams);

    expect(body).toHaveProperty("id");
    expect(body).toHaveProperty("supervisor_id");
    expect(body).toHaveProperty("collaborator_id");
    expect(status).toBe(201);
  });
});
