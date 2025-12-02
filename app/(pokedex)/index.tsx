import { getAllPokemons } from '@/api/pokemonAPI'
import BottomModal from '@/components/BottomModal'
import FilterMenu from '@/components/FilterMenu'
import PokemonCard from '@/components/PokemonCard'
import PokemonCardSkeleton from '@/components/PokemonCardSkeleton'
import { GENERATIONS, TYPE_ICONS } from '@/components/pokemonData'

import { Ionicons } from '@expo/vector-icons'
import { useScrollToTop } from '@react-navigation/native'
import { useNavigation } from 'expo-router'
import React, { useEffect, useRef, useState } from 'react'
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'

const index = () => {

  // Navegações
  const ref = useRef(null)
  useScrollToTop(ref)
  const navigation = useNavigation()

  // Dados
  const [originalPokemons, setOriginalPokemons] = useState([])
  const [pokemons, setPokemons] = useState([])
  const [loading, setLoading] = useState(true)

  // Filtro
  const [search, setSearch] = useState('')
  const [selectedType, setSelectedType] = useState(null)
  const [selectedGeneration, setSelectedGeneration] = useState(null)

  // Visibilidade
  const [menuOpen, setMenuOpen] = useState(false)
  const [modals, setModals] = useState({ search: false, type: false, gen: false })

  const openModal = (name) => {
    setMenuOpen(false)
    setModals({ ...modals, [name]: true })
  }

  const closeModal = (name) => setModals({ ...modals, [name]: false })

  useEffect(() => {
    async function load() {
      navigation.setOptions({ tabLoading: true })

      const data = await getAllPokemons()
      setOriginalPokemons(data)
      setPokemons(data)
      setLoading(false)

      navigation.setOptions({ tabLoading: false })
    }
    load()
  }, [])

  const applyFilter = () => {
    let filtered = [...originalPokemons]

    if (search.trim() !== "") {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase())
      )
    }

    if (selectedType) {
      filtered = filtered.filter(p =>
        p.types.includes(selectedType)
      )
    }

    if (selectedGeneration) {
      const { min, max } = GENERATIONS.find(g => g.gen === selectedGeneration)
      filtered = filtered.filter(p => p.id >= min && p.id <= max)
    }

    setPokemons(filtered)
    setModals({ search: false, type: false, gen: false })
  }

  const typeIconsArray = Object.keys(TYPE_ICONS).map((key) => ({
    name: key,
    icon: TYPE_ICONS[key]
  }))

  if (loading) {

    const skeletonData = Array.from({ length: 10 }, (_, i) => i)

    return (
      <View style={{ flex: 1 }}>
        <FlatList
          data={skeletonData}
          keyExtractor={(item) => item.toString()}
          renderItem={() => <PokemonCardSkeleton />}
          numColumns={1}
          contentContainerStyle={styles.list}
        />
      </View>
    )
  }

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        ref={ref}
        data={pokemons}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <PokemonCard
            pokemon={item}
            onPress={() => navigation.navigate("pokemon", { id: item.id })}
          />
        )}
        numColumns={1}
        contentContainerStyle={styles.list}
      />

      <FilterMenu
        visible={menuOpen}
        onToggle={() => setMenuOpen(!menuOpen)}
        onSearch={() => openModal('search')}
        onType={() => openModal('type')}
        onGen={() => openModal('gen')}
        selectedType={selectedType}
        selectedGen={selectedGeneration}
        typeIcons={TYPE_ICONS}
      />

      {/* Modal de Busca */}
      <BottomModal visible={modals.search} onClose={() => closeModal('search')}>
        <TextInput
          placeholder='Buscar Pokémon...'
          placeholderTextColor='#ccc'
          style={styles.input}
          value={search}
          onChangeText={setSearch}
        />
        <ApplyButton onPress={applyFilter} />
      </BottomModal>


      {/* Modal de Tipagem */}
      <BottomModal visible={modals.type} onClose={() => closeModal('type')}>
        <FlatList
          data={typeIconsArray}
          numColumns={2}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.typeBadge,
                selectedType === item.name && { backgroundColor: '#D62828' }
              ]}
              onPress={() => setSelectedType(item.name)}
            >
              <Text style={styles.badgeText}>
                {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
              </Text>
              <Image source={{ uri: item.icon }} style={styles.badgeIcon} />
            </TouchableOpacity>
          )}
        />

        <TouchableOpacity
          style={[
            styles.typeBadge,
            !selectedType && { backgroundColor: '#D62828' }
          ]}
          onPress={() => setSelectedType(null)}
        >
          <Text style={styles.typeText}>Nenhum</Text>
        </TouchableOpacity>

        <ApplyButton onPress={applyFilter} />
      </BottomModal>

      {/* Modal de Geração */}
      <BottomModal visible={modals.gen} onClose={() => closeModal('gen')}>
        {GENERATIONS.map(g => (
          <TouchableOpacity
            key={g.gen}
            style={[
              styles.generationBtn,
              selectedGeneration === g.gen && { backgroundColor: '#D62828' }
            ]}
            onPress={() => setSelectedGeneration(g.gen)}
          >
            <Text style={styles.typeText}>Geração {g.gen}</Text>
          </TouchableOpacity>
        ))}

        <TouchableOpacity
          style={[
            styles.typeBadge,
            selectedGeneration === null && { backgroundColor: '#D62828' }
          ]}
          onPress={() => setSelectedGeneration(null)}
        >
          <Text style={styles.typeText}>Todas</Text>
        </TouchableOpacity>

        <ApplyButton onPress={applyFilter} />
      </BottomModal>

    </View>
  )
}

const ApplyButton = ({ onPress }) => (
  <TouchableOpacity style={styles.applyBtn} onPress={onPress}>
    <Ionicons name='checkmark' size={28} color='#fff' />
  </TouchableOpacity>
)

export default index

const styles = StyleSheet.create({
  list: {
    padding: 8,
  },
  input: {
    backgroundColor: '#333',
    borderRadius: 10,
    padding: 10,
    color: '#fff',
    fontSize: 16,
  },
  applyBtn: {
    marginTop: 20,
    backgroundColor: '#D62828',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  typeBadge: {
    flex: 1,
    backgroundColor: '#444',
    padding: 10,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    margin: 5,
  },
  badgeText: {
    fontSize: 15,
    fontFamily: 'Silkscreen',
    color: '#fff',
  },
  badgeIcon: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    borderRadius: 100,
  },
  typeText: {
    fontFamily: 'Silkscreen',
    color: '#fff',
  },
  generationBtn: {
    backgroundColor: '#444',
    padding: 12,
    marginVertical: 5,
    alignItems: 'center',
    borderRadius: 8,
  },
})