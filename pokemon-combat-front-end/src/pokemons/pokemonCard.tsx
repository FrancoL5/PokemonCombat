import { Box, Card, CardContent, Tooltip } from '@mui/material'
import { Pokemon } from '../interfaces/pokemons'

export function PokemonCard({ pokemon }: { pokemon: Pokemon }) {
    return (
        <Card
            sx={{
                width: '10rem',
                cursor: 'pointer',
            }}
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
                    {pokemon.name}
                </p>
            </Box>
        </Card>
    )
}
