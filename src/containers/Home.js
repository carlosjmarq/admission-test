import React from 'react'
import EnhancedTable from '../components/Table/Table'
import { useNavigate } from 'react-router-dom'

const Home = ({ tableRows }) => {
  const navigate = useNavigate()

  const handleEditButton = (row) => (event) => {
    event.stopPropagation()
    // const {
    //   htmlImage: ,
    //   htmlTypes,
    //   htmlMySprite,
    //   htmlMyTypes,
    //   htmlMyTeammates,
    //   ...params
    // } = row
    // ! NAVIGATE NOT ACCEPT HTML PARAMS
    navigate(`form/${row.name}`, {
      // state: { ...params }
    })
  }

  return (
    <div>
      {tableRows.length > 0
        ? (
        <EnhancedTable
          rowsProp={tableRows}
          handleEditButton={handleEditButton}
        />
          )
        : (
            'Loading...'
          )}
    </div>
  )
}

export default Home
