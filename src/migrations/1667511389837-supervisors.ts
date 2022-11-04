import { MigrationInterface, QueryRunner } from "typeorm";

export class supervisors1667511389837 implements MigrationInterface {
    name = 'supervisors1667511389837'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "supervisor" ALTER COLUMN "is_active" SET DEFAULT true`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "supervisor" ALTER COLUMN "is_active" DROP DEFAULT`);
    }

}
