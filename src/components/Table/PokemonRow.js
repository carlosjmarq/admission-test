import React from 'react'
import { Checkbox, TableCell, TableRow } from '@mui/material'
import './PokemonRow.css'

export const PokemonRow = ({ row, index, selected, setSelected, handleEditButton }) => {
  const isSelected = (name) => selected.indexOf(name) !== -1
  const isItemSelected = isSelected(row.name)
  const labelId = `enhanced-table-checkbox-${index}`

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
      key={row.name}
      selected={isItemSelected}
    >
      <TableCell padding="checkbox">
        <Checkbox color="primary" checked={isItemSelected} />
        <TableCell padding="checkbox">
          <button onClick={handleEditButton(row)}>Edit</button>
        </TableCell>
      </TableCell>
      <TableCell className="image-cell" align="right">
        <img className="pokemon-front-img" src={row.sprites.front_default}/>
        <img className="pokemon-back-img" src={row.sprites.back_default}/>
      </TableCell>
      <TableCell align="right">{row.id}</TableCell>
      <TableCell
        component="th"
        id={labelId}
        scope="row"
        padding="none"
      >
        {row.name}
      </TableCell>
      <TableCell align="right">
        <ul>
          {!!row.types && row.types.map(({ type }) => (
            <li key={type.name}>{type.name}</li>
          ))}
        </ul>
      </TableCell>
      <TableCell align="right">{'Amigo <3'}</TableCell>
      <TableCell align="right">{row.height}</TableCell>
      <TableCell align="right">{row.weight}</TableCell>
      <TableCell align="right">{row?.description}</TableCell>
    </TableRow>
  )
}
