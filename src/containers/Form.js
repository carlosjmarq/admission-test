import React, { useEffect, useState } from 'react'
import { Text } from '../components/Text'
import { Selector } from '../components/Select'
import { useParams } from 'react-router-dom'
import { intersection, isEmpty } from 'lodash'
import { Chip, MenuItem } from '@mui/material'
import { Box } from '@mui/system'
import { ImageList } from '../components/ImageList'

// * use spritesTitles to set the titles to Images

// const spriteTitles = {
//   back_default: "Macho posterior",
//   back_female: "Hembra posterior",
//   back_shiny: "Macho brillante posterior",
//   back_shiny_female: "Hembra brillante posterior",
//   front_default: "Macho frontal",
//   front_female: "Hembra frontal",
//   front_shiny: "Macho frontal brillante",
//   front_shiny_female: "Hembra frontal brillante",
// };

const Form = ({ pokemonTypesOptions, tableRows, handleUpdatePokemonRow }) => {
  // const location = useLocation();
  const [selectedPokemon, setSelectedPokemon] = useState(null)
  const [newName, setNewName] = useState('')
  const [newDescription, setNewDescription] = useState('')
  const [newTypes, setNewTypes] = useState([])
  const [newFriends, setNewFriends] = useState([])
  const [posibleFriends, setPosibleFriends] = useState([])
  const [pokemonSprites, setPokemonSprites] = useState([])
  const [selectedSprite, setSelectedSprite] = useState(null)

  // * Use navigate to return root path
  // const navigate = useNavigate();
  const { pokemonName } = useParams()
  // const { sprites, id_pokemon } = location.state;

  useEffect(() => {
    if (!pokemonName || isEmpty(tableRows)) return
    setSelectedPokemon(tableRows.find(pokemon => pokemon.name === pokemonName))
  }, [pokemonName, tableRows])

  useEffect(() => {
    if (isEmpty(newTypes)) {
      setPosibleFriends([])
      return
    }
    setPosibleFriends(tableRows.filter(pokemon => {
      const pokemonTypes = pokemon.types.map(({ type }) => type.name)
      return !isEmpty(intersection(newTypes, pokemonTypes))
    }))
  }, [newTypes, tableRows])

  useEffect(() => {
    if (!selectedPokemon || isEmpty(selectedPokemon)) return
    const newSprites = []
    const pokemonSprites = selectedPokemon.sprites
    for (const sprite in pokemonSprites) {
      if (!!pokemonSprites[sprite] && typeof pokemonSprites[sprite] === 'string') {
        newSprites.push({
          sprite: pokemonSprites[sprite],
          title: sprite
        })
      }
    }
    setPokemonSprites(newSprites)
  }, [selectedPokemon])

  const onSubmit = (e) => {
    e.stopPropagation()
    e.preventDefault()
    console.log({ pokemonTypesOptions, posibleFriends, tableRows, pokemonSprites, selectedSprite })
    // handleUpdatePokemonRow({});
  }

  const renderTypeTag = (type) => {
    if (!type || isEmpty(type)) return (<></>)
    return (
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
        {type.map((value) => (
          <Chip key={value} label={value} color={'secondary'}/>
        ))}
      </Box>
    )
  }

  const renderTypeListItem = (type) => {
    if (!type || isEmpty(type)) return (<></>)
    return (
      <MenuItem
        key={type?.name}
        value={type?.name}
        >
        {type?.name}
      </MenuItem>
    )
  }

  const handleMultipleSelector = (event, setValue) => {
    const { target: { value } } = event
    // On autofill we get a stringified value.
    setValue(typeof value === 'string' ? value.split(',') : value)
  }

  // const handleSimpleSelector = (event, setValue) => {
  //   const { target: { value } } = event
  //   setValue(value)
  // }

  return (
    <form>
      <h1>¡Felicidades has atrapado un {selectedPokemon?.name}!</h1>
      <h3>Cuentanos mas sobre tu nuevo pokemon</h3>
      <Text
        label={'Nombre'}
        value={newName}
        setValue={setNewName}
      />
      <Text
        label={'Description'}
        value={newDescription}
        setValue={setNewDescription}
        multiline={true}
        rows={3}
      />

    <Selector
      label={'Tipo'}
      data={pokemonTypesOptions}
      renderListItem={renderTypeListItem}
      renderValue={renderTypeTag}
      value={newTypes}
      multiple
      onChange={event => handleMultipleSelector(event, setNewTypes)}
    />
    <Selector
      label={'Amigos'}
      data={posibleFriends}
      renderListItem={renderTypeListItem}
      value={newFriends}
      multiple
      onChange={event => handleMultipleSelector(event, setNewFriends)}
      disabled={isEmpty(posibleFriends)}
    />

    <ImageList
      value={selectedSprite}
      setValue={setSelectedSprite}
      data={pokemonSprites}
    />

    <button onSubmit={onSubmit}>Submit</button>
    <div onClick={onSubmit}>ABC</div>
  </form>
  )
}

export default Form
