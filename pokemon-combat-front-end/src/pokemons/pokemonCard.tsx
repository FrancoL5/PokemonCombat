import { Box, Card, Tooltip } from '@mui/material'
import { Pokemon } from '../interfaces/pokemons'

export function PokemonCard({
    pokemon,
    selectPokemon,
}: {
    pokemon: Pokemon
    selectPokemon: (pokemon: Pokemon) => void
}) {
    return (
        <Card
            sx={{
                width: '10rem',
                cursor: 'pointer',
            }}
            onClick={() => selectPokemon(pokemon)}
        >
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column',
                    paddingInline: '5px',
                }}
            >
                <Tooltip
                    title={`|Stats| 
                    hp: ${pokemon.hp}
                    speed: ${pokemon.speed}
                    attack: ${pokemon.attack}
                    defense: ${pokemon.defense}
                `}
                    placement="top"
                >
                    <img
                        src={pokemon.imageUrl}
                        alt={pokemon.name}
                        style={{
                            maxWidth: '100%',
                        }}
                    ></img>
                </Tooltip>
                <p
                    style={{
                        alignSelf: 'start',
                    }}
                >
                    <b>{pokemon.name}</b>
                </p>
            </Box>
        </Card>
    )
}
