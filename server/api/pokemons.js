const router = require('express').Router();
const pokemonsLib = require('../lib/pokemons');

router.get('/', async (req, res) => {
  const pokemonsList = await pokemonsLib.getAllPokemons();
  res.json(pokemonsList);
});

router.get('/:pokemonName', async (req, res) => {
  const { pokemonName } = req.params;
  try {
    const pokemon = await pokemonsLib.getPokemonByName(pokemonName);
    res.status(200).json(pokemon);
  } catch (err) {
    res.status(404).send();
  }
});

module.exports = router;
