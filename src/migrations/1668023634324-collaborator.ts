import { MigrationInterface, QueryRunner } from "typeorm";

export class collaborator1668023634324 implements MigrationInterface {
    name = 'collaborator1668023634324'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "collaborator" DROP CONSTRAINT "FK_9563b5bc4e0dc8bb29e04a7c1d6"`);
        await queryRunner.query(`ALTER TABLE "collaborator" ADD CONSTRAINT "FK_9563b5bc4e0dc8bb29e04a7c1d6" FOREIGN KEY ("teamId") REFERENCES "team"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "collaborator" DROP CONSTRAINT "FK_9563b5bc4e0dc8bb29e04a7c1d6"`);
        await queryRunner.query(`ALTER TABLE "collaborator" ADD CONSTRAINT "FK_9563b5bc4e0dc8bb29e04a7c1d6" FOREIGN KEY ("teamId") REFERENCES "team"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
