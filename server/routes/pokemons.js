const router = require('express').Router();
const pokemonsService = require('../services/pokemons');

router.get('/', async (req, res, next) => pokemonsService.getAllPokemons()
  .then((list) => res.json(list))
  .catch(next));

router.get('/:pokemonName', async (req, res, next) => {
  const { pokemonName } = req.params;
  try {
    const pokemon = await pokemonsService.getPokemonByName(pokemonName);
    res.status(200).json(pokemon);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
