import { DataSource } from "typeorm";
import { AppDataSource } from "../../../data-source";
import request from "supertest";
import app from "../../../app";
import {
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
    expect(body).toHaveProperty("supervisorId");
    expect(body).toHaveProperty("collaboratorId");
    expect(status).toBe(201);
  });

  test("POST /teams - Should not be able to create a team with same supervisor ", async () => {
    const managerLogin = await request(app)
      .post("/login")
      .send(mockedManagerLogin);
    const token = `Bearer ${managerLogin.body.token}`;

    const collaboratorTeam = {
      name: "Supervisor",
      email: "collaborator123@mail.com",
      password: "collaborator123",
      cpf: "199724669999",
      telephone: "999999999",
      is_manager: false,
    };

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

    const supervisorTeam = {
      name: "Supervisor",
      email: "supervisor1@mail.com",
      password: "supervisor1",
      cpf: "199724661476",
      telephone: "999999999",
      is_manager: false,
    };

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
    expect(body).toHaveProperty("supervisorId");
    expect(body).toHaveProperty("collaboratorId");
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

    const supervisorTeam = {
      name: "Supervisor",
      email: "supervisor2@mail.com",
      password: "supervisor2",
      cpf: "199724287165",
      telephone: "999999999",
      is_manager: false,
    };

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

    const collaboratorTeam = {
      name: "Supervisor",
      email: "collaborator1234@mail.com",
      password: "collaborator1234",
      cpf: "199724665719",
      telephone: "999999999",
      is_manager: false,
    };

    const collaborator = await request(app)
      .post("/collaborators")
      .send(collaboratorTeam)
      .set("Authorization", token);
    const collaboratorId = collaborator.body.id;

    const supervisorTeam = {
      name: "Supervisor",
      email: "supervisor4@mail.com",
      password: "supervisor4",
      cpf: "199724287165",
      telephone: "999999999",
      is_manager: false,
    };

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

    const collaboratorTeam = {
      name: "Supervisor",
      email: "collaborator5@mail.com",
      password: "collaborator5",
      cpf: "193479565719",
      telephone: "999999999",
      is_manager: false,
    };

    const collaborator = await request(app)
      .post("/collaborators")
      .send(collaboratorTeam)
      .set("Authorization", token);
    const collaboratorId = collaborator.body.id;

    const supervisorTeam = {
      name: "Supervisor",
      email: "supervisor5@mail.com",
      password: "supervisor5",
      cpf: "199785214965",
      telephone: "999999999",
      is_manager: false,
    };

    const supervisor = await request(app)
      .post("/supervisors")
      .send(supervisorTeam)
      .set("Authorization", token);
    const supervisorId = supervisor.body.id;

    mockedTeams.collaboratorId = collaboratorId;
    mockedTeams.supervisorId = supervisorId;

    const team = await request(app)
      .post("/teams")
      .send(mockedTeams)
      .set("Authorization", token);
    const teamId = team.body.id;

    const collaborator2Team = {
      name: "Supervisor",
      email: "collaborator6@mail.com",
      password: "collaborator6",
      cpf: "193477423719",
      telephone: "999999999",
      is_manager: false,
    };

    const collaborator2 = await request(app)
      .post("/collaborators")
      .send(collaborator2Team)
      .set("Authorization", token);
    const collaborator2Id = collaborator2.body.id;

    const { body, status } = await request(app)
      .post(`/teams/${teamId}/collaborator`)
      .send({ collaboratorId: collaborator2Id })
      .set("Authorization", token);

    expect(body).toHaveProperty("message");
    expect(status).toBe(201);
  });

  test("POST /teams/:id/collaborator - Should not be able to inset collaborator in a team with invalid plan id", async () => {
    const managerLogin = await request(app)
      .post("/login")
      .send(mockedManagerLogin);
    const token = `Bearer ${managerLogin.body.token}`;

    const collaboratorTeam = {
      name: "Supervisor",
      email: "collaborator5@mail.com",
      password: "collaborator5",
      cpf: "193479565719",
      telephone: "999999999",
      is_manager: false,
    };

    const collaborator = await request(app)
      .post("/collaborators")
      .send(collaboratorTeam)
      .set("Authorization", token);
    const collaboratorId = collaborator.body.id;

    const supervisorTeam = {
      name: "Supervisor",
      email: "supervisor5@mail.com",
      password: "supervisor5",
      cpf: "199785214965",
      telephone: "999999999",
      is_manager: false,
    };

    const supervisor = await request(app)
      .post("/supervisors")
      .send(supervisorTeam)
      .set("Authorization", token);
    const supervisorId = supervisor.body.id;

    mockedTeams.collaboratorId = collaboratorId;
    mockedTeams.supervisorId = supervisorId;

    const team = await request(app)
      .post("/teams")
      .send(mockedTeams)
      .set("Authorization", token);
    const teamId = team.body.id;

    const collaborator2Team = {
      name: "Supervisor",
      email: "collaborator6@mail.com",
      password: "collaborator6",
      cpf: "193477423719",
      telephone: "999999999",
      is_manager: false,
    };

    const collaborator2 = await request(app)
      .post("/collaborators")
      .send(collaborator2Team)
      .set("Authorization", token);
    const collaborator2Id = collaborator2.body.id;

    const { body, status } = await request(app)
      .post(`/teams/${teamId}/collaborator`)
      .send({ collaboratorId: collaborator2Id })
      .set("Authorization", token);

    expect(body).toHaveProperty("message");
    expect(status).toBe(201);
  });
});
