import { Module } from '@nestjs/common'
import { PokemonsController } from './pokemons.controller'
import { PokemonsService } from './pokemons.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Pokemons } from './pokemon.entity'
import { CombatTrackerModule } from 'src/combat-tracker/combat-tracker.module'

@Module({
    imports: [TypeOrmModule.forFeature([Pokemons]), CombatTrackerModule],
    controllers: [PokemonsController],
    providers: [PokemonsService],
})
export class PokemonsModule {}
