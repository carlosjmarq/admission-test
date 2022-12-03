import React, { useState, useEffect } from 'react'
import Routes from './Routes'
import './App.css'
import { Outlet } from 'react-router-dom'
import axios from 'axios'

const App = () => {
  const [tableRows, setTableRows] = useState([])
  const [pokemonTypesOptions] = useState([])

  // aqui va la consulta de axios
  useEffect(() => {
    axios.get('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0')
      .then(({ data: { results } }) => {
        setTableRows(results)
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
      />
      <Outlet />
    </div>
  )
}

export default App
