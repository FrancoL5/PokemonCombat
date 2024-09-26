import { Pokemon } from '../interfaces/pokemons'

export function usePokemonHttp() {
    return {
        getAll: async () => {
            const response = await fetch('http://localhost:3000/pokemons/getAll')
            return (await response.json()) as Pokemon[]
        },
    }
}
