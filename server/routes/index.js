const express = require('express');

const router = express.Router();
const pokemonsRouter = require('./pokemons');

module.exports = router.use('/pokemons', pokemonsRouter);
