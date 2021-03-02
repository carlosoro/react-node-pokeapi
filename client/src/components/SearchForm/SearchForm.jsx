import React, { Component } from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import styles from './SearchForm.module.css';
import { getPokemonDetailsByName } from '../../services/pokemons';
import { setDataIntoCache, getKeyFromCache, cacheHasKey } from '../../lib/cacheManager';

class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.schema = yup.object({
      pokemonName: yup.string().required().min(3),
    });
    this.state = {
      searchCompleted: false,
      pokemonsList: [],
    };
  }

    getPokemonDetails = async (pokemons) => {
      const pokemonsResult = [];
      const pokemonsDetails = [];
      pokemons.forEach((pokemon) => {
        const pokemonkey = `pokemon.${pokemon.name}`;
        if (cacheHasKey(pokemonkey)) {
          pokemonsResult.push(getKeyFromCache(pokemonkey));
        } else {
          pokemonsDetails.push(getPokemonDetailsByName(pokemon.name));
        }
      });
      const freshCachedPokemons = await Promise.all(pokemonsDetails);
      freshCachedPokemons.forEach((pokemon) => {
        const pokemonkey = `pokemon.${pokemon.name}`;
        setDataIntoCache(pokemonkey, pokemon);
        pokemonsResult.push(pokemon);
      });
      return pokemonsResult;
    }

    filterPokemons = async (pokemonName) => {
      const pokemonsArray = getKeyFromCache('pokemonsList');
      const pokemons = pokemonsArray.filter(
        (pokemon) => pokemon.name.toLowerCase().indexOf(pokemonName.toLowerCase()) > -1,
      );
      return this.getPokemonDetails(pokemons);
    }

    submitHandler = async (values) => {
      const pokemonsList = await this.filterPokemons(values.pokemonName);
      this.setState({ pokemonsList, searchCompleted: true });
    };

    render() {
      const { pokemonsList, searchCompleted } = this.state;
      return (
        <div className={styles.SearchFormContainer}>
          <Formik
            validationSchema={this.schema}
            initialValues={{
              pokemonName: '',
            }}
            onSubmit={(values) => this.submitHandler(values)}
          >
            {({
              handleSubmit,
              handleChange,
              values,
              touched,
              errors,
            }) => (
              <form onSubmit={handleSubmit}>
                <div className="nes-field">
                  <input
                    type="text"
                    id="pokemonName"
                    className="nes-input"
                    name="pokemonName"
                    placeholder="Type the pokemon's name"
                    onChange={handleChange}
                    value={values.pokemonName}
                  />
                  {errors.pokemonName && touched.pokemonName && (
                  <p>You need to provide at least 3 characters</p>
                  )}
                  <button className="nes-btn is-success" type="submit">Find Pokemons</button>
                </div>
              </form>
            )}
          </Formik>
          <div className={styles.CardContainer}>
            <div className={styles.Row}>
              { searchCompleted && !pokemonsList.length
                ? 'No pokemons found'
                : pokemonsList.map((pokemon) => (
                  <div className={styles.Column} key={pokemon.name}>
                    <div className={styles.Card}>
                      <h3>{pokemon.name}</h3>
                      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      );
    }
}

export default SearchForm;
