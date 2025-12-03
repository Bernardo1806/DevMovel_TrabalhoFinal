import { getMoveByID } from '@/api/pokemonAPI'
import { MOVE_CATEGORY_ICONS, TYPE_ICONS } from '@/components/pokemonData'
import { Ionicons } from '@expo/vector-icons'
import { useScrollToTop } from '@react-navigation/native'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import React, { useEffect, useRef, useState } from 'react'
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const move = () => {
  const ref = useRef(null)
  useScrollToTop(ref)
  const navigation = useNavigation()

  const params = useLocalSearchParams()
  const currentID = Number(params.id) || 1

  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  const [nextData, setNextData] = useState(null)
  const [prevData, setPrevData] = useState(null)

  async function loadMove(id) {
    setLoading(true)
    navigation.setOptions({ tabLoading: true })

    const current = await getMoveByID(id)
    setData(current)

    const nextID = id >= 919 ? 1 : id + 1
    const prevID = id <= 1 ? 919 : id - 1

    const nextMove = await getMoveByID(nextID)
    const prevMove = await getMoveByID(prevID)

    setNextData(nextMove)
    setPrevData(prevMove)

    setLoading(false)
    navigation.setOptions({ tabLoading: false })
  }

  useEffect(() => {
    loadMove(currentID)
  }, [currentID])

  function navigateToMove(newID) {
    navigation.setParams({ id: newID })
  }

  function nextMove() {
    const nextID = currentID >= 919 ? 1 : currentID + 1
    navigateToMove(nextID)
  }

  function prevMove() {
    const prevID = currentID <= 1 ? 919 : currentID - 1
    navigateToMove(prevID)
  }

  const formatName = (name) => {
    if (!name) return ''
    return name.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
  }

  return (
    <View style={styles.container}>
      <View style={styles.navRow}>
        <View style={{ flex: 1 }}>
          <TouchableOpacity onPress={prevMove} style={styles.arrowBtn}>
            <Ionicons name='chevron-back' size={30} color={'#fff'} />

            {prevData && (
              <Text style={styles.smallInfo}>{formatName(prevData.name)}</Text>
            )}
          </TouchableOpacity>
        </View>

        <View style={{ flex: 1 }}>
          <TouchableOpacity onPress={nextMove} style={styles.arrowBtn}>
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
        <View style={{ width: "90%", alignItems: "center" }}>
          <ScrollView
            ref={ref}
            style={{ width: "100%" }}
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}
            overScrollMode="never"
            bounces={false}
          >
            <Text style={styles.name}>
              #{data.id} - {formatName(data.name)}
            </Text>

            <View style={styles.typeRow}>
              <Image source={{ uri: TYPE_ICONS[data.type] }} style={styles.typeTag} />
              <Image source={{ uri: MOVE_CATEGORY_ICONS[data.damage_class] }} style={[styles.typeTag, { backgroundColor: '#aaa', resizeMode: 'contain' }]} />
            </View>

            <View style={styles.table}>
              <View style={styles.tableColumn}>
                <Text style={styles.info}>Power</Text>
                <Text style={styles.info}>{data.power}</Text>
              </View>
              <View style={styles.tableColumn}>
                <Text style={styles.info}>Accuracy</Text>
                <Text style={styles.info}>{data.accuracy}</Text>
              </View>
              <View style={styles.tableColumn}>
                <Text style={styles.info}>PP</Text>
                <Text style={styles.info}>{data.pp}</Text>
              </View>
            </View>

            <View style={styles.effectContainer}>
              <ScrollView nestedScrollEnabled={true}>
                <Text style={styles.effectText}>{data.effect}</Text>
              </ScrollView>
            </View>
          </ScrollView>
        </View>
      )}
    </View>
  )
}

export default move

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    alignItems: 'center',
    backgroundColor: '#F4F4F4',
  },
  content: {
    flexGrow: 1,
    alignItems: 'center',
    backgroundColor: '#4d52a0ff',
    padding: 10,
    borderRadius: 20,
    maxHeight: '90%',
    minHeight: '90%',
    elevation: 3,
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
  table: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    gap: 20,
    width: '90%',
    paddingVertical: 10,
  },
  tableColumn: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'rgba(63, 140, 160, 0.25)',
    elevation: 2,
    borderRadius: 5,
    paddingHorizontal: 5,
  },
  info: {
    fontSize: 20,
    fontFamily: 'Silkscreen',
    textAlign: 'center',
  },
  effectContainer: {
    width: "90%",
    maxHeight: '40%',
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 10,
    elevation: 10,
    marginTop: 20,
    marginBottom: 20,
    flexShrink: 0,
  },
  effectText: {
    fontSize: 24,
    fontFamily: "PixelifySansVariableFont",
    textAlign: "center",
  },
  typeRow: {
    flexDirection: 'row',
    backgroundColor: '#eee',
    borderWidth: 2,
    borderColor: '#3f3e3eff',
    borderRadius: 100,
    padding: 10,
    gap: 8,
    marginBottom: 20,
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
})