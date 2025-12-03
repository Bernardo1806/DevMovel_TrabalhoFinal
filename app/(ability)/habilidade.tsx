import { getAbilityByID } from '@/api/pokemonAPI'
import { Ionicons } from '@expo/vector-icons'
import { useScrollToTop } from '@react-navigation/native'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import React, { useEffect, useRef, useState } from 'react'
import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const habilidade = () => {
  const ref = useRef(null)
  useScrollToTop(ref)
  const navigation = useNavigation()

  const params = useLocalSearchParams()
  const currentID = Number(params.id) || 1

  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  const [nextData, setNextData] = useState(null)
  const [prevData, setPrevData] = useState(null)

  async function loadAbility(id) {
    setLoading(true)
    navigation.setOptions({ tabLoading: true })

    const current = await getAbilityByID(id)
    setData(current)

    const nextID = id >= 307 ? 1 : id + 1
    const prevID = id <= 1 ? 307 : id - 1

    const nextAbility = await getAbilityByID(nextID)
    const prevAbility = await getAbilityByID(prevID)

    setNextData(nextAbility)
    setPrevData(prevAbility)

    setLoading(false)
    navigation.setOptions({ tabLoading: false })
  }

  useEffect(() => {
    loadAbility(currentID)
  }, [currentID])

  function navigateToAbility(newID) {
    navigation.setParams({ id: newID })
  }

  function nextAbility() {
    const nextID = currentID >= 307 ? 1 : currentID + 1
    navigateToAbility(nextID)
  }

  function prevAbility() {
    const prevID = currentID <= 1 ? 307 : currentID - 1
    navigateToAbility(prevID)
  }

  const formatName = (name) => {
    if (!name) return ''
    return name.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
  }

  return (
    <View style={styles.container}>
      <View style={styles.navRow}>
        <View style={{ flex: 1 }}>
          <TouchableOpacity onPress={prevAbility} style={styles.arrowBtn}>
            <Ionicons name='chevron-back' size={30} color={'#fff'} />

            {prevData && (
              <Text style={styles.smallInfo}>{formatName(prevData.name)}</Text>
            )}
          </TouchableOpacity>
        </View>

        <View style={{ flex: 1 }}>
          <TouchableOpacity onPress={nextAbility} style={styles.arrowBtn}>
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
          <Text style={styles.name}>#{data.id} - {formatName(data.name)}</Text>
          <Text style={styles.info}>{formatName(data.gen)}</Text>

          <View style={styles.effectContainer}>
            <ScrollView nestedScrollEnabled={true}>
              <Text style={styles.effectText}>{data.effect}</Text>
            </ScrollView>
          </View>
        </View>
      )}
    </View>
  )
}

export default habilidade

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
    backgroundColor: '#4d52a0ff',
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
  smallInfo: {
    flex: 1,
    fontSize: 20,
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'PixelifySansVariableFont',
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
  content: {
    alignItems: 'center',
    backgroundColor: '#4d52a0ff',
    padding: 10,
    borderRadius: 20,
    width: '90%',
    elevation: 3,
    minHeight: '80%',
    maxHeight: '80%',
  },
  info: {
    fontSize: 16,
    color: '#fff',
    fontFamily: 'Silkscreen',
    textAlign: 'center',
    backgroundColor: 'rgba(0,0,0,.25)',
    paddingVertical: 2,
    paddingHorizontal: 10,
  },
  effectContainer: {
    width: "90%",
    maxHeight: '70%',
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 10,
    elevation: 10,
    marginTop: 20,
  },
  effectText: {
    fontSize: 24,
    fontFamily: "PixelifySansVariableFont",
    textAlign: "center",
  },
})