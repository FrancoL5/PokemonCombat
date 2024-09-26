import { Controller, Get } from '@nestjs/common'
import { PokemonsService } from './pokemons.service'
import * as fs from 'fs/promises'
import * as path from 'path'
@Controller('pokemons')
export class PokemonsController {
    constructor(private pokemonsService: PokemonsService) {}
    @Get('getAll')
    async getAll() {
        const { pokemon } = JSON.parse(
            await fs.readFile(path.resolve('..', 'pokemon.json'), 'utf-8'),
        )
        console.log(pokemon)
        return this.pokemonsService.findAll()
    }
}
