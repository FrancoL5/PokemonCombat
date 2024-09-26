import { Body, Controller, Get, Post } from '@nestjs/common'
import { PokemonsService } from './pokemons.service'
import { SimulateCombatDTO } from './dto/simulateCombat.dto'

@Controller('pokemons')
export class PokemonsController {
    constructor(private pokemonsService: PokemonsService) {}

    @Get('getAll')
    async getAll() {
        return this.pokemonsService.findAll()
    }


    @Post('simulateCombat')
    async simulateCombat(@Body() body: SimulateCombatDTO) {

    }
}
