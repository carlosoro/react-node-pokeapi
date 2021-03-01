const router = require('express').Router();
const pokemonsLib = require('../lib/pokemons');

router.get('/', async (req, res, next) => pokemonsLib.getAllPokemons()
  .then((list) => res.json(list))
  .catch(next));

router.get('/:pokemonName', async (req, res, next) => {
  const { pokemonName } = req.params;
  try {
    const pokemon = await pokemonsLib.getPokemonByName(pokemonName);
    res.status(200).json(pokemon);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
