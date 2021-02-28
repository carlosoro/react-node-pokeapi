import React, { Component } from 'react';
import { Formik, Field, Form } from 'formik';
import * as yup from 'yup';
import {getPokemons, getPokemonDetailsByName} from '../../services/pokemons'

class SearchForm extends Component {
    constructor(props) {
        super(props);
            this.schema = yup.object({
            pokemonName: yup.string().required().min(3)
        });
        this.state = {
          pokemonsList: [],
        };
    }


    submitHandler = async values => {
        try {
            let pokemons;
            const pokemonsDetails = [];
            const response = await getPokemons();
            pokemons = response.filter((pokemon) => {
                return pokemon.name.toLowerCase().indexOf(values.pokemonName.toLowerCase()) > -1;
            })
            pokemons.forEach( pokemon => {
                pokemonsDetails.push(getPokemonDetailsByName(pokemon.name));
            });

            const pokemonsList = await Promise.all(pokemonsDetails);
            this.setState({ pokemonsList });
            console.log(pokemonsList);
        } catch (error) {
            console.log(error);
        }
    };

    render() {
        const pokemons = this.state.pokemonsList;
        return (
            <div>
            <Formik
                  initialValues={{
                    pokemonName: ''
                  }}
                  onSubmit={values => this.submitHandler(values)}
                >
                <Form>
                    <Field id="pokemonName" name="pokemonName" placeholder="Ingrese el nombre a buscar" />
                    <button type="submit">Buscar</button>
                </Form>
            </Formik>
            <div>
                {pokemons.map((pokemon, index) => (
                    <div key={index}>
                        <h3>{pokemon.name}</h3>
                    </div>
                ))}
            </div>
            </div>
        )
    }
}

export default SearchForm;
