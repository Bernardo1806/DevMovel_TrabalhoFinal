import AsyncStorage from "@react-native-async-storage/async-storage"
import api from "./api"

const cacheKey = "pokemonCacheV1"
const cacheExpiration = 1000 * 60 * 60 * 24 // 24 Horas

export async function getAllPokemons() {
    try {

        // const cached = await AsyncStorage.getItem(cacheKey)

        // if (cached) {
        //     const parsed = JSON.parse(cached)

        //     if (Date.now() - parsed.timestamp < cacheExpiration) {
        //         console.log("Carregando pokémons do cache...")
        //         return parsed.data
        //     }
        // }

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
            cacheKey,
            JSON.stringify({
                timestamp: Date.now(),
                data: detailedPokemons,
            })
        )

        return detailedPokemons
    } catch (error) {
        console.error("Erro ao carregar pokémons:", error.message)

        const fallback = await AsyncStorage.getItem(cacheKey)
        if (fallback) {
            console.log("Usando cache antigo (API falhou)")
            return JSON.parse(fallback).data
        }

        return []
    }
}