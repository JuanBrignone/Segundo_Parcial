import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { addDestino } from '../Components/api';

const { width } = Dimensions.get('window');

export default function AgregarDestinos({ route}) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [favorites, setFavorites] = useState('');
  const navigation = useNavigation();

  const handleAddDestinos = async () => {
    const newDestino = {
      name,
      description,
      difficulty,
      favorites: parseInt(favorites)
    };
    try {
      const addedDestino = await addDestino(newDestino);
      route.params.addDestino(addedDestino);
      navigation.goBack();
    } catch (error) {
      console.error('Error añadiendo destino:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Agregar Nuevo Destino</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Descripción"
        value={description}
        onChangeText={setDescription}
      />
      <TextInput
        style={styles.input}
        placeholder="Facil / Moderada / Dificil"
        value={difficulty}
        onChangeText={setDifficulty}
        
      />
      <TextInput
        style={styles.input}
        placeholder="Favoritos"
        value={favorites}
        onChangeText={setFavorites}
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.addButton} onPress={handleAddDestinos}>
        <Text style={styles.buttonText}>Agregar Destino</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
    width: width * 1,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 45,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
  },
  addButton: {
    backgroundColor: '#4caf50',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
