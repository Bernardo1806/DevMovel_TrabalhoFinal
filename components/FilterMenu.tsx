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
                                <Image
                                    source={{ uri: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/e8ddc4da-23dd-4502-b65b-378c9cfe5efa/di9v0p9-cf84e681-cf05-4bb1-9b45-41ac0684f7fb.png/v1/fill/w_894,h_894/stellar_type_symbol_galar_by_jormxdos_di9v0p9-pre.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTI4MCIsInBhdGgiOiIvZi9lOGRkYzRkYS0yM2RkLTQ1MDItYjY1Yi0zNzhjOWNmZTVlZmEvZGk5djBwOS1jZjg0ZTY4MS1jZjA1LTRiYjEtOWI0NS00MWFjMDY4NGY3ZmIucG5nIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.7Tuml5Jcvi4TWDuWFnfAdQT7QaXyuVuIsdJmCmPOQsU' }}
                                    style={{ width: 40, height: 40, resizeMode: 'contain', borderRadius: 100}}
                                />
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
                                <Image
                                    source={{ uri: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/e8ddc4da-23dd-4502-b65b-378c9cfe5efa/dgbypda-e0b92d17-432f-4e7e-8b1a-2cd8cb961cd8.png/v1/fit/w_787,h_787/unova_pokedex_gen_v_close_red_edit_by_jormxdos_dgbypda-414w-2x.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9Nzg3IiwicGF0aCI6Ii9mL2U4ZGRjNGRhLTIzZGQtNDUwMi1iNjViLTM3OGM5Y2ZlNWVmYS9kZ2J5cGRhLWUwYjkyZDE3LTQzMmYtNGU3ZS04YjFhLTJjZDhjYjk2MWNkOC5wbmciLCJ3aWR0aCI6Ijw9Nzg3In1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.IQiD89vcA20EntL-tsKrrLlLviIs-mpwsHEZFYjT9xI' }}
                                    style={{ width: 40, height: 40, resizeMode: 'contain', borderRadius: 100}}
                                />
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