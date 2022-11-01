import { MigrationInterface, QueryRunner } from "typeorm";

export class alterCpfandTelephone1667321486276 implements MigrationInterface {
    name = 'alterCpfandTelephone1667321486276'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "supervisor" DROP COLUMN "cpf"`);
        await queryRunner.query(`ALTER TABLE "supervisor" ADD "cpf" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Client" DROP COLUMN "cpf"`);
        await queryRunner.query(`ALTER TABLE "Client" ADD "cpf" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Client" DROP COLUMN "cpf"`);
        await queryRunner.query(`ALTER TABLE "Client" ADD "cpf" character varying(120) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "supervisor" DROP COLUMN "cpf"`);
        await queryRunner.query(`ALTER TABLE "supervisor" ADD "cpf" character varying(120) NOT NULL`);
    }

}
