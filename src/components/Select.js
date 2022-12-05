import React from 'react'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
}

export const Selector = ({ data, renderListItem, ...props }) => {
  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }} disabled={props.disabled ?? false}>
        <InputLabel id={`type-selector-label-${props.label}`}>{props.label}</InputLabel>
        <Select
          labelId={`type-selector-label-${props.label}`}
          id={`type-selector-${props.label}`}
          variant={'outlined'}
          MenuProps={MenuProps}
          {...props}
        >
          {data.map(renderListItem)}
        </Select>
      </FormControl>
    </div>
  )
}
