import axios from '../lib/axios';

export const getPokemons = () => axios
  .get('/pokemons')
  .then((res) => {
    if (!res.data) {
      throw new Error('Ocurrió un error inesperado');
    }
    return [...res.data];
  })
  .catch((err) => {
    throw err;
  });

export const getPokemonDetailsByName = (pokemonName) => axios
  .get(`/pokemons/${pokemonName}`)
  .then((res) => {
    if (!res.data) {
      throw new Error('Ocurrió un error inesperado');
    }
    return res.data;
  })
  .catch((err) => {
    throw err;
  });
