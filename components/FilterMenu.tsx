import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const FilterMenu = ({
    visible,
    onToggle,
    onSearch,
    onType,
    onGen,
    selectedType,
    selectedGen,
    typeIcons
}) => {

    return (
        <>
            {visible && (
                <Pressable style={styles.backdrop} onPress={onToggle}>
                    <View style={styles.circleContainer}>
                        {/* Busca */}
                        <TouchableOpacity style={styles.circleButton} onPress={onSearch}>
                            <Ionicons name='search' size={28} color='#fff' />
                        </TouchableOpacity>

                        {/* Tipagem */}
                        <TouchableOpacity style={styles.circleButton} onPress={onType}>
                            {selectedType ? (
                                <Image
                                    source={{ uri: typeIcons[selectedType] }}
                                    style={{ width: 35, height: 35, resizeMode: 'contain', borderRadius: 100 }}
                                />
                            ) : (
                                <Ionicons name='pricetag' size={28} color={'#fff'} />
                            )}
                        </TouchableOpacity>

                        {/* Geração */}
                        <TouchableOpacity style={styles.circleButton} onPress={onGen}>
                            {selectedGen ? (
                                <Text
                                    style={{
                                        color: '#fff',
                                        fontSize: 24,
                                        fontFamily: 'PixelifySansSemiBold',
                                    }}
                                >
                                    {selectedGen}°
                                </Text>
                            ) : (
                                <Ionicons name='layers' size={28} color='#fff' />
                            )}
                        </TouchableOpacity>

                    </View>
                </Pressable>
            )}
            {/* Botão Principal FAB */}
            <TouchableOpacity style={styles.fab} onPress={onToggle}>
                <Ionicons name={visible ? 'close' : 'filter'} size={22} color='#fff' />
            </TouchableOpacity>
        </>
    )
}

export default FilterMenu

const styles = StyleSheet.create({
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
    circleContainer: {
        position: 'absolute',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        bottom: 75,
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
    backdrop: {
        flex: 1,
        justifyContent: 'flex-end',
    },
})