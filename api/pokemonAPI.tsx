import AsyncStorage from "@react-native-async-storage/async-storage"
import api from "./api"

const cacheAllKey = "pokemonCacheV1"
const cacheExpiration = 1000 * 60 * 60 * 24 // 24 Horas

export async function getAllPokemons() {
    try {

        const cached = await AsyncStorage.getItem(cacheAllKey)

        if (cached) {
            const parsed = JSON.parse(cached)

            if (Date.now() - parsed.timestamp < cacheExpiration) {
                console.log("Carregando pokémons do cache...")
                return parsed.data
            }
        }

        console.log("Carregando pokémons da API...")

        const { data } = await api.get("pokemon?limit=1025")

        const detailedPokemons = await Promise.all(
            data.results.map(async (pokemon) => {
                const details = await api.get(pokemon.url)

                return {
                    id: details.data.id,
                    name: details.data.name,
                    types: details.data.types.map(t => t.type.name),
                    image: details.data.sprites.other["official-artwork"].front_default,
                }
            })
        )

        await AsyncStorage.setItem(
            cacheAllKey,
            JSON.stringify({
                timestamp: Date.now(),
                data: detailedPokemons,
            })
        )

        return detailedPokemons
    } catch (error) {
        console.error("Erro ao carregar pokémons:", error.message)

        const fallback = await AsyncStorage.getItem(cacheAllKey)
        if (fallback) {
            console.log("Usando cache antigo (API falhou)")
            return JSON.parse(fallback).data
        }

        return []
    }
}


export async function getPokemonByID(ID) {
    const cacheKey = `pokemonCache_${ID}`

    try {

        const cached = await AsyncStorage.getItem(cacheKey)

        if (cached) {
            const parsed = JSON.parse(cached)

            if (Date.now() - parsed.timestamp < cacheExpiration) {
                console.log(`Carregando pokémons ${ID} do cache...`)
                return parsed.data
            }
        }

        console.log(`Carregando pokémon ${ID} da API...`)

        const { data } = await api.get(`pokemon/${ID}/`)

        const detailsPokemon = {
            id: data.id,
            name: data.name,
            types: data.types.map(t => t.type.name),
            image: data.sprites.other["official-artwork"].front_default,
        }

        await AsyncStorage.setItem(
            cacheKey,
            JSON.stringify({
                timestamp: Date.now(),
                data: detailsPokemon,
            })
        )

        return detailsPokemon

    } catch (error) {
        console.error(`Erro ao carregar Pokémon ${ID}:`, error.message)

        const fallback = await AsyncStorage.getItem(cacheKey)
        if (fallback) {
            console.log("Usando cache antigo (API falhou)")
            return JSON.parse(fallback).data
        }
        return null
    }
}