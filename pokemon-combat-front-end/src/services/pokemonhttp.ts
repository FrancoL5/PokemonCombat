import { Pokemon } from '../interfaces/pokemons'

export function usePokemonHttp() {
    return {
        getAllPokemons: async () => {
            try {
                const response = await fetch(
                    import.meta.env.VITE_SERVER_URL + '/pokemons/getAll',
                )
                return (await response.json()) as Pokemon[]
            } catch (err) {
                alert('Hubo un error inesperado ' + err)
            }
        },
        simulateCombat: async (pokemonPlayerID: number, rivalID: number) => {
            try {
                const response = await fetch(
                    import.meta.env.VITE_SERVER_URL + '/pokemons/simulateCombat',
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            pokemonPlayerID,
                            rivalID,
                        }),
                    },
                )
                return (await response.json()) as {
                    winner: Pokemon
                    losser: Pokemon
                }
            } catch (err) {
                alert('Hubo un error inesperado ' + err)
            }
        },
    }
}
