import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { CombatTracker } from '../combat-tracker/combatTracker.entity'

@Entity()
export class Pokemons {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    attack: number

    @Column()
    defense: number

    @Column()
    hp: number

    @Column({default:"TYPE"})
    type: string

    @Column()
    speed: number

    @Column()
    imageUrl: string

    @OneToMany(() => CombatTracker, (combat) => combat.winner)
    combatsWon: CombatTracker[]

    @OneToMany(() => CombatTracker, (combat) => combat.losser)
    combatsLosse: CombatTracker[]
}
