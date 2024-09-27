import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Pokemons } from './pokemon.entity'
import { Repository } from 'typeorm'
import { SimulateCombatDTO } from './dto/simulateCombat.dto'
import { CombatTracker } from 'src/combat-tracker/combatTracker.entity'
import { CombatTrackerService } from 'src/combat-tracker/combat-tracker.service'

@Injectable()
export class PokemonsService {
    constructor(
        @InjectRepository(Pokemons)
        private pokemonsRepository: Repository<Pokemons>,
        private combatTrackerService: CombatTrackerService,
    ) {}

    async findAll() {
        return await this.pokemonsRepository.find({
            relations: { combatsWon: true, combatsLosse: true },
        })
    }

    async simulateCombat(pokemonsIDs: SimulateCombatDTO) {
        const [pokemonA, pokemonB] = await this.pokemonsRepository
            .createQueryBuilder()
            .where('pokemons.id = :playerID OR pokemons.id = :rivalID', {
                playerID: pokemonsIDs.pokemonPlayerID,
                rivalID: pokemonsIDs.rivalID,
            })
            .getMany()

        const combatResult = this.executeCombat(pokemonA, pokemonB)
        await this.combatTrackerService.addWinnerAndLosser(combatResult)
        return combatResult
    }

    private executeCombat(pokemonA: Pokemons, pokemonB: Pokemons) {
        let pokemonAFirst =
            pokemonA.speed > pokemonB.speed
                ? true
                : pokemonA.speed === pokemonB.speed
                  ? pokemonA.attack > pokemonB.attack
                      ? true
                      : false
                  : false

        while (pokemonA.hp !== 0 && pokemonB.hp !== 0) {
            if (pokemonAFirst) {
                pokemonB.hp -= this.calcDamage(pokemonA, pokemonB)
            } else {
                pokemonA.hp -= this.calcDamage(pokemonB, pokemonA)
            }
            pokemonAFirst = !pokemonAFirst
        }

        return pokemonA.hp > pokemonB.hp
            ? { winner: pokemonA, losser: pokemonB }
            : { winner: pokemonB, losser: pokemonA }
    }

    private calcDamage(fromPokemon: Pokemons, toPokemon: Pokemons) {
        return toPokemon.defense >= fromPokemon.attack
            ? 1
            : fromPokemon.attack - toPokemon.defense
    }
}
