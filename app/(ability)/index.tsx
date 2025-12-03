import { getAllAbility } from '@/api/pokemonAPI'
import AbilityCard from '@/components/AbilityCard'
import { useScrollToTop } from '@react-navigation/native'
import { useNavigation } from 'expo-router'
import React, { useEffect, useRef, useState } from 'react'
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native'

const index = () => {
  // Navegações
  const ref = useRef(null)
  useScrollToTop(ref)
  const navigation = useNavigation()

  // Dados
  const [abilitys, setAbilitys] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      navigation.setOptions({ tabLoading: true })

      const data = await getAllAbility()
      setAbilitys(data)
      setLoading(false)

      navigation.setOptions({ tabLoading: false })
    }
    load()
  }, [])

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size={'large'} />
      </View>
    )
  }

  return (
    <View style={{ flex: 1 }}>
      <FlatList 
        ref={ref}
        data={abilitys}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <AbilityCard 
            ability={item}
            onPress={() => navigation.navigate("habilidade", { id: item.id })}
          />
        )}
        numColumns={1}
        contentContainerStyle={styles.list}
      />
    </View>
  )
}

export default index

const styles = StyleSheet.create({
  list: {
    padding: 8,
  },
})