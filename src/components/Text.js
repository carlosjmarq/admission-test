import React from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'

export const Text = ({ value, setValue, ...props }) => {
  console.log({ props, a: 1 })
  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' }
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          value={value}
          variant="outlined"
          onChange={setValue}
          {...props}
        />
      </div>
    </Box>
  )
}
