import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableForeignKey,
} from 'typeorm'
import * as fs from 'fs/promises'
import * as path from 'path'

export class Migrations1727314464034 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createDatabase('PokemonDatabase.db')
        await queryRunner.createTable(
            new Table({
                name: 'pokemons',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                    },
                    {
                        name: 'attack',
                        type: 'int',
                    },
                    {
                        name: 'hp',
                        type: 'int',
                    },
                    {
                        name: 'defense',
                        type: 'int',
                    },
                    {
                        name: 'speed',
                        type: 'int',
                    },
                    {
                        name: 'type',
                        default: "'TYPE'",
                        type: 'text',
                    },
                    {
                        name: 'imageUrl',
                        type: 'text',
                    },
                ],
            }),
            true,
        )

        await queryRunner.createTable(
            new Table({
                name: 'combat_tracker',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                    },
                    { name: 'winnerId', type: 'int' },
                    { name: 'losserId', type: 'int' },
                ],
            }),
        )

        await queryRunner.createForeignKey(
            'combat_tracker',
            new TableForeignKey({
                columnNames: ['winnerId'],
                referencedColumnNames: ['id'],
                referencedTableName: 'pokemons',
            }),
        )
        await queryRunner.createForeignKey(
            'combat_tracker',
            new TableForeignKey({
                columnNames: ['losserId'],
                referencedColumnNames: ['id'],
                referencedTableName: 'pokemons',
            }),
        )

        const { pokemon } = JSON.parse(
            await fs.readFile(path.resolve('..', 'pokemon.json'), 'utf-8'),
        )
        await queryRunner.manager
            .createQueryBuilder()
            .insert()
            .into('pokemons')
            .values(pokemon)
            .execute()
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('combat_tracker')
        await queryRunner.dropTable('pokemons')
        await queryRunner.dropDatabase('PokemonDatabase.db')
    }
}
