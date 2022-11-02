import { MigrationInterface, QueryRunner } from "typeorm";

export class entitySupervisor1667421523691 implements MigrationInterface {
    name = 'entitySupervisor1667421523691'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "collaborator" ADD "is_active" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "supervisor" ADD "is_active" boolean NOT NULL`);
        await queryRunner.query(`ALTER TABLE "client_plan" DROP CONSTRAINT "FK_ce84c85e4d762fbde216d5a99d5"`);
        await queryRunner.query(`ALTER TABLE "attendance" DROP CONSTRAINT "FK_7df51ca68d842297d387aeb48ba"`);
        await queryRunner.query(`ALTER TABLE "Client" ALTER COLUMN "id" SET DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "Client" DROP COLUMN "telephone"`);
        await queryRunner.query(`ALTER TABLE "Client" ADD "telephone" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "client_plan" ADD CONSTRAINT "FK_ce84c85e4d762fbde216d5a99d5" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "attendance" ADD CONSTRAINT "FK_7df51ca68d842297d387aeb48ba" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "attendance" DROP CONSTRAINT "FK_7df51ca68d842297d387aeb48ba"`);
        await queryRunner.query(`ALTER TABLE "client_plan" DROP CONSTRAINT "FK_ce84c85e4d762fbde216d5a99d5"`);
        await queryRunner.query(`ALTER TABLE "Client" DROP COLUMN "telephone"`);
        await queryRunner.query(`ALTER TABLE "Client" ADD "telephone" character varying(11) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Client" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "attendance" ADD CONSTRAINT "FK_7df51ca68d842297d387aeb48ba" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "client_plan" ADD CONSTRAINT "FK_ce84c85e4d762fbde216d5a99d5" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "supervisor" DROP COLUMN "is_active"`);
        await queryRunner.query(`ALTER TABLE "collaborator" DROP COLUMN "is_active"`);
    }

}
