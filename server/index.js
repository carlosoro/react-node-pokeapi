const express = require('express');

const app = express();
const port = 5000;

const pokemons = require('./api/pokemons');

app.use('/pokemons', pokemons);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
