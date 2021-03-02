const axios = require('axios');
const pokemonService = require('../services/pokemons');
const pokemonsMocks = require('./mocks/pokemonsMocks');

jest.mock('axios');

describe('GetPokemonsByName', () => {
  it('should response with pikachu', async () => {
    axios.get.mockResolvedValue(pokemonsMocks.responseWithPikachu);

    const pokemon = await pokemonService.getPokemonByName('pikachu');
    expect(pokemon).toEqual(pokemonsMocks.responseWithPikachu.data);
  });

  it('should throw error when API 404 response', async () => {
    axios.get.mockResolvedValue('Not Found');
    expect(pokemonService.getPokemonByName()).rejects.toThrowError(Error);
  });
});

describe('GetAllPokemons', () => {
  it('should contain squirtle', async () => {
    axios.get.mockResolvedValue(pokemonsMocks.resultAPIPokemonsCountEqualToResultsCount);

    const pokemons = await pokemonService.getAllPokemons();
    expect(pokemons.some(({ name }) => name === 'squirtle')).toBeTruthy();
  });

  it('should call getAllPokemons once when API response total pokemons count is equal to results count', async () => {
    const spy = jest.spyOn(pokemonService, 'getAllPokemons');
    axios.get.mockResolvedValue(pokemonsMocks.resultAPIPokemonsCountEqualToResultsCount);
    await pokemonService.getAllPokemons();
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should call getAllPokemons more than once when API response total pokemons count is greater than results count', async () => {
    const spy = jest.spyOn(pokemonService, 'getAllPokemons');
    axios.get.mockResolvedValueOnce(pokemonsMocks.resultAPIPokemonsGreaterToResultsCount[0])
      .mockResolvedValueOnce(pokemonsMocks.resultAPIPokemonsGreaterToResultsCount[1]);

    const pokemons = await pokemonService.getAllPokemons();

    const expectedResult = pokemonsMocks.resultAPIPokemonsGreaterToResultsCount[0].data.results;
    expectedResult.push(...pokemonsMocks.resultAPIPokemonsGreaterToResultsCount[1].data.results);

    expect(spy).toHaveBeenCalledTimes(2);
    expect(pokemons).toEqual(expectedResult);
  });

  it('should throw error when API response doesn´t contains results data', () => {
    axios.get.mockResolvedValue({ data: {} });
    expect(pokemonService.getAllPokemons()).rejects.toThrowError(Error);
  });
});
