import { MigrationInterface, QueryRunner } from "typeorm";

export class createTable1668037512743 implements MigrationInterface {
    name = 'createTable1668037512743'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Internet_plan" ("id" uuid NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "price" numeric NOT NULL, CONSTRAINT "PK_83a31a3696a6c778f4af53a89d4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "client_plan" ("id" uuid NOT NULL, "clientId" uuid, "internetPlanId" uuid, CONSTRAINT "PK_c99e3034c46819566628dbcd415" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Client" ("id" uuid NOT NULL, "name" character varying(120) NOT NULL, "cpf" character varying(14) NOT NULL, "telephone" character varying NOT NULL, "email" character varying(100) NOT NULL, "password" character varying(120) NOT NULL, "is_active" boolean NOT NULL DEFAULT true, "created_date" TIMESTAMP NOT NULL DEFAULT now(), "updated_date" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_b79874c8d411b839b9ccc301972" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "supervisor" ("id" uuid NOT NULL, "name" character varying NOT NULL, "cpf" character varying(14) NOT NULL, "telephone" character varying(11) NOT NULL, "email" character varying(100) NOT NULL, "is_manager" boolean NOT NULL, "is_active" boolean NOT NULL DEFAULT true, "password" character varying(120) NOT NULL, CONSTRAINT "PK_6364b1ffaa6ca051de919c802ed" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "team" ("id" uuid NOT NULL, "supervisorId" uuid, CONSTRAINT "REL_85f54c508d75698f62cb3e0b1e" UNIQUE ("supervisorId"), CONSTRAINT "PK_f57d8293406df4af348402e4b74" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "collaborator" ("id" uuid NOT NULL, "name" character varying NOT NULL, "is_active" boolean NOT NULL DEFAULT true, "cpf" character varying(14) NOT NULL, "telephone" character varying(11) NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "teamId" uuid, CONSTRAINT "PK_aa48142926d7bdb485d21ad2696" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "services" ("id" uuid NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_ba2d347a3168a296416c6c5ccb2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "attendance" ("id" uuid NOT NULL, "date" TIMESTAMP NOT NULL DEFAULT now(), "is_active" boolean NOT NULL DEFAULT true, "serviceId" uuid, "clientId" uuid, "collaboratorId" uuid, CONSTRAINT "REL_86d744c804943a507cac76a78b" UNIQUE ("serviceId"), CONSTRAINT "PK_ee0ffe42c1f1a01e72b725c0cb2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "client_plan" ADD CONSTRAINT "FK_ce84c85e4d762fbde216d5a99d5" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "client_plan" ADD CONSTRAINT "FK_cc87ca427ca47245433edcf729a" FOREIGN KEY ("internetPlanId") REFERENCES "Internet_plan"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "team" ADD CONSTRAINT "FK_85f54c508d75698f62cb3e0b1e1" FOREIGN KEY ("supervisorId") REFERENCES "supervisor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "collaborator" ADD CONSTRAINT "FK_9563b5bc4e0dc8bb29e04a7c1d6" FOREIGN KEY ("teamId") REFERENCES "team"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "attendance" ADD CONSTRAINT "FK_86d744c804943a507cac76a78be" FOREIGN KEY ("serviceId") REFERENCES "services"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "attendance" ADD CONSTRAINT "FK_7df51ca68d842297d387aeb48ba" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "attendance" ADD CONSTRAINT "FK_d11bbdafc3d66b6500102a7dced" FOREIGN KEY ("collaboratorId") REFERENCES "collaborator"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "attendance" DROP CONSTRAINT "FK_d11bbdafc3d66b6500102a7dced"`);
        await queryRunner.query(`ALTER TABLE "attendance" DROP CONSTRAINT "FK_7df51ca68d842297d387aeb48ba"`);
        await queryRunner.query(`ALTER TABLE "attendance" DROP CONSTRAINT "FK_86d744c804943a507cac76a78be"`);
        await queryRunner.query(`ALTER TABLE "collaborator" DROP CONSTRAINT "FK_9563b5bc4e0dc8bb29e04a7c1d6"`);
        await queryRunner.query(`ALTER TABLE "team" DROP CONSTRAINT "FK_85f54c508d75698f62cb3e0b1e1"`);
        await queryRunner.query(`ALTER TABLE "client_plan" DROP CONSTRAINT "FK_cc87ca427ca47245433edcf729a"`);
        await queryRunner.query(`ALTER TABLE "client_plan" DROP CONSTRAINT "FK_ce84c85e4d762fbde216d5a99d5"`);
        await queryRunner.query(`DROP TABLE "attendance"`);
        await queryRunner.query(`DROP TABLE "services"`);
        await queryRunner.query(`DROP TABLE "collaborator"`);
        await queryRunner.query(`DROP TABLE "team"`);
        await queryRunner.query(`DROP TABLE "supervisor"`);
        await queryRunner.query(`DROP TABLE "Client"`);
        await queryRunner.query(`DROP TABLE "client_plan"`);
        await queryRunner.query(`DROP TABLE "Internet_plan"`);
    }

}
