import { isEmpty } from 'lodash'

const catchedPokemonKey = 'catched-pokemon-v1'

export const saveCatchedPokemon = async (pokemon) => {
  const catchedPokemons = await getCatchedPokemons()
  if (isEmpty(catchedPokemons)) {
    window.localStorage.setItem(catchedPokemonKey, JSON.stringify([pokemon]))
    return
  }
  const updatedPokemons = updatePokemonList(catchedPokemons, pokemon)
  window.localStorage.setItem(catchedPokemonKey, JSON.stringify(updatedPokemons))
}

export const getCatchedPokemons = async () => {
  return JSON.parse(window.localStorage.getItem(catchedPokemonKey))
}

const updatePokemonList = (pokemonList, pokemon) => {
  return pokemonList.map(pok => {
    if (pok.id === pokemon.id) {
      return pokemon
    }
    return pok
  })
}
