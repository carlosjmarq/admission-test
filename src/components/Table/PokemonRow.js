import React, { useCallback, useEffect, useState } from 'react'
import { Checkbox, TableCell, TableRow } from '@mui/material'
import './PokemonRow.css'

export const PokemonRow = ({ row, index, selected, setSelected, handleEditButton, catchedPokemon }) => {
  const isSelected = useCallback((name) => selected.indexOf(name) !== -1, [selected])
  const isItemSelected = isSelected(row.name)
  const labelId = `enhanced-table-checkbox-${index}`

  const [displayData, setDisplayData] = useState(row)

  useEffect(() => {
    if (!isSelected(row.name) || !catchedPokemon) {
      setDisplayData(row)
      return
    }
    setDisplayData(catchedPokemon)
  }, [isSelected, catchedPokemon, row])

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name)
    let newSelected = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      )
    }

    setSelected(newSelected)
  }

  return (
    <TableRow
      hover
      onClick={(event) => {
        handleClick(event, row.name)
      }}
      role="checkbox"
      aria-checked={isItemSelected}
      tabIndex={-1}
      key={displayData.name}
      selected={isItemSelected}
    >
      <TableCell padding="checkbox">
        <Checkbox color="primary" padding="checkbox" checked={isItemSelected} />
        <div>
          <button onClick={handleEditButton(displayData)}>Edit</button>
        </div>
      </TableCell>
      <TableCell className="image-cell" align="right">
        <img className="pokemon-front-img" src={displayData.sprites.front_default}/>
        <img className="pokemon-back-img" src={displayData.sprites.back_default}/>
      </TableCell>
      <TableCell align="right">{displayData.id}</TableCell>
      <TableCell
        // component="th"
        id={labelId}
        // scope="row"
        // padding="none"
      >
        {displayData.name}
      </TableCell>
      <TableCell align="right">
        <ul>
          {!!displayData.types && displayData.types.map(({ type }) => (
            <li key={type.name}>{type.name}</li>
          ))}
        </ul>
      </TableCell>
      <TableCell>
        <ul>
          {!!displayData.friends && displayData.friends.map(friend => (
            <li key={friend}>{friend}</li>
          ))}
        </ul>
      </TableCell>
      <TableCell align="right">{displayData.height}</TableCell>
      <TableCell align="right">{displayData.weight}</TableCell>
      <TableCell align="right">{displayData?.description}</TableCell>
    </TableRow>
  )
}
