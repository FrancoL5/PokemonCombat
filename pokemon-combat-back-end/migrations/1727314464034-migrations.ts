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
                        type: 'integer',
                        isPrimary: true,
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                    },
                    {
                        name: 'attack',
                        type: 'integer',
                    },
                    {
                        name: 'hp',
                        type: 'integer',
                    },
                    {
                        name: 'defense',
                        type: 'integer',
                    },
                    {
                        name: 'speed',
                        type: 'integer',
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
                        type: 'integer',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    { name: 'winnerId', type: 'integer' },
                    { name: 'losserId', type: 'integer' },
                    {
                        name: 'createdAt',
                        type: 'datetime',
                        default: 'CURRENT_TIMESTAMP',
                    },
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
