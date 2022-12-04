import React from 'react'
import EnhancedTable from '../components/Table/Table'
import { useNavigate } from 'react-router-dom'

const Home = ({ tableRows, catchedPokemon }) => {
  const navigate = useNavigate()

  const handleEditButton = (row) => (event) => {
    event.stopPropagation()
    navigate(`form/${row.name}`)
  }

  return (
    <div>
      {tableRows.length > 0
        ? (
        <EnhancedTable
          rowsProp={tableRows}
          handleEditButton={handleEditButton}
          catchedPokemon={catchedPokemon}
        />
          )
        : (
            'Loading...'
          )}
    </div>
  )
}

export default Home
