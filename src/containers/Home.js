import React from 'react'
import EnhancedTable from '../components/Table/Table'
import LinearProgress from '@mui/material/LinearProgress'
import { useNavigate } from 'react-router-dom'
import { Box } from '@mui/system'
import { Typography } from '@mui/material'
import './Home.css'

const Home = ({ tableRows, progress }) => {
  const navigate = useNavigate()

  const handleEditButton = (row) => (event) => {
    event.stopPropagation()
    navigate(`form/${row.name}`)
  }

  const LinearProgressWithLabel = (props) => {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ width: '100%', mr: 1 }}>
          <LinearProgress variant="determinate" {...props} />
        </Box>
        <Box sx={{ minWidth: 35 }}>
          <Typography variant="body2" color="text.secondary">{`${Math.round(
            props.value
          )}%`}</Typography>
        </Box>
      </Box>
    )
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
          <>
            <LinearProgressWithLabel value={progress} />
            <div className='loading-container'>
              <img src={'https://i.gifer.com/Ws1q.gif'}/>
              <h3>Cargando tus pokemon ...</h3>
            </div>
          </>
          )}
    </div>
  )
}

export default Home
