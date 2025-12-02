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

const cacheAllKeyMove = "moveCacheV1"

export async function getAllMoves() {
    try {

        const cached = await AsyncStorage.getItem(cacheAllKeyMove)

        if (cached) {
            const parsed = JSON.parse(cached)

            if (Date.now() - parsed.timestamp < cacheExpiration) {
                console.log("Carregando moves do cache...")
                return parsed.data
            }
        }

        console.log("Carregando moves da API...")

        const { data } = await api.get("move?limit=919")

        const detailedMove = await Promise.all(
            data.results.map(async (move) => {
                const details = await api.get(move.url)

                return {
                    id: details.data.id,
                    name: details.data.name,
                    power: details.data.power ?? '-',
                    accuracy: details.data.accuracy ?? '-',
                    type: details.data.type.name,
                    pp: details.data.pp,
                    damage_class: details.data.damage_class.name,
                }
            })
        )

        await AsyncStorage.setItem(
            cacheAllKeyMove,
            JSON.stringify({
                timestamp: Date.now(),
                data: detailedMove,
            })
        )

        return detailedMove
    } catch (error) {
        console.error("Erro ao carregar moves:", error.message)

        const fallback = await AsyncStorage.getItem(cacheAllKeyMove)
        if (fallback) {
            console.log("Usando cache antigo (API falhou)")
            return JSON.parse(fallback).data
        }

        return []
    }
}

export async function getMoveByID(ID) {
    const cacheKey = `moveCache_${ID}`

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

        const { data } = await api.get(`move/${ID}/`)

        const detailsMove = {
            id: data.id,
            name: data.name,
            power: data.power ?? '-',
            accuracy: data.accuracy ?? '-',
            type: data.type.name,
            pp: data.pp,
            damage_class: data.damage_class.name,
            effect: data.effect_entries?.[0]?.effect ?? data.flavor_text_entries?.[0]?.flavor_text ?? 'Sem Descrição',
        }

        await AsyncStorage.setItem(
            cacheKey,
            JSON.stringify({
                timestamp: Date.now(),
                data: detailsMove,
            })
        )

        return detailsMove

    } catch (error) {
        console.error(`Erro ao carregar move ${ID}:`, error.message)

        const fallback = await AsyncStorage.getItem(cacheKey)
        if (fallback) {
            console.log("Usando cache antigo (API falhou)")
            return JSON.parse(fallback).data
        }
        return null
    }
}