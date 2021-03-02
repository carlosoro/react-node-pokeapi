import React, { Component } from 'react';
import { getPokemons } from '../../services/pokemons';
import SearchForm from '../SearchForm/SearchForm';
import { setDataIntoCache, cacheHasKey } from '../../lib/cacheManager';

class SearchPokemon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
    };
  }

  componentDidMount() {
    this.getPokemonsList();
  }

    getPokemonsList = async () => {
      if (!cacheHasKey('pokemonsList')) {
        const pokemonsList = await getPokemons();
        setDataIntoCache('pokemonsList', pokemonsList);
      }
      this.setState({ isReady: true });
    }

    render() {
      const { isReady } = this.state;
      return (
        <div>
          { isReady
            ? <SearchForm />
            : '...loading'}
        </div>
      );
    }
}

export default SearchPokemon;
