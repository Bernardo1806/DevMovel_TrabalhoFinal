import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const PokemonCardSkeleton = () => {

    const mainType = '#B7B7CE'
    const secondType = '#828283ff'

    return (
        <LinearGradient
            colors={[mainType, secondType]}
            locations={[0, 1]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.card}
        >
            <View style={styles.imageWrapper}>
                <View style={styles.image} />
            </View>

            <View style={styles.textwrapper}>
                <Text style={styles.number}>#0000</Text>
                <Text style={styles.name}>Nome</Text>
            </View>

            <View style={styles.typesContainer}>
                <View style={styles.typeBadge} />
                <View style={styles.typeBadge} />
            </View>
        </LinearGradient>
    )
}

export default PokemonCardSkeleton

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
        backgroundColor: '#ccc',
    },
    typeText: {
        fontSize: 12,
        fontWeight: '600',
    },
})