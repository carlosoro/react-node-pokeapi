import axios from '../lib/axios';

export const getPokemons = () =>
  new Promise((resolve, reject) => {
    axios
      .get('/pokemons')
      .then(res => {
        if (res.data) {
          resolve([...res.data]);
        } else {
          reject(new Error('Ocurrió un error inesperado'));
        }
      })
      .catch(err => {
        if (err.response && err.response.data && err.response.data.message) {
          reject(new Error(err.response.data.message));
        } else {
        console.log(err);
          reject(new Error('Error inesperado'));
        }
      });
  });

export const getPokemonDetailsByName = (pokemonName) =>
    new Promise((resolve, reject) => {
      axios
        .get(`/pokemons/${pokemonName}`)
        .then(res => {
          if (res.data) {
            console.log(res.data.name);
            resolve(res.data);
          } else {
            reject(new Error('Ocurrió un error inesperado'));
          }
        })
        .catch(err => {
          if (err.response && err.response.data && err.response.data.message) {
            reject(new Error(err.response.data.message));
          } else {
          console.log(err);
            reject(new Error('Error inesperado'));
          }
        });
    });
