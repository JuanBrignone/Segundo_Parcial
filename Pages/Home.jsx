import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Dimensions, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { fetchDestinos, deleteDestino} from '../Components/api';
import DestinationCard from '../Components/DestinosCard';

const { width } = Dimensions.get('window');

export default function Home() {
  const [destinos, setDestinos] = useState([]);
  const [originalDestinos, setOriginalDestinos] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const getDestinos = async () => {
      try {
        const data = await fetchDestinos();
        setDestinos(data);
        setOriginalDestinos(data);
      } catch (error) {
        console.error(error);
      }
    };

    getDestinos();
  }, []);

  const addDestino = (newDestino) => {
    setDestinos([...destinos, newDestino]);
    setOriginalDestinos([...originalDestinos, newDestino]);
  };

  const removeDestino = async (id) => {
    try {
      await deleteDestino(id);
      setDestinos(destinos.filter(destino => destino.id !== id));
      setOriginalDestinos(originalDestinos.filter(destino => destino.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const sortDestinosByFavs = () => {
    const sortedDestinos = [...destinos].sort((a, b) => b.favorites - a.favorites);
    setDestinos(sortedDestinos);
  };

  const resetDestinosOrder = () => {
    setDestinos(originalDestinos);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Destinos</Text>
      <View style={styles.buttonRow}>
        <TouchableOpacity 
          style={[styles.button, styles.createButton]} 
          onPress={() => navigation.navigate('AgregarDestinos', { addDestino })}
        >
          <Text style={styles.buttonText}>Nuevo Destino</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.button, styles.sortButton]} 
          onPress={sortDestinosByFavs}
        >
          <Text style={styles.buttonText}>Ordenar por Favoritos</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.button, styles.resetButton]} 
          onPress={resetDestinosOrder}
        >
          <Text style={styles.buttonText}>Restablecer Orden</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={destinos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <DestinationCard destino={item} onDelete={removeDestino} />}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  button: {
    flex: 1,
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  createButton: {
    backgroundColor: 'green', 
  },
  sortButton: {
    backgroundColor: '#2196f3', 
  },
  resetButton: {
    backgroundColor: '#f44336', 
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  list: {
    flexGrow: 1,
    paddingVertical: 10,
  },
});
