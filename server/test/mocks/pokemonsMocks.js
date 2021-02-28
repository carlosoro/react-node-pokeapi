exports.responseWithPikachu = {
  data: {
    id: 25,
    is_default: true,
    name: 'pikachu',
    order: 35,
    weight: 60,
    height: 4,
  },
};

exports.resultAPIPokemonsCountEqualToResultsCount = {
  data: {
    count: 3,
    next: '',
    previous: '',
    results: [
      { name: 'squirtle', url: 'https://pokeapi.co/api/v2/pokemon/7/' },
      { name: 'charmander', url: 'https://pokeapi.co/api/v2/pokemon/4/' },
      { name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon/25/' },
    ],
  },
};

exports.resultAPIPokemonsGreaterToResultsCount = [
  {
    data: {
      count: 6,
      next: 'https://pokeapi.co/api/v2/pokemon?offset=3&limit=3',
      previous: '',
      results: [
        { name: 'squirtle', url: 'https://pokeapi.co/api/v2/pokemon/7/' },
        { name: 'charmander', url: 'https://pokeapi.co/api/v2/pokemon/4/' },
        { name: 'Bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
      ],
    },
  },
  {
    data: {
      count: 6,
      next: 'https://pokeapi.co/api/v2/pokemon?offset=3&limit=3',
      previous: 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=3',
      results: [
        { name: 'Wartortle', url: 'https://pokeapi.co/api/v2/pokemon/8/' },
        { name: 'Charmeleon', url: 'https://pokeapi.co/api/v2/pokemon/5/' },
        { name: 'Ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
      ],
    },
  },
];
