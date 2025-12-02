import React from 'react'
import { Modal, Pressable, StyleSheet } from 'react-native'

const BottomModal = ({ visible, onClose, children }) => {
    return (
        <Modal
            visible={visible}
            transparent
            animationType='fade'
            onRequestClose={onClose}
        >
            <Pressable style={styles.backdrop} onPress={onClose}>
                <Pressable style={styles.filterBox} onPress={(e) => e.stopPropagation()}>
                    {children}
                </Pressable>
            </Pressable>
        </Modal>
    )
}

export default BottomModal

const styles = StyleSheet.create({
    backdrop: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    filterBox: {
        backgroundColor: '#222',
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        position: 'absolute',
        bottom: 0,
        width: '100%',
        maxHeight: '80%',
    },
})