import React, { useState, useEffect } from 'react'
import Routes from './Routes'
import './App.css'
import axios from 'axios'

const App = () => {
  const [tableRows, setTableRows] = useState([])
  const [pokemonTypesOptions, setPokemonTypesOptions] = useState([])
  const [progress, setProgress] = useState(0)
  console.log({ progress })

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
          setProgress(pokemons.length / results.length * 100)
        }
        setTableRows(pokemons)
      })
  }, [])

  // * Consulta de los tipos de pokemon
  useEffect(() => {
    axios.get('https://pokeapi.co/api/v2/type/')
      .then(({ data: { results } }) => {
        setPokemonTypesOptions(results)
      })
  }, [])

  return (
    <div className="App">
      <Routes
        tableRows={tableRows}
        pokemonTypesOptions={pokemonTypesOptions}
        progress={progress}
      />
    </div>
  )
}

export default App
