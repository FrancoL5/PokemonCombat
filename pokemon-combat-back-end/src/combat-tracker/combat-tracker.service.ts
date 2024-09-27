import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { CombatTracker } from './combatTracker.entity'
import { Repository } from 'typeorm'
import { Pokemons } from 'src/pokemons/pokemon.entity'

@Injectable()
export class CombatTrackerService {
    constructor(
        @InjectRepository(CombatTracker)
        private combatTrackerRepository: Repository<CombatTracker>,
    ) {}

    async addWinnerAndLosser({
        winner,
        losser,
    }: {
        winner: Pokemons
        losser: Pokemons
    }) {
        return await this.combatTrackerRepository.insert({
            losser: losser.id,
            winner: winner.id,
        })
    }
}
