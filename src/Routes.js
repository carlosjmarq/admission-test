import React from 'react'

import Home from './containers/Home'
import Form from './containers/Form'
import { Route, Routes } from 'react-router-dom'

const MyRoutes = ({ tableRows, pokemonTypesOptions, handleUpdatePokemonRow }) => {
  return (
    <div>
      <Routes>
        <Route path="/">
          <Route index path="/" element={<Home tableRows={tableRows} />} />
          {/* <Route
            path="home"
            element={<Form pokemonTypesOptions={pokemonTypesOptions} />}
          /> */}
          <Route
            path="form/:pokemonName"
            element={
              <Form
                pokemonTypesOptions={pokemonTypesOptions}
                tableRows={tableRows}
                handleUpdatePokemonRow={handleUpdatePokemonRow}
              />
            }
          />
          <Route index path="*" element={<Home tableRows={tableRows} />} />
        </Route>
      </Routes>
    </div>
  )
}

export default MyRoutes
