import React, { useEffect, useState } from 'react'
import { Text } from '../components/Text'
// import { Selector } from '../components/Select'
import { useParams } from 'react-router-dom'
import { isEmpty } from 'lodash'

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
  // const [newTypes, setTypes] = useState([])
  // const [newFriends, setFriends] = useState([])

  // * Use navigate to return root path
  // const navigate = useNavigate();
  const { pokemonName } = useParams()
  // const { sprites, id_pokemon } = location.state;

  useEffect(() => {
    if (!pokemonName || isEmpty(tableRows)) return
    setSelectedPokemon(tableRows.find(pokemon => pokemon.name === pokemonName))
  }, [pokemonName, tableRows])

  // const onSubmit = (e) => {
  //   e.stopPropagation();
  //   e.preventDefault();
  //   handleUpdatePokemonRow({});
  // };

  console.log(selectedPokemon)

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

    {/* <Selector label={'New type'} defaultValue={selectedPokemon?.types} />
    <Selector
      label={'Best teammate'}
      // defaultValue={selectedPokemon?.my_teammates}
    /> */}

    {/* <ImageList defaultValue={selectedPokemon.my_sprite} /> */}

    <button>Submit</button>
  </form>
  )
}

export default Form
