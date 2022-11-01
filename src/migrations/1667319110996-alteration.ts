import { MigrationInterface, QueryRunner } from "typeorm";

export class alteration1667319110996 implements MigrationInterface {
    name = 'alteration1667319110996'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Client" DROP COLUMN "telephone"`);
        await queryRunner.query(`ALTER TABLE "Client" ADD "telephone" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Client" DROP COLUMN "telephone"`);
        await queryRunner.query(`ALTER TABLE "Client" ADD "telephone" integer NOT NULL`);
    }

}
