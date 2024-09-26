import { IsNumber, Min } from 'class-validator'

export class SimulateCombatDTO {
    @IsNumber()
    @Min(1)
    pokemonPlayerID: number
    
    @IsNumber()
    @Min(1)
    rivalID: number
}
