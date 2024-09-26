import { Module } from '@nestjs/common'
import { PokemonsController } from './pokemons.controller'
import { PokemonsService } from './pokemons.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Pokemons } from './pokemon.entity'

@Module({
    imports: [TypeOrmModule.forFeature([Pokemons])],
    controllers: [PokemonsController],
    providers: [PokemonsService],
})
export class PokemonsModule {}
