import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { updateDestino, fetchDestinos } from '../Components/api';

export default function EditDestino({ destino, updateDestinoInList, onCancel }) {
  const [name, setName] = useState(destino.name);
  const [description, setDescription] = useState(destino.description);
  const [difficulty, setDifficulty] = useState(destino.difficulty);
  const [favorites, setFavorites] = useState(destino.favorites);

  const handleUpdateDestino = async () => {
    const updatedDestino = {
        name,
        description,
        difficulty,
        favorites: parseInt(favorites)
    };

    try {
      const data = await updateDestino(destino.id, updatedDestino);
      updateDestinoInList(data);
      onCancel(); 
    } catch (error) {
      console.error('Error actualizando destino:', error);
    }
  };

  return (
    <View style={styles.container}>
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
        placeholder="Dificultad"
        value={difficulty}
        onChangeText={setDifficulty}
      />
      <TextInput
        style={styles.input}
        placeholder="Favorites"
        value={favorites}
        onChangeText={setFavorites}
        keyboardType="numeric"
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.saveButton} onPress={handleUpdateDestino}>
          <Text style={styles.buttonText}>Guardar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
          <Text style={styles.buttonText}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  input: {
    height: 45,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 12,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  saveButton: {
    backgroundColor: '#4caf50',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
  cancelButton: {
    backgroundColor: '#f44336',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
