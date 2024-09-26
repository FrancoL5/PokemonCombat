import { DataSource, DataSourceOptions } from 'typeorm'
import * as path from 'path'
export const dataSourceOptions: DataSourceOptions = {
    type: 'sqlite',
    database: path.resolve('..', 'database', 'PokemonDatabase.db'),
    migrations: ['dist/migrations/*.js'],
}
const dataSource = new DataSource(dataSourceOptions)
export default dataSource
