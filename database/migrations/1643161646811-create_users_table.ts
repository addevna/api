import { MigrationInterface, QueryRunner, Table, TableColumn } from 'typeorm'

export class createUsersTable1643161646811 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          new TableColumn({
            name: 'id',
            type: 'bigint',
            isPrimary: true,
            isGenerated: true,
            isNullable: false,
          }),
          new TableColumn({
            name: 'name',
            type: 'varchar(100)',
            isNullable: false,
          }),
          new TableColumn({
            name: 'email',
            type: 'varchar(100)',
            isNullable: false,
          }),
          new TableColumn({
            name: 'password',
            type: 'varchar(100)',
            isNullable: false,
          }),
          new TableColumn({
            name: 'created_at',
            type: 'timestamp',
            isNullable: false,
          }),
          new TableColumn({
            name: 'updated_at',
            type: 'timestamp',
            isNullable: true,
          }),
        ],
      }),
      true
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users', true)
  }
}
