import React, { useEffect, useState } from 'react';
import { Chip, styled, Typography } from '@mui/material';
import axios from 'axios';

const Wrapper = styled('main')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: 12,
});

const Chips = styled('div')({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '10px 6px',
});

const StyledChip = styled(Chip)({
  padding: 20,
  height: 60,

  background: '#1986EC',
  borderRadius: 44,

  fontWeight: 500,
  fontSize: 20,
  lineHeight: '100%',
  color: 'white',

  '& span': {
    padding: 0,
  },
  '&.active': {
    background: 'rgba(25, 134, 236, 0.5)',
  },
});

const Card = styled('article')({
  padding: 44,

  minWidth: 484,
  height: 500,

  background: 'black',
  color: '#A0A0A0',
});

const CardHeader = styled(Typography)({
  marginBottom: 44,

  fontWeight: 700,
  fontSize: 48,
  lineHeight: '100%',
  textTransform: 'capitalize',
});

const ImgWrapper = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const Img = styled('img')({
  marginBottom: 44,
  height: 200,
});

const Description = styled(Typography)({
  fontWeight: 500,
  fontSize: 17,
  lineHeight: '150%',
});

const MainContent = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [pokemon, setPokemon] = useState({});

  useEffect(() => {
    const fetchPokemons = async () => {
      let result = [];
      let response = await axios.get('https://pokeapi.co/api/v2/pokemon/?limit=10');
      for (let key of response.data.results) {
        let response = await axios.get(key.url);
        result.push(response.data);
      }
      setData(result);
      setPokemon(result[0]);
      setLoading(false);
    };
    fetchPokemons();
  }, []);

  if (loading) {
    return <Typography sx={{ textAlign: 'center', fontSize: 48 }}>Loading...</Typography>;
  }

  return (
    <Wrapper>
      <Chips>
        {data.map(({ name }, i) => (
          <StyledChip
            className={name === pokemon.name ? 'active' : null}
            key={name}
            label={name}
            onClick={() => setPokemon(data[i])}
          />
        ))}
      </Chips>
      <Card>
        <CardHeader>{pokemon.name}</CardHeader>
        <ImgWrapper>
          <Img src={pokemon.sprites.other.dream_world.front_default} alt={pokemon.name} />
        </ImgWrapper>
        <Description>
          <p>Снялся в 78 сериях</p>
          <p>Id: {pokemon.id}</p>
          <p>Height: {pokemon.height}</p>
          <p>Attack: {pokemon.stats[1].base_stat}</p>
        </Description>
      </Card>
    </Wrapper>
  );
};

export default MainContent;
