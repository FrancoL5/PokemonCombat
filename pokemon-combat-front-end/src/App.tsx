import { useEffect, useState } from 'react'
import { PokemonCard } from './pokemons/pokemonCard'
import { usePokemonHttp } from './services/pokemonhttp'
import { Pokemon } from './interfaces/pokemons'
import { Alert, Box } from '@mui/material'
import { SelectedPokemon } from './pokemons/selectedPokemon'

function App() {
    const [pokemons, setPokemons] = useState<Pokemon[]>([])
    const [rival, setRival] = useState<{
        rival: Pokemon | null
        lastRival: number | null
    }>({ lastRival: null, rival: null })
    const [winner, setWinner] = useState<string | null>(null)
    const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null)

    const { getAllPokemons, simulateCombat } = usePokemonHttp()

    function getRandomRival() {
        const random = Math.floor(Math.random() * (pokemons.length - 2))
        return pokemons.filter(
            (pokemon) =>
                pokemon.id !== selectedPokemon?.id &&
                pokemon.id !== rival.lastRival,
        )[random]
    }

    async function startBattleHandle() {
        if (selectedPokemon) {
            const rRival = getRandomRival()
            setRival((prev) => ({
                rival: rRival,
                lastRival: prev.rival?.id || null,
            }))
            const result = await simulateCombat(selectedPokemon.id, rRival.id)
            setWinner(result?.winner.name || '')
        }
    }

    useEffect(() => {
        ;(async () => {
            const data = await getAllPokemons()
            setPokemons(data || [])
        })()
    }, [])

    return (
        <main
            style={{
                paddingInline: '10%',
                display: 'flex',
                flexDirection: 'column',
                gap: '3rem',
            }}
        >
            <h1>Battle of Pokemon</h1>
            <h2>Select your Pokemon</h2>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '1rem',
                }}
            >
                {pokemons.map((pokemon) => (
                    <PokemonCard
                        key={pokemon.id}
                        pokemon={pokemon}
                        selectPokemon={setSelectedPokemon}
                    ></PokemonCard>
                ))}
            </Box>
            <Box>
                {winner && (
                    <Alert severity={'warning'}>The Winner is {winner}</Alert>
                )}
            </Box>
            <SelectedPokemon
                startBattleHandle={startBattleHandle}
                rival={rival.rival}
                pokemon={selectedPokemon}
            ></SelectedPokemon>
        </main>
    )
}

export default App
