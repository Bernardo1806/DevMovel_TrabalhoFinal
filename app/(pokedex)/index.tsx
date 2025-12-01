import { getAllPokemons } from '@/api/pokemonAPI'
import PokemonCard from '@/components/PokemonCard'
import { useNavigation } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native'

const index = () => {
  const [pokemons, setPokemons] = useState([])
  const [loading, setLoading] = useState(true)

  const navigation = useNavigation()

  useEffect(() => {
    async function load() {
      navigation.setOptions({ tabLoading: true })

      const data = await getAllPokemons()
      setPokemons(data)
      setLoading(false)

      navigation.setOptions({ tabLoading: false })
    }
    load()
  }, [])

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size='large' />
      </View>
    )
  }

  return (
    <FlatList
      data={pokemons}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <PokemonCard pokemon={item} />}
      numColumns={1}
      contentContainerStyle={styles.list}
    />
  )
}

export default index

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
  },
  list: {
    padding: 8,
  },
})