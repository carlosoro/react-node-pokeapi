const axios = require('axios');

const BASE_URL = 'https://pokeapi.co/api/v2';

const getPokemons = (url) => axios
  .get(url)
  .then((res) => {
    if (!res.data.results) {
      throw new Error('Unexpected getPokemons response');
    }
    return res.data;
  })
  .catch((error) => {
    throw error;
  });

exports.getAllPokemons = async (limit = 10000, offset = 0, pokemons = []) => {
  const page = `${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`;
  const pokemonsSet = await getPokemons(page);
  pokemons.push(...pokemonsSet.results);
  if (pokemonsSet.count > pokemons.length) {
    offset += limit;
    return this.getAllPokemons(limit, offset, pokemons);
  }
  return pokemons;
};

exports.getPokemonByName = (pokemonName) => {
  const url = `${BASE_URL}/pokemon/${pokemonName}`;
  return axios.get(url)
    .then((res) => {
      if (!res.data) {
        throw new Error(404);
      }
      return res.data;
    })
    .catch((error) => {
      throw error;
    });
};
