import { MigrationInterface, QueryRunner } from "typeorm";

export class attendance1668029635449 implements MigrationInterface {
    name = 'attendance1668029635449'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "attendance" DROP CONSTRAINT "FK_7aab7e3b32e3985cc4c74f78a69"`);
        await queryRunner.query(`ALTER TABLE "attendance" RENAME COLUMN "addressId" TO "serviceId"`);
        await queryRunner.query(`ALTER TABLE "attendance" DROP CONSTRAINT "FK_7df51ca68d842297d387aeb48ba"`);
        await queryRunner.query(`ALTER TABLE "client_plan" DROP CONSTRAINT "FK_ce84c85e4d762fbde216d5a99d5"`);
        await queryRunner.query(`ALTER TABLE "Client" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "client_plan" ADD CONSTRAINT "FK_ce84c85e4d762fbde216d5a99d5" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "attendance" ADD CONSTRAINT "FK_86d744c804943a507cac76a78be" FOREIGN KEY ("serviceId") REFERENCES "services"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "attendance" ADD CONSTRAINT "FK_7df51ca68d842297d387aeb48ba" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "attendance" DROP CONSTRAINT "FK_7df51ca68d842297d387aeb48ba"`);
        await queryRunner.query(`ALTER TABLE "attendance" DROP CONSTRAINT "FK_86d744c804943a507cac76a78be"`);
        await queryRunner.query(`ALTER TABLE "client_plan" DROP CONSTRAINT "FK_ce84c85e4d762fbde216d5a99d5"`);
        await queryRunner.query(`ALTER TABLE "Client" ALTER COLUMN "id" SET DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "client_plan" ADD CONSTRAINT "FK_ce84c85e4d762fbde216d5a99d5" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "attendance" ADD CONSTRAINT "FK_7df51ca68d842297d387aeb48ba" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "attendance" RENAME COLUMN "serviceId" TO "addressId"`);
        await queryRunner.query(`ALTER TABLE "attendance" ADD CONSTRAINT "FK_7aab7e3b32e3985cc4c74f78a69" FOREIGN KEY ("addressId") REFERENCES "services"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
