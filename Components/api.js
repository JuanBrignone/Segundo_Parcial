import fetch from 'node-fetch';

export const fetchDestinos = async () => {
  try {
    const response = await fetch('http://172.20.10.2:3000/destinations');
    console.log('Response received:', response);
    if (!response.ok) {
      throw new Error('error');
    }
    const data = await response.json();
    console.log('Data received:', data);
    return data;
  } catch (error) {
    console.error('Error obteniendo destinos:', error);
    throw error;
  }
};



export const addDestino = async (destino) => {
    try {
      const response = await fetch('http://172.20.10.2:3000/destinations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(destino),
      });
      if (!response.ok) {
        throw new Error('error');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error añadiendo destinos:', error);
      throw error;
    }
  };


  export const updateDestino = async (id, updatedDestino) => {
    try {
      const response = await fetch(`http://172.20.10.2:3000/destinations/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedDestino),
      });
      if (!response.ok) {
        throw new Error('error');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error actualizando destino:', error);
      throw error;
    }
  };

  
  export const deleteDestino = async (id) => {
    try {
      const response = await fetch(`http://172.20.10.2:3000/destinations/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('error');
      }
    } catch (error) {
      console.error('Error eliminando destino:', error);
      throw error;
    }
  };