import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import EditDestino from './EditDestino';

const { width } = Dimensions.get('window');

export default function DestinoDetalles({ route }) {
  const { destino, onUpdate } = route.params; 
  const [isEditing, setIsEditing] = useState(false);

  const updateDestinoInList = (updatedDestino) => {
    if (onUpdate) {
      onUpdate(updatedDestino); 
    }
    setIsEditing(false); 
  };

  return (
    <View style={styles.container}>
      {isEditing ? (
        <EditDestino
          destino={destino}
          updateDestinoInList={updateDestinoInList}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <>
          <Text style={styles.name}>{destino.name}</Text>
          <Text style={styles.description}>{destino.description}</Text>
          <Text style={[styles.tag, styles[destino.difficulty.toLowerCase()]]}>{destino.difficulty}</Text>
          <Text style={styles.favorites}>Favoritos: {destino.favorites}</Text>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => setIsEditing(true)}
          >
            <Text style={styles.buttonText}>Editar</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f9f9f9',
    width: width * 1,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
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
    color: 'red',
  },
  difficulty: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  favorites: {
    fontSize: 16,
    textAlign: 'center',
    color: '#555',
  },
  editButton: {
    backgroundColor: '#2196f3',
    paddingVertical: 12,
    paddingHorizontal: 25,
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
