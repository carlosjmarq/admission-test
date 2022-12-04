import * as React from 'react'
import MuiImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'
// import ImageListItemBar from '@mui/material/ImageListItemBar'
import './ImageList.css'

export const ImageList = ({ value, setValue, data, ...props }) => {
  // const [selected, setSelected] = React.useState(null)
  // setSelected((st) => st + 1)
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <MuiImageList sx={{ width: 300, height: 300 }} cols={3} rowHeight={100}>
          {!!data &&
            data.map((item) => (
              <div key={item.title} className={`sprite ${value === item.title ? 'selectedSprite' : ''}`}>
                <ImageListItem>
                  <img
                    src={`${item.sprite}?w=164&h=164&fit=crop&auto=format`}
                    srcSet={`${item.sprite}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                    alt={item.title}
                    loading="lazy"
                    onClick={() => setValue(item.title)}
                  />
                  {/* <ImageListItemBar title={item.title} /> */}
                </ImageListItem>
              </div>
            ))}
      </MuiImageList>
    </div>
  )
}
