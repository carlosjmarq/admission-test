import React, { useCallback, useEffect, useState } from 'react'
import { Text } from '../components/Text'
import { Selector } from '../components/Select'
import { useNavigate, useParams } from 'react-router-dom'
import { clone, cloneDeep, intersection, isEmpty } from 'lodash'
import { Chip, MenuItem } from '@mui/material'
import { Box } from '@mui/system'
import { ImageList } from '../components/ImageList'
import { useLocalStorage } from '../hooks/useLocalStorage'
import './Form.css'

// * use spritesTitles to set the titles to Images

const Form = ({ pokemonTypesOptions, tableRows, handleUpdatePokemonRow }) => {
  const [selectedPokemon, setSelectedPokemon] = useState(null)
  const [newName, setNewName] = useState('')
  const [newDescription, setNewDescription] = useState('')
  const [newTypes, setNewTypes] = useState([])
  const [newFriends, setNewFriends] = useState([])
  const [posibleFriends, setPosibleFriends] = useState([])
  const [pokemonSprites, setPokemonSprites] = useState([])
  const [selectedSprite, setSelectedSprite] = useState(null)

  // * Use navigate to return root path
  const navigate = useNavigate()
  const { pokemonName } = useParams()
  const { getCatchedPokemons, saveCatchedPokemon } = useLocalStorage()

  const getPokemonSprites = useCallback(() => {
    const newSprites = []
    const pokemonSprites = clone(selectedPokemon.sprites)
    for (const sprite in pokemonSprites) {
      if (!!pokemonSprites[sprite] && typeof pokemonSprites[sprite] === 'string') {
        newSprites.push({
          sprite: pokemonSprites[sprite],
          title: sprite
        })
      }
    }
    setPokemonSprites(newSprites)
    return newSprites
  }, [selectedPokemon])

  const updatePokemon = useCallback((pokemon, sprites) => {
    setNewName(pokemon.name)
    setNewDescription(pokemon.description)
    setNewTypes(pokemon.types.map(({ type }) => type.name))
    setNewFriends(pokemon.friends)
    setSelectedSprite(sprites.find(({ sprite }) => sprite === pokemon.sprites.front_default).title)
  }, [])

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
    const sprites = getPokemonSprites()
    const pokemons = getCatchedPokemons()
    const savedPokemon = pokemons.find(pok => pok.id === selectedPokemon?.id)
    if (!isEmpty(savedPokemon)) {
      updatePokemon(savedPokemon, sprites)
    }
  }, [getPokemonSprites, updatePokemon, selectedPokemon, getCatchedPokemons])

  const onSubmit = async (event) => {
    event.preventDefault()
    if (!newName || isEmpty(newTypes) || !selectedSprite) return
    const newPokemonData = {
      ...cloneDeep(selectedPokemon),
      name: newName,
      description: newDescription,
      types: newTypes.map((type, index) => ({ slot: index + 1, type: { name: type } })),
      friends: newFriends
    }
    newPokemonData.sprites.front_default = pokemonSprites.find(sprite => sprite.title === selectedSprite).sprite
    newPokemonData.sprites.back_default = pokemonSprites.find(sprite => sprite.title === selectedSprite).sprite
    await saveCatchedPokemon(newPokemonData)
    navigate('/')
  }

  const renderTypeTag = (type) => {
    if (!type || isEmpty(type)) return (<></>)
    return (
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
        {type.map((value) => (
          <Chip key={value} label={value} color={'primary'}/>
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
    <form className='form-container'>
      <div>
        <h1>¡Felicidades has atrapado un {selectedPokemon?.name}!</h1>
        <h3>Cuentanos mas sobre tu nuevo pokemon</h3>
      </div>
      <div className='form-data-row'>
        <div className='form-column'>
          <Text
            label={'Nombre'}
            value={newName}
            setValue={setNewName}
          />
          <Text
            label={'Description'}
            value={newDescription}
            setValue={setNewDescription}
            multiline
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
            data={isEmpty(posibleFriends) ? tableRows : posibleFriends}
            renderListItem={renderTypeListItem}
            renderValue={renderTypeTag}
            value={newFriends}
            multiple
            onChange={event => handleMultipleSelector(event, setNewFriends)}
            disabled={isEmpty(posibleFriends)}
          />
        </div>
        <ImageList
          value={selectedSprite}
          setValue={setSelectedSprite}
          data={pokemonSprites}
        />
      </div>
      <button onClick={onSubmit} className={'primary-button'}>Registrar</button>
    </form>
  )
}

export default Form
