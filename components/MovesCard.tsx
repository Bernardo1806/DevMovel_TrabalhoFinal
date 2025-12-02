import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { MOVE_CATEGORY_ICONS, TYPE_ICONS } from './pokemonData'

const MovesCard = ({ move, onPress }) => {

    const formatName = (name) => {
        if (!name) return ''
        return name.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
    }

    return (
        <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
            <View style={styles.card}>
                <View style={styles.headerContainer}>
                    <Text style={styles.name}>{formatName(move.name)}</Text>
                    <View style={styles.iconContainer}>
                        <Image source={{ uri: TYPE_ICONS[move.type] }} style={{ width: 35, height: 35, resizeMode: 'contain', borderRadius: 100 }} />
                        <Image source={{ uri: MOVE_CATEGORY_ICONS[move.damage_class] }} style={{ width: 35, height: 35, resizeMode: 'contain', borderRadius: 100, backgroundColor: '#aaa' }} />
                    </View>
                </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.info}>{move.power} Pow.</Text>
                    <Text style={styles.info}>{move.accuracy} Acc.</Text>
                    <Text style={styles.info}>{move.pp} PP</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default MovesCard

const styles = StyleSheet.create({
    card: {
        padding: 12,
        margin: 8,
        borderRadius: 20,
        backgroundColor: '#4d52a0ff',
        flex: 1,
        elevation: 3,
        borderWidth: 0,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    name: {
        fontSize: 20,
        fontFamily: 'PixelifySansBold',
        color: '#fff',
        borderBottomWidth: 1,
        borderColor: '#fff',
    },
    iconContainer: {
        flexDirection: 'row',
        gap: 8,
    },
    infoContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 15,
        paddingTop: 5,
    },
    info: {
        fontSize: 16,
        color: '#fff',
        fontFamily: 'Silkscreen',
        textAlign: 'center',
        backgroundColor: 'rgba(0,0,0,.25)',
        paddingVertical: 2,
        paddingHorizontal: 10,
        borderRadius: 100,
    },
})