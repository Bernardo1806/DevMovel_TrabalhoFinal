import { getAllPokemons } from '@/api/pokemonAPI'
import PokemonCard from '@/components/PokemonCard'
import { Ionicons } from '@expo/vector-icons'
import { useScrollToTop } from '@react-navigation/native'
import { useNavigation } from 'expo-router'
import React, { useEffect, useRef, useState } from 'react'
import { ActivityIndicator, FlatList, Image, Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'

const index = () => {

  const ref = useRef(null)
  useScrollToTop(ref)

  const [originalPokemons, setOriginalPokemons] = useState([])
  const [pokemons, setPokemons] = useState([])
  const [loading, setLoading] = useState(true)

  const [search, setSearch] = useState('')
  const [selectedType, setSelectedType] = useState(null)
  const [selectedGeneration, setSelectedGeneration] = useState(null)

  const [filterOpen, setFilterOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [typeOpen, setTypeOpen] = useState(false)
  const [genOpen, setGenOpen] = useState(false)

  const navigation = useNavigation()

  const typeIcons = {
    normal: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/e8ddc4da-23dd-4502-b65b-378c9cfe5efa/dffqwxu-4f2e91e3-184e-4b55-90e1-9a24d3a77ddb.png/v1/fit/w_300,h_900,q_70,strp/normal_type_symbol_sinnoh_by_jormxdos_dffqwxu-300w.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTI4MCIsInBhdGgiOiIvZi9lOGRkYzRkYS0yM2RkLTQ1MDItYjY1Yi0zNzhjOWNmZTVlZmEvZGZmcXd4dS00ZjJlOTFlMy0xODRlLTRiNTUtOTBlMS05YTI0ZDNhNzdkZGIucG5nIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.A_Y3CsEs230966gn6NuIDCxypwLJBYHjzV46TdUJQoE',
    fire: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/e8ddc4da-23dd-4502-b65b-378c9cfe5efa/dffqwy2-a24cae67-cfab-4753-ac92-74d30c736bc8.png/v1/fit/w_300,h_900,q_70,strp/fire_type_symbol_sinnoh_by_jormxdos_dffqwy2-300w.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTI4MCIsInBhdGgiOiIvZi9lOGRkYzRkYS0yM2RkLTQ1MDItYjY1Yi0zNzhjOWNmZTVlZmEvZGZmcXd5Mi1hMjRjYWU2Ny1jZmFiLTQ3NTMtYWM5Mi03NGQzMGM3MzZiYzgucG5nIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.w6tyF6JdD2m_IjCD-RzgWvdH8D_psqaKCLNtsR1DF4k',
    water: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/e8ddc4da-23dd-4502-b65b-378c9cfe5efa/dffqwyd-f2c7daf9-a780-400e-aa48-dd28e31f0ea8.png/v1/fit/w_300,h_900,q_70,strp/water_type_symbol_sinnoh_by_jormxdos_dffqwyd-300w.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTI4MCIsInBhdGgiOiIvZi9lOGRkYzRkYS0yM2RkLTQ1MDItYjY1Yi0zNzhjOWNmZTVlZmEvZGZmcXd5ZC1mMmM3ZGFmOS1hNzgwLTQwMGUtYWE0OC1kZDI4ZTMxZjBlYTgucG5nIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.veuu7Fb8cDq-qQr-cfvOcVAhDHiBYd_1ZDxPEDK9rNE',
    electric: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/e8ddc4da-23dd-4502-b65b-378c9cfe5efa/dffqwyh-61329514-fd15-4c9c-a34d-5082df139ea4.png/v1/fit/w_300,h_900,q_70,strp/electric_type_symbol_sinnoh_by_jormxdos_dffqwyh-300w.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTI4MCIsInBhdGgiOiIvZi9lOGRkYzRkYS0yM2RkLTQ1MDItYjY1Yi0zNzhjOWNmZTVlZmEvZGZmcXd5aC02MTMyOTUxNC1mZDE1LTRjOWMtYTM0ZC01MDgyZGYxMzllYTQucG5nIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.W6HsgmtXRITf2NXDiCsSnvvjSKJLocbUPtfiCxqk3No',
    grass: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/e8ddc4da-23dd-4502-b65b-378c9cfe5efa/dffqwys-bea7bc3f-f088-42aa-940b-9b430f4d8c39.png/v1/fit/w_300,h_900/grass_type_symbol_sinnoh_by_jormxdos_dffqwys-300w.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTI4MCIsInBhdGgiOiIvZi9lOGRkYzRkYS0yM2RkLTQ1MDItYjY1Yi0zNzhjOWNmZTVlZmEvZGZmcXd5cy1iZWE3YmMzZi1mMDg4LTQyYWEtOTQwYi05YjQzMGY0ZDhjMzkucG5nIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.tdDE2FwAlVZCMNXSWZFpRofv_GicMlofqzBTahB1NA8',
    ice: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/e8ddc4da-23dd-4502-b65b-378c9cfe5efa/dffqwz4-3d3ce1d6-e1c4-43f8-bade-d81ec63810e6.png/v1/fit/w_300,h_900/ice_type_symbol_sinnoh_by_jormxdos_dffqwz4-300w.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTI4MCIsInBhdGgiOiIvZi9lOGRkYzRkYS0yM2RkLTQ1MDItYjY1Yi0zNzhjOWNmZTVlZmEvZGZmcXd6NC0zZDNjZTFkNi1lMWM0LTQzZjgtYmFkZS1kODFlYzYzODEwZTYucG5nIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.zfJME-NMbY204E_zih46neCth6EktzVv81cHE0_Q__4',
    fighting: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/e8ddc4da-23dd-4502-b65b-378c9cfe5efa/dffqwzc-0f53a076-1616-4e73-a563-b8087408c821.png/v1/fit/w_300,h_900/fighting_type_symbol_sinnoh_by_jormxdos_dffqwzc-300w.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTI4MCIsInBhdGgiOiIvZi9lOGRkYzRkYS0yM2RkLTQ1MDItYjY1Yi0zNzhjOWNmZTVlZmEvZGZmcXd6Yy0wZjUzYTA3Ni0xNjE2LTRlNzMtYTU2My1iODA4NzQwOGM4MjEucG5nIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.k-1aoFGi_k-0UTprieOvIRBGoPXatAYuU-Z34WauA4g',
    poison: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/e8ddc4da-23dd-4502-b65b-378c9cfe5efa/dffqwzj-ae5158e3-e556-47a3-a2cb-1616d878f2ba.png/v1/fit/w_300,h_900/poison_type_symbol_sinnoh_by_jormxdos_dffqwzj-300w.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTI4MCIsInBhdGgiOiIvZi9lOGRkYzRkYS0yM2RkLTQ1MDItYjY1Yi0zNzhjOWNmZTVlZmEvZGZmcXd6ai1hZTUxNThlMy1lNTU2LTQ3YTMtYTJjYi0xNjE2ZDg3OGYyYmEucG5nIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.RSWBPr5h4KaTYL_rHl10gxmtwnOZeWSzszgMNcShkvM',
    ground: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/e8ddc4da-23dd-4502-b65b-378c9cfe5efa/dffqwzs-ad4d6ade-b780-4294-b87f-0de8aac6c625.png/v1/fit/w_300,h_900/ground_type_symbol_sinnoh_by_jormxdos_dffqwzs-300w.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTI4MCIsInBhdGgiOiIvZi9lOGRkYzRkYS0yM2RkLTQ1MDItYjY1Yi0zNzhjOWNmZTVlZmEvZGZmcXd6cy1hZDRkNmFkZS1iNzgwLTQyOTQtYjg3Zi0wZGU4YWFjNmM2MjUucG5nIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.7I13ckVYwNSbJ59j3sCvLLITZOnTrg08qUXICkDJX_8',
    flying: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/e8ddc4da-23dd-4502-b65b-378c9cfe5efa/dffqx00-28f6a3fd-cbbb-47c2-bddf-ea39cb8afe46.png/v1/fit/w_300,h_900/flying_type_symbol_sinnoh_by_jormxdos_dffqx00-300w.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTI4MCIsInBhdGgiOiIvZi9lOGRkYzRkYS0yM2RkLTQ1MDItYjY1Yi0zNzhjOWNmZTVlZmEvZGZmcXgwMC0yOGY2YTNmZC1jYmJiLTQ3YzItYmRkZi1lYTM5Y2I4YWZlNDYucG5nIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.-L0FE33uJbYM3T9xbOCic069JHt5uORUUVnlwAGdKJ0',
    psychic: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/e8ddc4da-23dd-4502-b65b-378c9cfe5efa/dffqx0d-1625502c-7f90-4ead-9535-34475d36d6e8.png/v1/fit/w_300,h_900/psychic_type_symbol_sinnoh_by_jormxdos_dffqx0d-300w.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTI4MCIsInBhdGgiOiIvZi9lOGRkYzRkYS0yM2RkLTQ1MDItYjY1Yi0zNzhjOWNmZTVlZmEvZGZmcXgwZC0xNjI1NTAyYy03ZjkwLTRlYWQtOTUzNS0zNDQ3NWQzNmQ2ZTgucG5nIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.MoUU6ZGnm_-SM6-UZaamQ_NbAIauBNwrux5EJOG4lL0',
    bug: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/e8ddc4da-23dd-4502-b65b-378c9cfe5efa/dffqx0t-3e7a76c3-3809-47a7-896f-81b314124aac.png/v1/fit/w_300,h_900/bug_type_symbol_sinnoh_by_jormxdos_dffqx0t-300w.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTI4MCIsInBhdGgiOiIvZi9lOGRkYzRkYS0yM2RkLTQ1MDItYjY1Yi0zNzhjOWNmZTVlZmEvZGZmcXgwdC0zZTdhNzZjMy0zODA5LTQ3YTctODk2Zi04MWIzMTQxMjRhYWMucG5nIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.XLuyD-iRY2yP1BKmQ16VCoWx_xc_bEPd-tUSy7q7K_c',
    rock: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/e8ddc4da-23dd-4502-b65b-378c9cfe5efa/dffqx12-f47a3644-381f-4309-b843-bfce4cf9af7a.png/v1/fit/w_300,h_900/rock_type_symbol_sinnoh_by_jormxdos_dffqx12-300w.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTI4MCIsInBhdGgiOiIvZi9lOGRkYzRkYS0yM2RkLTQ1MDItYjY1Yi0zNzhjOWNmZTVlZmEvZGZmcXgxMi1mNDdhMzY0NC0zODFmLTQzMDktYjg0My1iZmNlNGNmOWFmN2EucG5nIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.hQDmSy978Nr59R8wFyBoPviUGyHdSKGpbyrjMgPi2S4',
    ghost: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/e8ddc4da-23dd-4502-b65b-378c9cfe5efa/dffqx1b-fe8d9f13-73ff-4df9-9ac1-ab60d8692796.png/v1/fit/w_300,h_900/ghost_type_symbol_sinnoh_by_jormxdos_dffqx1b-300w.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTI4MCIsInBhdGgiOiIvZi9lOGRkYzRkYS0yM2RkLTQ1MDItYjY1Yi0zNzhjOWNmZTVlZmEvZGZmcXgxYi1mZThkOWYxMy03M2ZmLTRkZjktOWFjMS1hYjYwZDg2OTI3OTYucG5nIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.oAjWMmSlbE30gp9KdTCvUs7Pi6SAc5C2B3WfotYAzQs',
    dragon: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/e8ddc4da-23dd-4502-b65b-378c9cfe5efa/dffqx1k-50f1f0c0-06a0-4f13-a843-b1af269f0a67.png/v1/fit/w_300,h_900/dragon_type_symbol_sinnoh_by_jormxdos_dffqx1k-300w.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTI4MCIsInBhdGgiOiIvZi9lOGRkYzRkYS0yM2RkLTQ1MDItYjY1Yi0zNzhjOWNmZTVlZmEvZGZmcXgxay01MGYxZjBjMC0wNmEwLTRmMTMtYTg0My1iMWFmMjY5ZjBhNjcucG5nIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.pPjOpZg4WdDxb7uCz2fJ5OLEX7G317sqXRmt9BRAKK0',
    dark: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/e8ddc4da-23dd-4502-b65b-378c9cfe5efa/dffqx1v-f3764e90-b1f6-432a-897e-a41e6c68628a.png/v1/fit/w_300,h_900/dark_type_symbol_sinnoh_by_jormxdos_dffqx1v-300w.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTI4MCIsInBhdGgiOiIvZi9lOGRkYzRkYS0yM2RkLTQ1MDItYjY1Yi0zNzhjOWNmZTVlZmEvZGZmcXgxdi1mMzc2NGU5MC1iMWY2LTQzMmEtODk3ZS1hNDFlNmM2ODYyOGEucG5nIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.JXsErZjkQpU1GrOw2AgenqWUTCVWw50UForNQvXX13M',
    steel: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/e8ddc4da-23dd-4502-b65b-378c9cfe5efa/dffqx26-3f3df840-e25d-4ea5-a69c-b285d65e80eb.png/v1/fit/w_300,h_900/steel_type_symbol_sinnoh_by_jormxdos_dffqx26-300w.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTI4MCIsInBhdGgiOiIvZi9lOGRkYzRkYS0yM2RkLTQ1MDItYjY1Yi0zNzhjOWNmZTVlZmEvZGZmcXgyNi0zZjNkZjg0MC1lMjVkLTRlYTUtYTY5Yy1iMjg1ZDY1ZTgwZWIucG5nIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.csMKjmZwfUOP5AovshIrkG7kkqmDHeVkwOtzbCHzC4Y',
    fairy: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/e8ddc4da-23dd-4502-b65b-378c9cfe5efa/dffqx2d-a0dfea1e-7899-45fa-9769-64eef178a09b.png/v1/fit/w_300,h_900/fairy_type_symbol_sinnoh_by_jormxdos_dffqx2d-300w.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTI4MCIsInBhdGgiOiIvZi9lOGRkYzRkYS0yM2RkLTQ1MDItYjY1Yi0zNzhjOWNmZTVlZmEvZGZmcXgyZC1hMGRmZWExZS03ODk5LTQ1ZmEtOTc2OS02NGVlZjE3OGEwOWIucG5nIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.5SQLw5gGsup9wUqM8eb30yTp1LXlC7RAY1oBzaepTh8'
  }

  const Geracoes = [
    { gen: 1, min: 1, max: 151 },
    { gen: 2, min: 152, max: 251 },
    { gen: 3, min: 252, max: 386 },
    { gen: 4, min: 387, max: 493 },
    { gen: 5, min: 494, max: 649 },
    { gen: 6, min: 650, max: 721 },
    { gen: 7, min: 722, max: 809 },
    { gen: 8, min: 810, max: 898 },
    { gen: 9, min: 899, max: 1025 },
  ];

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
      const { min, max } = Geracoes.find(g => g.gen === selectedGeneration)
      filtered = filtered.filter(p => p.id >= min && p.id <= max)
    }

    setPokemons(filtered)
    setFilterOpen(false)
    setGenOpen(false)
    setSearchOpen(false)
    setTypeOpen(false)
  }

  const typeIconsArray = Object.keys(typeIcons).map((key) => ({
    name: key,
    icon: typeIcons[key]
  }))

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size='large' />
      </View>
    )
  }

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        ref={ref}
        data={pokemons}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <PokemonCard pokemon={item} />}
        numColumns={1}
        contentContainerStyle={styles.list}
      />

      <TouchableOpacity
        style={styles.fab}
        onPress={() => setFilterOpen(true)}
      >
        <Ionicons name={filterOpen ? 'close' : 'filter'} size={22} color='#fff' />
      </TouchableOpacity>

      {/* Modal de Filtros */}
      <Modal
        visible={filterOpen}
        transparent
        animationType='fade'
        onRequestClose={() => setFilterOpen(false)}
      >
        <Pressable
          style={styles.backdrop}
          onPress={() => setFilterOpen(false)}
        >
          <Pressable style={styles.circleContainer}>

            {/* Busca */}
            <TouchableOpacity style={styles.circleButton} onPress={() => setSearchOpen(true)}>
              <Ionicons name='search' size={28} color='#fff' />
            </TouchableOpacity>

            {/* Tipagem */}
            <TouchableOpacity style={styles.circleButton} onPress={() => setTypeOpen(true)}>
              {selectedType ? (
                <Image
                  source={{ uri: typeIcons[selectedType] }}
                  style={{ width: 35, height: 35, resizeMode: 'contain', borderRadius: 100 }}
                />
              ) : (
                <Ionicons name='pricetag' size={28} color='#fff' />
              )}
            </TouchableOpacity>

            {/* Geração */}
            <TouchableOpacity style={styles.circleButton} onPress={() => setGenOpen(true)}>
              {selectedGeneration ? (
                <Text
                  style={{
                    color: '#fff',
                    fontSize: 24,
                    fontFamily: 'PixelifySansSemiBold',
                  }}
                >
                  {selectedGeneration}°
                </Text>
              ) : (
                <Ionicons name='layers' size={28} color='#fff' />
              )}
            </TouchableOpacity>

          </Pressable>
        </Pressable>
      </Modal>

      {/* Modal de Busca */}
      <Modal
        visible={searchOpen}
        transparent
        animationType='fade'
        onRequestClose={() => setSearchOpen(false)}
      >

        <Pressable style={styles.backdrop} onPress={() => setSearchOpen(false)}>
          <Pressable style={styles.filterBox} onPress={() => { }}>
            <TextInput
              placeholder='Buscar Pokémon...'
              placeholderTextColor='#ccc'
              style={styles.input}
              value={search}
              onChangeText={setSearch}
            />

            <TouchableOpacity style={styles.applyBtn} onPress={applyFilter}>
              <Ionicons name='checkmark' size={28} color={'#fff'} />
            </TouchableOpacity>
          </Pressable>
        </Pressable>

      </Modal>

      {/* Modal de Tipagem */}
      <Modal
        visible={typeOpen}
        transparent
        animationType='fade'
        onRequestClose={() => setTypeOpen(false)}
      >

        <Pressable style={styles.backdrop} onPress={() => setTypeOpen(false)}>
          <Pressable style={styles.filterBox} onPress={() => { }}>
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

                  <Text
                    style={{
                      fontSize: 15,
                      fontFamily: 'Silkscreen',
                      color: '#fff',
                    }}
                  >
                    {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
                  </Text>
                  <Image
                    source={{ uri: item.icon }}
                    style={{ width: 40, height: 40, resizeMode: 'contain', borderRadius: 100 }}
                  />
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

            <TouchableOpacity style={styles.applyBtn} onPress={applyFilter}>
              <Ionicons name='checkmark' size={28} color='#fff' />
            </TouchableOpacity>
          </Pressable>
        </Pressable>

      </Modal>

      {/* Modal de Geração */}
      <Modal
        visible={genOpen}
        transparent
        animationType='fade'
        onRequestClose={() => setGenOpen(false)}
      >

        <Pressable style={styles.backdrop} onPress={() => setGenOpen(false)}>
          <Pressable style={styles.filterBox} onPress={() => { }}>
            {Geracoes.map(g => (
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
                styles.generationBtn,
                selectedGeneration === null && { backgroundColor: '#D62828' }
              ]}
              onPress={() => setSelectedGeneration(null)}
            >
              <Text style={styles.typeText}>Todas</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.applyBtn} onPress={applyFilter}>
              <Ionicons name='checkmark' size={28} color='#fff' />
            </TouchableOpacity>
          </Pressable>
        </Pressable>

      </Modal>

    </View>
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
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 55,
    height: 55,
    borderRadius: 100,
    backgroundColor: '#D62828',
    justifyContent: 'center',
    alignItems: 'center',

    elevation: 10,
  },
  backdrop: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  circleContainer: {
    position: 'absolute',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    bottom: 130,
    marginBottom: 5,
    right: 20,
    gap: 5,
  },
  circleButton: {
    width: 55,
    height: 55,
    borderRadius: 100,
    backgroundColor: '#D62828',
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterBox: {
    backgroundColor: '#222',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: 'absolute',
    bottom: 0,
    width: '100%',
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
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    margin: 5,
  },
  typeText: {
    color: '#fff',
    textTransform: 'capitalize',
  },
  generationBtn: {
    backgroundColor: '#444',
    padding: 12,
    marginVertical: 10,
    alignItems: 'center',
  },
})