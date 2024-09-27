import { Box, Button, Card, Divider, LinearProgress } from '@mui/material'
import { Pokemon } from '../interfaces/pokemons'

export function SelectedPokemon({
    pokemon,
    rival,
    startBattleHandle,
}: {
    pokemon: Pokemon | null
    rival: Pokemon | null
    startBattleHandle: () => Promise<void>
}) {
    return (
        pokemon && (
            <Box
                sx={{
                    display: 'flex',
                    // width: '100%',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '5rem',
                }}
            >
                <MoreInfoPokemon pokemon={pokemon}></MoreInfoPokemon>
                <Button
                    color="success"
                    onClick={async () => await startBattleHandle()}
                    sx={{ height: '100%' }}
                    variant="contained"
                >
                    Start Battle
                </Button>
                {rival ? (
                    <MoreInfoPokemon pokemon={rival}></MoreInfoPokemon>
                ) : (
                    <h2>Mysterious Rival</h2>
                )}
            </Box>
        )
    )
}

function StatBar({ suffix, value }: { value: number; suffix: string }) {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: '100%', mr: 1 }}>
                <LinearProgress
                    color="success"
                    variant="determinate"
                    value={value * 10}
                />
            </Box>
            <Box>
                <p style={{ textWrap: 'nowrap' }}>
                    {value}
                    {suffix}
                </p>
            </Box>
        </Box>
    )
}

function MoreInfoPokemon({ pokemon }: { pokemon: Pokemon }) {
    return (
        <Card
            sx={{
                display: 'flex',
                alignItems: 'center',
                maxWidth: '40%',
                flexDirection: 'column',
                paddingInline: 1,
            }}
        >
            <img
                style={{
                    width: '15rem',
                    height: '75%',
                }}
                src={pokemon.imageUrl}
            ></img>
            <h2 style={{ alignSelf: 'start' }}>{pokemon.name}</h2>
            <Divider flexItem></Divider>
            <Box sx={{ width: '100%' }}>
                <StatBar suffix=" hp" value={pokemon.hp}></StatBar>
                <StatBar suffix=" spd" value={pokemon.speed}></StatBar>
                <StatBar suffix=" atk" value={pokemon.attack}></StatBar>
                <StatBar suffix=" def" value={pokemon.defense}></StatBar>
            </Box>
        </Card>
    )
}
