import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

const sobre = () => {
  return (
    <View style={styles.container}>
      <View style={{ alignItems: 'center' }}>
        <Text style={styles.header}>Sobre</Text>
        <Text style={styles.infoTitle}>Trabalho de React Native</Text>
      </View>

      <View style={styles.table}>
        <Text style={[styles.infoTxT, { fontSize: 20, marginBottom: 10 }]}>Aplicativo de Pokémon</Text>
        <Text style={[styles.infoTxT, { fontSize: 20, marginBottom: 5 }]}>Navegação:</Text>
        <Text style={styles.infoTxT}>- Drawer</Text>
        <Text style={[styles.infoTxT, { marginBottom: 10 }]}>- Tabs</Text>
        <Text style={[styles.infoTxT, { fontSize: 20, marginBottom: 5 }]}>API:</Text>
        <Text style={[styles.infoTxT, { marginBottom: 10 }]}>- PokeAPIv2</Text>

        <Text style={[styles.infoTxT, { fontSize: 20, marginBottom: 5 }]}>Feito por:</Text>
        <Text style={styles.infoTxT}>- Bernardo Soares Machado</Text>
        
        <Image 
          source={{ uri: 'https://i.imgur.com/hM3lynW.png'}}
          style={styles.image}
        />
      </View>
    </View>
  )
}

export default sobre

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  table: {
    marginTop: 10,
    flexDirection: 'column',
    maxWidth: '100%',
    alignItems: 'center',
  },
  header: {
    marginTop: 20,
    width: '90%',
    fontSize: 26,
    fontFamily: 'PixelifySansSemiBold',
    backgroundColor: '#fff',
    textAlign: 'center',
    borderRadius: 100,
    borderWidth: 2,
    borderColor: '#aaa',
    elevation: 3,
    padding: 10,
  },
  infoTitle: {
    marginTop: 10,
    padding: 10,
    fontSize: 20,
    fontFamily: 'PixelifySansMedium',
    backgroundColor: '#4d52a0ff',
    color: '#fff',
    textAlign: 'center',
    borderRadius: 10,
    borderBottomWidth: 3,
    borderRightWidth: 3,
    borderColor: "#202020ff",
  },
  infoTxT: {
    margin: 1,
    padding: 2,
    fontSize: 16,
    fontFamily: 'PixelifySans',
    backgroundColor: '#4d52a0ff',
    color: '#fff',
    width: '75%',
    borderRadius: 4,
    borderBottomWidth: 3,
    borderRightWidth: 3,
    borderColor: "#202020ff",
  },
  image: {
    marginTop: 20,
    width: 250,
    height: 250,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#3b3b3bff',
    elevation: 3,
  },
})