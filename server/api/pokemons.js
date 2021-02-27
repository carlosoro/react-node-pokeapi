const axios = require('axios');
const router = require('express').Router();

router.get('/', async (req, res) => {
    const pokemonsList = await getAllPokemons();
    res.json(pokemonsList)
});

router.get('/:pokemonName', (req, res) => {
    const { pokemonName } = req.params;
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
    axios.get(url)
    .then((obj) => {
        res.status(201).json(obj.data);
    })
    .catch(error => {
        if (error.response) {
            res.status(error.response.status).json(error.response.data);
            return;
        }
        console.log(error);
        res.status(500).json('error');
    });
});

const getAllPokemons = async (limit = 10000, offset = 10000, pokemons = []) => {
    const apiResource = '/pokemon';
    const page = 'https://pokeapi.co/api/v2/pokemon?limit='+limit+'offset='+offset;
    const pokemonsSet = await getPokemons(page);
    pokemons.push(...pokemonsSet.results);
    if (pokemonsSet.count > pokemons.length)
    {
        offset = offset += limit;
        return await getAllPokemons(limit, offset, pokemons);
    }
    return pokemons;
}

const getPokemons = url => {
  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then(res => {
        if (res.data && res.data.results) {
          resolve(res.data);
        } else {
          reject(res);
        }
      })
      .catch(err => {
        reject(err);
      });
  });
};

module.exports = router;
