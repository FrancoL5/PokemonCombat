import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Pokemons } from './pokemon.entity'
import { Repository } from 'typeorm'
import { SimulateCombatDTO } from './dto/simulateCombat.dto'

@Injectable()
export class PokemonsService {
    constructor(
        @InjectRepository(Pokemons)
        private pokemonsRepository: Repository<Pokemons>,
    ) {}

    async findAll() {
        return await this.pokemonsRepository.find({
            relations: { combatsWon: true, combatsLosse: true },
        })
    }

    async simulateCombat(pokemonsIDs: SimulateCombatDTO) {
        const [playerPokemon, rivalPokemon]= await this.pokemonsRepository
            .createQueryBuilder()
            .where('pokemons.id = :playerID OR pokemons.id = :rivalID')
            .getMany()
    }
}
