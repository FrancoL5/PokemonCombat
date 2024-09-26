import { useEffect, useState } from 'react'
import { PokemonCard } from './pokemons/pokemonCard'
import { usePokemonHttp } from './services/pokemonhttp'
import { Pokemon } from './interfaces/pokemons'
import { Box } from '@mui/material'

function App() {
    const [pokemons, setPokemons] = useState<Pokemon[]>([])
    const { getAll } = usePokemonHttp()
    useEffect(() => {
        ;(async () => {
            const data = await getAll()
            setPokemons(data)
        })()
    }, [])
    return (
        <main>
            <h1>Battle of Pokemon</h1>
            <h2>Select your Pokemon</h2>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent:"center",
                    flexWrap: 'wrap',
                    gap:"1rem"
                }}
            >
                {pokemons.map((pokemon) => (
                    <PokemonCard
                        key={pokemon.id}
                        pokemon={pokemon}
                    ></PokemonCard>
                ))}
            </Box>
        </main>
    )
}

export default App
