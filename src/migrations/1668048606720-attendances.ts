import { MigrationInterface, QueryRunner } from "typeorm";

export class attendances1668048606720 implements MigrationInterface {
    name = 'attendances1668048606720'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "attendance" DROP CONSTRAINT "FK_7aab7e3b32e3985cc4c74f78a69"`);
        await queryRunner.query(`ALTER TABLE "attendance" RENAME COLUMN "addressId" TO "serviceId"`);
        await queryRunner.query(`ALTER TABLE "attendance" ADD CONSTRAINT "FK_86d744c804943a507cac76a78be" FOREIGN KEY ("serviceId") REFERENCES "services"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "attendance" DROP CONSTRAINT "FK_86d744c804943a507cac76a78be"`);
        await queryRunner.query(`ALTER TABLE "attendance" RENAME COLUMN "serviceId" TO "addressId"`);
        await queryRunner.query(`ALTER TABLE "attendance" ADD CONSTRAINT "FK_7aab7e3b32e3985cc4c74f78a69" FOREIGN KEY ("addressId") REFERENCES "services"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
