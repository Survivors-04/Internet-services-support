import { MigrationInterface, QueryRunner } from "typeorm";

export class alterCpfNumber1667324580974 implements MigrationInterface {
    name = 'alterCpfNumber1667324580974'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Client" DROP COLUMN "cpf"`);
        await queryRunner.query(`ALTER TABLE "Client" ADD "cpf" character varying(14) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Client" DROP COLUMN "telephone"`);
        await queryRunner.query(`ALTER TABLE "Client" ADD "telephone" character varying(11) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "supervisor" DROP COLUMN "cpf"`);
        await queryRunner.query(`ALTER TABLE "supervisor" ADD "cpf" character varying(14) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "supervisor" DROP COLUMN "telephone"`);
        await queryRunner.query(`ALTER TABLE "supervisor" ADD "telephone" character varying(11) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "collaborator" DROP COLUMN "cpf"`);
        await queryRunner.query(`ALTER TABLE "collaborator" ADD "cpf" character varying(14) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "collaborator" DROP COLUMN "telephone"`);
        await queryRunner.query(`ALTER TABLE "collaborator" ADD "telephone" character varying(11) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "collaborator" DROP COLUMN "telephone"`);
        await queryRunner.query(`ALTER TABLE "collaborator" ADD "telephone" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "collaborator" DROP COLUMN "cpf"`);
        await queryRunner.query(`ALTER TABLE "collaborator" ADD "cpf" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "supervisor" DROP COLUMN "telephone"`);
        await queryRunner.query(`ALTER TABLE "supervisor" ADD "telephone" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "supervisor" DROP COLUMN "cpf"`);
        await queryRunner.query(`ALTER TABLE "supervisor" ADD "cpf" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Client" DROP COLUMN "telephone"`);
        await queryRunner.query(`ALTER TABLE "Client" ADD "telephone" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Client" DROP COLUMN "cpf"`);
        await queryRunner.query(`ALTER TABLE "Client" ADD "cpf" integer NOT NULL`);
    }

}
