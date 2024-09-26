import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Pokemons } from './pokemon.entity'
import { Repository } from 'typeorm'

@Injectable()
export class PokemonsService {
    constructor(
        @InjectRepository(Pokemons)
        private pokemonsRepository: Repository<Pokemons>,
    ) {}

    async findAll() {
        return await this.pokemonsRepository.find()
    }
}
