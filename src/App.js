import React, { useState, useEffect } from 'react'
import Routes from './Routes'
import './App.css'
import { Outlet } from 'react-router-dom'
import axios from 'axios'
import { getCatchedPokemons } from './helpers/catchedPokemon'

const App = () => {
  const [tableRows, setTableRows] = useState([])
  const [pokemonTypesOptions, setPokemonTypesOptions] = useState([])
  const [catchedPokemon, setCatchedPokemon] = useState([])

  const getPokemon = async ({ url }) => {
    const { data: { types, weight, height, id, name, sprites } } = await axios.get(url)
    return { types, weight, height, id, name, sprites }
  }

  // * Consulta de los pokemon
  useEffect(() => {
    axios.get('https://pokeapi.co/api/v2/pokemon?limit=10000&offset=0')
      .then(async ({ data: { results } }) => {
        const pokemons = []
        for (const pokemonData of results) {
          const pokemon = await getPokemon(pokemonData)
          console.log('consulting...')
          pokemons.push(pokemon)
        }
        setTableRows(pokemons)
      })
  }, [])

  useEffect(() => {
    getCatchedPokemons()
      .then(setCatchedPokemon)
  }, [])

  // * Consulta de los tipos de pokemon
  useEffect(() => {
    axios.get('https://pokeapi.co/api/v2/type/')
      .then(async ({ data: { results } }) => {
        setPokemonTypesOptions(results)
      })
  }, [])

  const handleUpdatePokemonRow = ({ idPokemon, fields }) => {
    // const { my_name, my_description, my_types, my_teammates, my_sprite } =
    //   fields;
  }

  return (
    <div className="App">
      <Routes
        tableRows={tableRows}
        pokemonTypesOptions={pokemonTypesOptions}
        handleUpdatePokemonRow={handleUpdatePokemonRow}
        catchedPokemon={catchedPokemon}
      />
      <Outlet />
    </div>
  )
}

export default App
