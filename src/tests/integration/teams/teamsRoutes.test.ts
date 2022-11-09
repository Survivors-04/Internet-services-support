import { DataSource } from "typeorm";
import { AppDataSource } from "../../../data-source";
import request from "supertest";
import app from "../../../app";
import {
  collaboratorTeam,
  collaboratorTeam2,
  mockedAttendance,
  mockedClient,
  mockedClientLogin,
  mockedCollaborator,
  mockedInternetPlans,
  mockedManager,
  mockedManagerLogin,
  mockedSupervisor,
  mockedSupervisorLogin,
  mockedTeams,
  supervisorTeam,
} from "../../mocks";

describe("/teams", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });

    await request(app).post("/supervisors").send(mockedManager);
    await request(app).post("/clients").send(mockedClient);
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("POST /teams - Must be able to create a team", async () => {
    const managerLogin = await request(app)
      .post("/login")
      .send(mockedManagerLogin);
    const token = `Bearer ${managerLogin.body.token}`;

    await request(app)
      .post("/collaborators")
      .send(mockedCollaborator)
      .set("Authorization", token);

    const collaborator = await request(app)
      .get("/collaborators")
      .set("Authorization", token);
    const collaboratorId = collaborator.body[0].id;

    await request(app)
      .post("/supervisors")
      .send(mockedSupervisor)
      .set("Authorization", token);
    const supervisor = await request(app)
      .get("/supervisors")
      .set("Authorization", token);
    const supervisorId = supervisor.body[1].id;

    mockedTeams.collaboratorId = collaboratorId;
    mockedTeams.supervisorId = supervisorId;

    const { body, status } = await request(app)
      .post("/teams")
      .send(mockedTeams)
      .set("Authorization", token);

    expect(body).toHaveProperty("id");
    expect(body).toHaveProperty("supervisor");
    expect(body).toHaveProperty("collaborator");
    expect(status).toBe(201);
  });

  test("POST /teams - Should not be able to create a team with same supervisor ", async () => {
    const managerLogin = await request(app)
      .post("/login")
      .send(mockedManagerLogin);
    const token = `Bearer ${managerLogin.body.token}`;

    collaboratorTeam.email = "collaborator123@mail.com";
    collaboratorTeam.cpf = "75033181179375";

    await request(app)
      .post("/collaborators")
      .send(collaboratorTeam)
      .set("Authorization", token);

    const collaborator = await request(app)
      .get("/collaborators")
      .set("Authorization", token);
    const collaboratorId = collaborator.body[1].id;

    await request(app)
      .post("/supervisors")
      .send(mockedSupervisor)
      .set("Authorization", token);
    const supervisor = await request(app)
      .get("/supervisors")
      .set("Authorization", token);
    const supervisorId = supervisor.body[1].id;

    mockedTeams.collaboratorId = collaboratorId;
    mockedTeams.supervisorId = supervisorId;

    const { body, status } = await request(app)
      .post("/teams")
      .send(mockedTeams)
      .set("Authorization", token);

    expect(body).toHaveProperty("message");
    expect(status).toBe(400);
  });

  test("POST /teams - Should not be able to create a team with same collaborator ", async () => {
    const managerLogin = await request(app)
      .post("/login")
      .send(mockedManagerLogin);
    const token = `Bearer ${managerLogin.body.token}`;

    await request(app)
      .post("/collaborators")
      .send(mockedCollaborator)
      .set("Authorization", token);

    const collaborator = await request(app)
      .get("/collaborators")
      .set("Authorization", token);
    const collaboratorId = collaborator.body[0].id;

    supervisorTeam.email = "supervisor1@mail.com";
    supervisorTeam.cpf = "76138695783381";

    await request(app)
      .post("/supervisors")
      .send(supervisorTeam)
      .set("Authorization", token);
    const supervisor = await request(app)
      .get("/supervisors")
      .set("Authorization", token);
    const supervisorId = supervisor.body[2].id;

    mockedTeams.collaboratorId = collaboratorId;
    mockedTeams.supervisorId = supervisorId;

    const { body, status } = await request(app)
      .post("/teams")
      .send(mockedTeams)
      .set("Authorization", token);

    expect(body).toHaveProperty("id");
    expect(body).toHaveProperty("supervisor");
    expect(body).toHaveProperty("collaborator");
    expect(status).toBe(201);
  });

  test("POST /teams - Should not be able to create a team with invalid supervisor id", async () => {
    const managerLogin = await request(app)
      .post("/login")
      .send(mockedManagerLogin);
    const token = `Bearer ${managerLogin.body.token}`;

    const collaborator = await request(app)
      .get("/collaborators")
      .set("Authorization", token);
    const collaboratorId = collaborator.body[0].id;

    const supervisorId = "13970660-5dbe-423a-9a9d-5c23b37943cf";

    mockedTeams.collaboratorId = collaboratorId;
    mockedTeams.supervisorId = supervisorId;

    const { body, status } = await request(app)
      .post("/teams")
      .send(mockedTeams)
      .set("Authorization", token);

    expect(body).toHaveProperty("message");
    expect(status).toBe(404);
  });

  test("POST /teams - Should not be able to create a team with invalid collaborator id", async () => {
    const managerLogin = await request(app)
      .post("/login")
      .send(mockedManagerLogin);
    const token = `Bearer ${managerLogin.body.token}`;

    const collaborator = await request(app)
      .get("/collaborators")
      .set("Authorization", token);
    const collaboratorId = "13970660-5dbe-423a-9a9d-5c23b37943cf";

    supervisorTeam.email = "supervisor2@mail.com";
    supervisorTeam.cpf = "63481083169956";

    await request(app).post("/supervisors").send(supervisorTeam);

    const supervisor = await request(app)
      .get("/supervisors")
      .set("Authorization", token);
    const supervisorId = supervisor.body[3].id;

    mockedTeams.collaboratorId = collaboratorId;
    mockedTeams.supervisorId = supervisorId;

    const { body, status } = await request(app)
      .post("/teams")
      .send(mockedTeams)
      .set("Authorization", token);

    expect(body).toHaveProperty("message");
    expect(status).toBe(404);
  });

  test("POST /teams - Should not be able to create a team without supervisor permission", async () => {
    const managerLogin = await request(app)
      .post("/login")
      .send(mockedManagerLogin);
    const token = `Bearer ${managerLogin.body.token}`;

    collaboratorTeam.email = "collaborator1234@mail.com";
    collaboratorTeam.cpf = "72713606499511";

    const collaborator = await request(app)
      .post("/collaborators")
      .send(collaboratorTeam)
      .set("Authorization", token);
    const collaboratorId = collaborator.body.id;

    supervisorTeam.cpf = "92596621545408";
    supervisorTeam.email = "supervisor4@mail.com";

    const supervisor = await request(app)
      .post("/supervisors")
      .send(supervisorTeam)
      .set("Authorization", token);
    const supervisorId = supervisor.body.id;

    const clientLogin = await request(app)
      .post("/login")
      .send(mockedClientLogin);
    const clientToken = `Bearer ${clientLogin.body.token}`;

    mockedTeams.collaboratorId = collaboratorId;
    mockedTeams.supervisorId = supervisorId;

    const { body, status } = await request(app)
      .post("/teams")
      .send(mockedTeams)
      .set("Authorization", clientToken);

    expect(body).toHaveProperty("message");
    expect(status).toBe(403);
  });

  test("POST /teams/:id/collaborator - Must be able to inset collaborator in a team", async () => {
    const managerLogin = await request(app)
      .post("/login")
      .send(mockedManagerLogin);
    const token = `Bearer ${managerLogin.body.token}`;

    const team = await request(app).get("/teams").set("Authorization", token);
    const teamId = team.body[0].id;

    collaboratorTeam2.email = "collaborator6@mail.com";
    collaboratorTeam2.cpf = "53369494158739";

    const collaborator = await request(app)
      .post("/collaborators")
      .send(collaboratorTeam2)
      .set("Authorization", token);
    const collaboratorId = collaborator.body.id;

    const { body, status } = await request(app)
      .post(`/teams/${teamId}/collaborator`)
      .send({ collaboratorId })
      .set("Authorization", token);

    expect(body).toHaveProperty("message");
    expect(status).toBe(201);
  });

  test("POST /teams/:id/collaborator - Should not be able to inset collaborator in a team with invalid team id", async () => {
    const managerLogin = await request(app)
      .post("/login")
      .send(mockedManagerLogin);
    const token = `Bearer ${managerLogin.body.token}`;

    const team = await request(app).get("/teams").set("Authorization", token);
    const teamId = "13970660-5dbe-423a-9a9d-5c23b37943cf";

    collaboratorTeam.email = "collaborator7@mail.com";
    collaboratorTeam.cpf = "99723439230564";

    const collaborator = await request(app)
      .post("/collaborators")
      .send(collaboratorTeam)
      .set("Authorization", token);
    const collaboratorId = collaborator.body.id;

    const { body, status } = await request(app)
      .post(`/teams/${teamId}/collaborator`)
      .send({ collaboratorId })
      .set("Authorization", token);

    expect(body).toHaveProperty("message");
    expect(status).toBe(404);
  });

  test("POST /teams/:id/collaborator - Should not be able to inset collaborator in a team with invalid collaborator id", async () => {
    const managerLogin = await request(app)
      .post("/login")
      .send(mockedManagerLogin);
    const token = `Bearer ${managerLogin.body.token}`;

    const team = await request(app).get("/teams").set("Authorization", token);
    const teamId = team.body[0].id;

    collaboratorTeam.email = "collaborator88@mail.com";
    collaboratorTeam.cpf = "36429781364258";

    const collaborator = await request(app)
      .post("/collaborators")
      .send(collaboratorTeam)
      .set("Authorization", token);
    const collaboratorId = "13970660-5dbe-423a-9a9d-5c23b37943cf";

    const { body, status } = await request(app)
      .post(`/teams/${teamId}/collaborator`)
      .send({ collaboratorId })
      .set("Authorization", token);

    expect(body).toHaveProperty("message");
    expect(status).toBe(404);
  });

  test("POST /teams/:id/collaborator - Should not be able to inset collaborator in a team without supervisor permission", async () => {
    const managerLogin = await request(app)
      .post("/login")
      .send(mockedManagerLogin);
    const token = `Bearer ${managerLogin.body.token}`;

    const clientLogin = await request(app)
      .post("/login")
      .send(mockedClientLogin);
    const clientToken = `Bearer ${clientLogin.body.token}`;

    const team = await request(app).get("/teams").set("Authorization", token);
    const teamId = team.body[0].id;

    collaboratorTeam.email = "collaborator10@mail.com";
    collaboratorTeam.cpf = "75393722007833";

    const collaborator = await request(app)
      .post("/collaborators")
      .send(collaboratorTeam)
      .set("Authorization", token);
    const collaboratorId = collaborator.body.id;

    const { body, status } = await request(app)
      .post(`/teams/${teamId}/collaborator`)
      .send({ collaboratorId })
      .set("Authorization", clientToken);

    expect(body).toHaveProperty("message");
    expect(status).toBe(403);
  });

  test("GET /teams - Must be able to list all teams", async () => {
    const managerLogin = await request(app)
      .post("/login")
      .send(mockedManagerLogin);
    const token = `Bearer ${managerLogin.body.token}`;

    const { body, status } = await request(app)
      .get("/teams")
      .set("Authorization", token);

    expect(body).toHaveLength(2);
    expect(status).toBe(200);
  });

  test("GET /teams - Should not be able to list all teams without collaborator permission", async () => {
    const clientLogin = await request(app)
      .post("/login")
      .send(mockedClientLogin);
    const token = `Bearer ${clientLogin.body.token}`;

    const { body, status } = await request(app)
      .get("/teams")
      .set("Authorization", token);

    expect(body).toHaveProperty("message");
    expect(status).toBe(403);
  });

  test("GET /teams/:id - Must be able to list a team by id", async () => {
    const managerLogin = await request(app)
      .post("/login")
      .send(mockedManagerLogin);
    const token = `Bearer ${managerLogin.body.token}`;

    const team = await request(app).get("/teams").set("Authorization", token);
    const teamId = team.body[0].id;

    const { body, status } = await request(app)
      .get(`/teams/${teamId}`)
      .set("Authorization", token);

    expect(body).toHaveProperty("id");
    expect(body).toHaveProperty("supervisor");
    expect(body).toHaveProperty("collaborator");
    expect(status).toBe(200);
  });

  test("GET /teams/:id - Should not be able to list a team with invalid id", async () => {
    const managerLogin = await request(app)
      .post("/login")
      .send(mockedManagerLogin);
    const token = `Bearer ${managerLogin.body.token}`;

    const team = await request(app).get("/teams").set("Authorization", token);
    const teamId = "13970660-5dbe-423a-9a9d-5c23b37943cf";

    const { body, status } = await request(app)
      .get(`/teams/${teamId}`)
      .set("Authorization", token);

    expect(body).toHaveProperty("message");
    expect(status).toBe(404);
  });

  test("GET /teams/:id - Should not be able to list a team without collaborator permission", async () => {
    const managerLogin = await request(app)
      .post("/login")
      .send(mockedManagerLogin);
    const token = `Bearer ${managerLogin.body.token}`;

    const clientLogin = await request(app)
      .post("/login")
      .send(mockedClientLogin);
    const clientToken = `Bearer ${clientLogin.body.token}`;

    const team = await request(app).get("/teams").set("Authorization", token);
    const teamId = team.body[0].id;

    const { body, status } = await request(app)
      .get(`/teams/${teamId}`)
      .set("Authorization", clientToken);

    expect(body).toHaveProperty("message");
    expect(status).toBe(403);
  });

  test("GET /teams/supervisor/:id - Must be able to list a team by supervisor id", async () => {
    const managerLogin = await request(app)
      .post("/login")
      .send(mockedManagerLogin);
    const token = `Bearer ${managerLogin.body.token}`;

    const team = await request(app).get("/teams").set("Authorization", token);
    const supervisorId = team.body[0].supervisor.id;

    const { body, status } = await request(app)
      .get(`/teams/supervisor/${supervisorId}`)
      .set("Authorization", token);

    console.log(body);
    expect(body[0]).toHaveProperty("id");
    expect(body[0]).toHaveProperty("collaborator");
    expect(body[0]).toHaveProperty("supervisor");
    expect(status).toBe(200);
  });

  test("GET /teams/supervisor/:id - Should not be able to list a team with invalid supervisor id", async () => {
    const managerLogin = await request(app)
      .post("/login")
      .send(mockedManagerLogin);
    const token = `Bearer ${managerLogin.body.token}`;

    const team = await request(app).get("/teams").set("Authorization", token);
    const supervisorId = "13970660-5dbe-423a-9a9d-5c23b37943cf";

    const { body, status } = await request(app)
      .get(`/teams/supervisor/${supervisorId}`)
      .set("Authorization", token);

    expect(body).toHaveProperty("message");
    expect(status).toBe(404);
  });

  test("GET /teams/supervisor/:id - Must be able to list a team by supervisor without manager permission", async () => {
    const managerLogin = await request(app)
      .post("/login")
      .send(mockedManagerLogin);
    const token = `Bearer ${managerLogin.body.token}`;

    const team = await request(app).get("/teams").set("Authorization", token);
    const supervisorId = team.body[0].supervisor.id;

    const clientLogin = await request(app)
      .post("/login")
      .send(mockedClientLogin);
    const clientToken = `Bearer ${clientLogin.body.token}`;

    const { body, status } = await request(app)
      .get(`/teams/supervisor/${supervisorId}`)
      .set("Authorization", clientToken);

    expect(body).toHaveProperty("message");
    expect(status).toBe(403);
  });

  test("DELETE /teams/:id - Must be able to delete a team", async () => {
    const managerLogin = await request(app)
      .post("/login")
      .send(mockedManagerLogin);
    const token = `Bearer ${managerLogin.body.token}`;

    const team = await request(app).get("/teams").set("Authorization", token);
    const teamId = team.body[0].id;

    const { body, status } = await request(app)
      .delete(`/teams/${teamId}`)
      .set("Authorization", token);

    expect(body).toHaveProperty("message");
    expect(status).toBe(202);
  });
});
