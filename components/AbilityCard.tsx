import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const AbilityCard = ({ ability, onPress }) => {

    const formatName = (name) => {
        if (!name) return ''
        return name.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
    }

    return (
        <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
            <View style={styles.card}>
                <View style={styles.left}>
                    <Text style={styles.name}>{formatName(ability.name)}</Text>
                    <Text style={styles.info}>{formatName(ability.gen)}</Text>
                </View>
                <View style={styles.right}>
                    <Text style={[styles.info, { borderRadius: 100 }]}>#{ability.id.toString().padStart(3, '0')}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default AbilityCard

const styles = StyleSheet.create({
    card: {
        padding: 12,
        margin: 8,
        borderRadius: 20,
        backgroundColor: '#4d52a0ff',
        flex: 1,
        elevation: 3,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 0,
    },
    left: {
        flex: 1,
        flexDirection: 'column',
        left: 0,
    },
    right: {
        flex: 1,
        alignItems: 'flex-end',
    },
    name: {
        fontSize: 20,
        fontFamily: 'PixelifySansBold',
        color: '#fff',
        borderBottomWidth: 1,
        borderColor: '#fff',
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
})