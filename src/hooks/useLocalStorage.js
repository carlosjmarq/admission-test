import { isEmpty } from 'lodash'
import { useCallback, useEffect, useState } from 'react'

const catchedPokemonKey = 'catched-pokemon-v1'

export const useLocalStorage = () => {
  const [catchedPokemon, setCatchedPokemon] = useState([])

  const getCatchedPokemons = useCallback(() => {
    return JSON.parse(window.localStorage.getItem(catchedPokemonKey))
  }, [])

  useEffect(() => {
    setCatchedPokemon(getCatchedPokemons())
  }, [getCatchedPokemons])

  const saveCatchedPokemon = useCallback((pokemon) => {
    const catchedPokemons = getCatchedPokemons()
    if (isEmpty(catchedPokemons)) {
      window.localStorage.setItem(catchedPokemonKey, JSON.stringify([pokemon]))
      return
    }
    const updatedPokemons = updatePokemonList(catchedPokemons, pokemon)
    setCatchedPokemon(updatedPokemons)
    window.localStorage.setItem(catchedPokemonKey, JSON.stringify(updatedPokemons))
  }, [getCatchedPokemons])

  const updatePokemonList = (pokemonList, pokemon) => {
    const savedPokemon = pokemonList.find(pok => pok.id === pokemon.id)
    if (!savedPokemon) {
      return [...pokemonList, pokemon]
    }
    return pokemonList.map(pok => {
      if (pok.id === pokemon.id) {
        return pokemon
      }
      return pok
    })
  }

  return {
    saveCatchedPokemon,
    getCatchedPokemons,
    catchedPokemon
  }
}
