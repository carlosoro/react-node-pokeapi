const axios = require('axios');

const getPokemons = async (url) => axios
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
  const pokeApiEndpoint = process.env.POKE_API_ENDPOINT;
  const page = `${pokeApiEndpoint}/pokemon?limit=${limit}&offset=${offset}`;
  const pokemonsSet = await getPokemons(page);
  pokemons.push(...pokemonsSet.results);
  if (pokemonsSet.count > pokemons.length) {
    offset += limit;
    return this.getAllPokemons(limit, offset, pokemons);
  }
  return pokemons;
};

exports.getPokemonByName = (pokemonName) => {
  const pokeApiEndpoint = process.env.POKE_API_ENDPOINT;
  const url = `${pokeApiEndpoint}/pokemon/${pokemonName}`;
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
