import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumn,
  TableForeignKey,
} from 'typeorm'

export class createMenusTable1643181646811 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'menus',
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
            name: 'parentId',
            type: 'bigint',
            isNullable: true,
          }),
        ],
      }),
      true
    )

    await queryRunner.createForeignKey(
      'menus',
      new TableForeignKey({
        columnNames: ['parentId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'menus',
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('menus', true)
  }
}
