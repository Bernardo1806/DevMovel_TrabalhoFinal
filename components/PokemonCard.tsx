import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { TYPE_COLORS, TYPE_ICONS } from './pokemonData';

const PokemonCard = ({ pokemon, onPress }) => {

    const mainType = TYPE_COLORS[pokemon.types[0]]
    const secondType = TYPE_COLORS[pokemon?.types[1]] || mainType

    const formatName = (name) => {
        if (!name) return ''
        return name.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
    }

    return (
        <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
            <LinearGradient
                colors={[mainType, mainType, secondType, secondType]}
                locations={[0, 0.495, 0.505, 1]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.card}
            >
                <View style={styles.imageWrapper}>
                    <Image source={{ uri: pokemon.image }} style={styles.image} />
                </View>

                <View style={styles.textwrapper}>
                    <Text style={styles.number}>#{pokemon.id.toString().padStart(4, '0')}</Text>
                    <Text style={styles.name}>{formatName(pokemon.name)}</Text>
                </View>

                <View style={styles.typesContainer}>
                    {pokemon.types.map((type) => (
                        <Image key={type} source={{ uri: TYPE_ICONS[type] }} style={styles.typeBadge} />
                    ))}
                </View>
            </LinearGradient>
        </TouchableOpacity>
    )
}

export default PokemonCard

const styles = StyleSheet.create({
    card: {
        padding: 12,
        margin: 8,
        borderRadius: 100,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        elevation: 3,
        borderWidth: 0,
    },
    imageWrapper: {
        width: 100,
        height: 100,
        backgroundColor: '#fff',
        borderRadius: 100,
    },
    image: {
        width: 100,
        height: 100,
        transform: [{ scale: 0.9 }],
    },
    textwrapper: {
        flex: 1,
        flexDirection: 'column',
        left: 10,
    },
    number: {
        fontSize: 14,
        fontFamily: 'Silkscreen',
        color: '#666',
        textShadowColor: '#000',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 1,
    },
    name: {
        fontSize: 20,
        fontFamily: 'PixelifySansBold',
        textShadowColor: '#efe',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 1,
    },
    typesContainer: {
        flex: 1,
        flexDirection: 'row',
        padding: 20,
        gap: 5,
    },
    typeBadge: {
        width: 40,
        height: 40,
        borderRadius: 100,
    },
    typeText: {
        fontSize: 12,
        fontWeight: '600',
    },
})