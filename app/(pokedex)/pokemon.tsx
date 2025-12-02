import { getPokemonByID } from '@/api/pokemonAPI';
import { TYPE_ICONS } from '@/components/pokemonData';
import { Ionicons } from '@expo/vector-icons';
import { useScrollToTop } from '@react-navigation/native';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const pokemon = () => {
  const ref = useRef(null)
  useScrollToTop(ref)
  const navigation = useNavigation()

  const params = useLocalSearchParams()
  const currentID = Number(params.id) || 1

  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  const [nextData, setNextData] = useState(null)
  const [prevData, setPrevData] = useState(null)

  async function loadPokemon(id) {
    setLoading(true)
    navigation.setOptions({ tabLoading: true })

    const current = await getPokemonByID(id)
    setData(current)

    const nextID = id >= 1025 ? 1 : id + 1
    const prevID = id <= 1 ? 1025 : id - 1

    const nextPoke = await getPokemonByID(nextID)
    const prevPoke = await getPokemonByID(prevID)

    setNextData(nextPoke)
    setPrevData(prevPoke)

    setLoading(false)
    navigation.setOptions({ tabLoading: false })
  }

  useEffect(() => {
    loadPokemon(currentID)
  }, [currentID])

  function navigateToPokemon(newID) {
    navigation.setParams({ id: newID })
  }

  function nextPokemon() {
    const nextID = currentID >= 1025 ? 1 : currentID + 1
    navigateToPokemon(nextID)
  }

  function prevPokemon() {
    const prevID = currentID <= 1 ? 1025 : currentID - 1
    navigateToPokemon(prevID)
  }

  const formatName = (name) => {
    if (!name) return ''
    return name.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
  }

  return (
    <View style={styles.container}>
      <View style={styles.navRow}>
        <View style={{ flex: 1 }}>
          <TouchableOpacity onPress={prevPokemon} style={styles.arrowBtn}>
            <Ionicons name='chevron-back' size={30} color={'#fff'} />

            {prevData && (
              <Text style={styles.smallInfo}>{formatName(prevData.name)}</Text>
            )}
          </TouchableOpacity>
        </View>

        <View style={{ flex: 1 }}>
          <TouchableOpacity onPress={nextPokemon} style={styles.arrowBtn}>
            {nextData && (
              <Text style={styles.smallInfo}>{formatName(nextData.name)}</Text>
            )}

            <Ionicons name='chevron-forward' size={30} color={'#fff'} />
          </TouchableOpacity>
        </View>
      </View>

      {loading && (
        <ActivityIndicator size={'large'} style={{ marginTop: 20 }} />
      )}

      {!loading && data && (
        <View style={styles.content}>
          <Text style={styles.name}>
            {formatName(data.name)} #{data.id.toString().padStart(4, '0')}
          </Text>

          <Image
            source={{ uri: data.image }}
            style={styles.image}
          />

          <View style={styles.typeRow}>
            {data.types.map(type => (
              <Image 
                key={type}
                source={{ uri: TYPE_ICONS[type]}}
                style={styles.typeTag}
              />
            ))}
          </View>
        </View>
      )}
    </View>
  )
}

export default pokemon

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    alignItems: 'center',
    backgroundColor: '#F4F4F4',
  },
  navRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4c6ca3ff',
    width: '90%',
    borderRadius: 100,
    marginBottom: 20,
    elevation: 10,
  },
  arrowBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    gap: 10,
  },
  content: {
    alignItems: 'center',
    width: '100%',
  },
  name: {
    fontSize: 28,
    fontFamily: 'PixelifySansMedium',
    marginBottom: 15,
    backgroundColor: '#ffffffff',
    borderRadius: 100,
    width: '80%',
    textAlign: 'center',
    padding: 5,
    borderWidth: 2,
    borderColor: '#aaaaaaff'
  },
  image: {
    width: 260,
    height: 260,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  typeRow: {
    flexDirection: 'row',
    backgroundColor: '#eee',
    borderWidth: 2,
    borderColor: '#3f3e3eff',
    borderRadius: 100,
    padding: 10,
    gap: 8,
  },
  typeTag: {
    width: 40,
    height: 40,
    borderRadius: 100,
  },
  smallInfo: {
    flex: 1,
    fontSize: 20,
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'PixelifySansVariableFont',
  },
})