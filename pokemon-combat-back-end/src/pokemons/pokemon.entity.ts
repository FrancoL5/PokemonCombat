import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

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
}
