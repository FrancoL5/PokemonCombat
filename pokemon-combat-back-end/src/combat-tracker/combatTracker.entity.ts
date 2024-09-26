import { Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Pokemons } from '../pokemons/pokemon.entity'

@Entity()
export class CombatTracker {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => Pokemons, (pokemon) => pokemon.combatsWon)
    winner: number

    @ManyToOne(() => Pokemons, (pokemon) => pokemon.combatsLosse)
    losser: number
}
