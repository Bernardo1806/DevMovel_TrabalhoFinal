import { getItemByID } from '@/api/pokemonAPI'
import { Ionicons } from '@expo/vector-icons'
import { useScrollToTop } from '@react-navigation/native'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import React, { useEffect, useRef, useState } from 'react'
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const items = () => {
  const ref = useRef(null)
  useScrollToTop(ref)
  const navigation = useNavigation()

  const params = useLocalSearchParams()
  const currentID = Number(params.id) || 1

  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  const [nextData, setNextData] = useState(null)
  const [prevData, setPrevData] = useState(null)

  async function loadItem(id) {
    setLoading(true)
    navigation.setOptions({ tabLoading: true })

    const current = await getItemByID(id)
    setData(current)

    const nextID = id >= 2229 ? 1 : id + 1
    const prevID = id <= 1 ? 2229 : id - 1

    const nextItem = await getItemByID(nextID)
    const prevItem = await getItemByID(prevID)

    setNextData(nextItem)
    setPrevData(prevItem)

    setLoading(false)
    navigation.setOptions({ tabLoading: false })
  }

  useEffect(() => {
    loadItem(currentID)
  }, [currentID])

  function navigateToItem(newID) {
    navigation.setParams({ id: newID })
  }

  function nextItem() {
    const nextID = currentID >= 2229 ? 1 : currentID + 1
    navigateToItem(nextID)
  }

  function prevItem() {
    const prevID = currentID <= 1 ? 2229 : currentID - 1
    navigateToItem(prevID)
  }

  const formatName = (name) => {
    if (!name) return ''
    return name.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
  }

  return (
    <View style={styles.container}>
      <View style={styles.navRow}>
        <View style={{ flex: 1 }}>
          <TouchableOpacity onPress={prevItem} style={styles.arrowBtn}>
            <Ionicons name='chevron-back' size={30} color={'#fff'} />

            {prevData && (
              <Text style={styles.smallInfo}>{formatName(prevData.name)}</Text>
            )}
          </TouchableOpacity>
        </View>

        <View style={{ flex: 1 }}>
          <TouchableOpacity onPress={nextItem} style={styles.arrowBtn}>
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
          <View style={styles.header}>
            <Image
              source={{ uri: data.image }}
              style={styles.image}
            />

            <Text style={styles.name}>#{data.id} - {formatName(data.name)}</Text>
          </View>

          <Text style={styles.info}>{formatName(data.category)}</Text>

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

export default items

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
    maxHeight: 50,
    textAlign: 'center',
    padding: 5,
    borderWidth: 2,
    borderColor: '#aaaaaaff'
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
  image: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
})