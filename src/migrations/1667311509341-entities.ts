import { MigrationInterface, QueryRunner } from "typeorm";

export class entities1667311509341 implements MigrationInterface {
    name = 'entities1667311509341'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "attendance" DROP CONSTRAINT "FK_2876eeadbb18b8dfb40cbd48736"`);
        await queryRunner.query(`ALTER TABLE "attendance" RENAME COLUMN "servicesId" TO "addressId"`);
        await queryRunner.query(`ALTER TABLE "collaborator" DROP COLUMN "is_Active"`);
        await queryRunner.query(`ALTER TABLE "Client" DROP COLUMN "cpf"`);
        await queryRunner.query(`ALTER TABLE "Client" ADD "cpf" character varying(120) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Client" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "Client" ADD "email" character varying(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "supervisor" DROP COLUMN "cpf"`);
        await queryRunner.query(`ALTER TABLE "supervisor" ADD "cpf" character varying(120) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "attendance" ADD CONSTRAINT "FK_7aab7e3b32e3985cc4c74f78a69" FOREIGN KEY ("addressId") REFERENCES "services"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "attendance" DROP CONSTRAINT "FK_7aab7e3b32e3985cc4c74f78a69"`);
        await queryRunner.query(`ALTER TABLE "supervisor" DROP COLUMN "cpf"`);
        await queryRunner.query(`ALTER TABLE "supervisor" ADD "cpf" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Client" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "Client" ADD "email" character varying(120) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Client" DROP COLUMN "cpf"`);
        await queryRunner.query(`ALTER TABLE "Client" ADD "cpf" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "collaborator" ADD "is_Active" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "attendance" RENAME COLUMN "addressId" TO "servicesId"`);
        await queryRunner.query(`ALTER TABLE "attendance" ADD CONSTRAINT "FK_2876eeadbb18b8dfb40cbd48736" FOREIGN KEY ("servicesId") REFERENCES "services"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
