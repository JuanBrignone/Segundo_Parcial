import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Button, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

export default function DestinationCard({ destino, onDelete, updateDestinoInList }) {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('DestinoDetalles', { destino, updateDestinoInList })}>
        <Text style={styles.name}>{destino.name}</Text>
        <Text style={styles.description}>{destino.description}</Text>
        <Text style={[styles.tag, styles[destino.difficulty.toLowerCase()]]}>{destino.difficulty}</Text>
        <Text style={styles.favorites}>Favoritos: {destino.favorites}</Text>
      </TouchableOpacity>
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={[styles.button, styles.deleteButton]} 
          onPress={() => onDelete(destino.id)}
        >
          <Text style={styles.buttonText}>Eliminar</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.button, styles.favButton]} 
        >
          <Text style={styles.buttonText}>Añadir a Favoritos</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 15,
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 15,
    backgroundColor: '#f0f8ff',
    width: width * 0.88,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 15,
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  tag: {
    padding: 5,
    borderRadius: 10,
    color: '#fff',
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 10,
    fontWeight: 'bold'
  },
  fácil: {
    color: 'green',
  },
  moderada: {
    color: 'yellow',
  },
  difícil: {
    color: 'violet',
  },
  favorites: {
    fontSize: 15,
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteButton: {
    backgroundColor: '#ff6b6b', 
    marginRight: 10,
  },
  favButton: {
    backgroundColor: 'green', 
    marginRight: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  space: {
    width: 10, 
  },
});
