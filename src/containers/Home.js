import React from 'react'
import EnhancedTable from '../components/Table/Table'
import { useNavigate } from 'react-router-dom'

const Home = ({ tableRows }) => {
  const navigate = useNavigate()

  const handleEditButton = (row) => (event) => {
    event.stopPropagation()
    const {
      html_image: htmlImage,
      html_types: htmlTypes,
      html_my_sprite: htmlMySprite,
      html_my_types: htmlMyTypes,
      html_my_teammates: htmlMyTeammates,
      ...params
    } = row
    // ! NAVIGATE NOT ACCEPT HTML PARAMS
    navigate(`form/${row.name}`, {
      state: { ...params }
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
