import React, {useEffect, useState} from "react";
import './styles/App.css';
import axios from "axios";
import {Card, CardContent, Chip, Container, createTheme, Grid, ThemeProvider, Typography} from "@mui/material";
import TouchAppIcon from "@mui/icons-material/TouchApp";


const lightTheme = createTheme({
    palette: {
        mode: "light",
    },
});

function App() {
    const [pokemonsList, setPokemonsList] = useState([])
    const [pokemonsItem, setPokemonsItem] = useState()

    async function fetchPokemons() {
        const result = []
        const response = await axios.get("https://pokeapi.co/api/v2/pokemon/?limit=10")
        for (const key of response.data.results) {
            const response = await axios.get(key.url)
            result.push(response.data)
        }
        setPokemonsList(result)
        setPokemonsItem(result[0])
    }

    useEffect(() => {
        fetchPokemons()
    }, [])

    return (
        <>
            <Container sx={{mt: "6rem"}}>
                <Grid sx={{marginRight: "10.5%"}}>
                    <Chip
                        label="ПОКЕМОНЫ API"
                        variant="outlined"
                        sx={{borderColor: "white", borderRadius: 0, fontWeight: 500, float: "left"}}
                    />
                    <Chip icon={<TouchAppIcon/>} label="Нажмите на нужного Покемона" variant="outlined"
                          sx={{border: "none", float: "right", maxWidth: 170}}
                    />
                </Grid>
                <Grid container>
                    <ThemeProvider theme={lightTheme}>
                        <Grid item
                              md={5}
                              sx={{textAlign: "left", alignSelf: "center"}}
                        >
                            {pokemonsList.map(pokemon =>
                                <Chip
                                    label={pokemon.name}
                                    onClick={() => setPokemonsItem(pokemon)}
                                    key={pokemon.id}
                                    color="primary"
                                    sx={{
                                        margin: "0.3rem",
                                        padding: "0.5rem",
                                        paddingBlock: "1.5rem",
                                        fontSize: "large",
                                        fontWeight: 100,
                                        borderRadius: "44px",
                                    }}
                                />)}
                        </Grid>
                    </ThemeProvider>
                    <Grid item
                          md={6}
                          sx={{padding: "2rem"}}
                    >
                        {pokemonsItem && <Card
                            sx={{
                                paddingX: "3rem",
                                paddingTop: "1rem",
                                color: "text.secondary",
                                background: "black",
                                width: "80%"
                            }}
                        >
                            <CardContent>
                                <Typography
                                    sx={{
                                        textTransform: "capitalize",
                                        fontWeight: 700,
                                        fontSize: "48px",
                                        paddingBottom: "3rem"
                                    }}
                                >
                                    {pokemonsItem.name}
                                </Typography>
                                <center>
                                    <img
                                        src={pokemonsItem.sprites.other.dream_world.front_default}
                                        alt={pokemonsItem.name}
                                        style={{
                                            minWidth: 150,
                                            maxWidth: 150,
                                            minHeight: 150,
                                            maxHeight: 150,
                                            marginBottom: "1rem"
                                        }}
                                    />
                                </center>
                                <Typography sx={{fontWeight: 300, fontSize: "17px", paddingTop: "3rem"}}
                                            style={{lineHeight: 0.4, alignSelf: "stretch"}}>
                                    <p>Снялся в ... сериях</p>
                                    <p>Id: {pokemonsItem.id}</p>
                                    <p>Height: {pokemonsItem.height}</p>
                                    <p>Attack: {pokemonsItem.stats[1].base_stat}</p>
                                </Typography>
                            </CardContent>
                        </Card>}
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}

export default App;