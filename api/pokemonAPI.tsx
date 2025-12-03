import AsyncStorage from "@react-native-async-storage/async-storage"
import api from "./api"

const cacheExpiration = 1000 * 60 * 60 * 24 // 24 Horas

async function fetchWithCache(cacheKey, fetchFn) {
    try {
        const cached = await AsyncStorage.getItem(cacheKey)
        if (cached) {
            const parsed = JSON.parse(cached)
            if (Date.now() - parsed.timestamp < cacheExpiration) {
                console.log(`Carregando ${cacheKey} do cache...`)
                return parsed.data
            }
        }

        console.log(`Carregando ${cacheKey} da API...`)
        const data = await fetchFn()

        await AsyncStorage.setItem(
            cacheKey,
            JSON.stringify({ timestamp: Date.now(), data })
        )

        return data
    } catch (error) {
        console.log(`Erro ao carregar ${cacheKey}:`, error.message)

        const fallback = await AsyncStorage.getItem(cacheKey)
        if (fallback) {
            console.log(`Usando cache antigo (${cacheKey})`)
            return JSON.parse(fallback).data
        }

        return null
    }
}

async function fetchListWithDetails(listUrl, mapperFn) {
    const { data } = await api.get(listUrl)

    const results = await Promise.all(
        data.results.map(async (item) => {
            try {
                const detail = await api.get(item.url)
                return mapperFn(detail.data)
            } catch (error) {
                console.log(`Inválido ignorado: ${item.name}`)
                return null
            }
        })
    )

    return results.filter(item => item !== null)
}

export function getAllPokemons() {
    return fetchWithCache("pokemonList", async () => {
        return await fetchListWithDetails("pokemon?limit=1025", (data) => ({
            id: data.id,
            name: data.name,
            types: data.types.map(t => t.type.name),
            image: data.sprites.other["official-artwork"].front_default,
        }))
    })
}

export function getPokemonByID(ID) {
    return fetchWithCache(`pokemon_${ID}`, async () => {
        const { data } = await api.get(`pokemon/${ID}`)
        return {
            id: data.id,
            name: data.name,
            types: data.types.map(t => t.type.name),
            image: data.sprites.other["official-artwork"].front_default,
        }
    })
}

export function getAllMoves() {
    return fetchWithCache("moveList", async () => {
        return await fetchListWithDetails("move?limit=919", (data) => ({
            id: data.id,
            name: data.name,
            power: data.power ?? '-',
            accuracy: data.accuracy ?? '-',
            type: data.type.name,
            pp: data.pp,
            damage_class: data.damage_class.name,
        }))
    })
}

export function getMoveByID(ID) {
    return fetchWithCache(`move_${ID}`, async () => {
        const { data } = await api.get(`move/${ID}`)

        const effectEN =
            data.effect_entries.find(e => e.language.name === 'en')
            ?? data.flavor_text_entries?.find(e => e.language.name === 'en')

        return {
            id: data.id,
            name: data.name,
            power: data.power ?? '-',
            accuracy: data.accuracy ?? '-',
            type: data.type.name,
            pp: data.pp,
            damage_class: data.damage_class.name,
            effect: effectEN?.effect || effectEN?.flavor_text || "Sem descrição",
        }
    })
}

export function getAllAbility() {
    return fetchWithCache("abilityList", async () => {
        return await fetchListWithDetails("ability?limit=307", (data) => ({
            id: data.id,
            name: data.name,
            gen: data.generation.name,
        }))
    })
}

export function getAbilityByID(ID) {
    return fetchWithCache(`ability_${ID}`, async () => {
        const { data } = await api.get(`ability/${ID}`)

        const effectEN = data.effect_entries?.find(e => e.language.name === "en")

        return {
            id: data.id,
            name: data.name,
            gen: data.generation.name,
            effect: effectEN?.effect || "Sem descrição",
        }
    })
}

export function getAllItem() {
    return fetchWithCache("itemList", async () => {
        return await fetchListWithDetails("item?limit=2180", (data) => ({
            id: data.id,
            name: data.name,
            image: data.sprites?.default || 'https://imgur.com/t4EtWZA',
            category: data.category.name,
        }))
    })
}

export function getItemByID(ID) {
    return fetchWithCache(`item1_${ID}`, async () => {
        const { data } = await api.get(`item/${ID}`)

        const effectEN = data.effect_entries?.find(e => e.language.name === "en")

        return {
            id: data.id,
            name: data.name,
            image: data.sprites?.default || 'https://i.imgur.com/t4EtWZA.png',
            category: data.category.name,
            effect: effectEN?.effect || "Sem descrição",
        }
    })
}