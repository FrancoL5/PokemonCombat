import * as path from 'path'
import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PokemonsModule } from './pokemons/pokemons.module'
import { dataSourceOptions } from './data-sources'
import { CombatTrackerModule } from './combat-tracker/combat-tracker.module';

@Module({
    imports: [
        TypeOrmModule.forRoot({ ...dataSourceOptions, autoLoadEntities: true }),
        PokemonsModule,
        CombatTrackerModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
