import axios from 'axios';

const URL_API = 'http://localhost:3000/auth'; // Cambia esto por la URL real de tu API

// Función para añadir un usuario
export function addUser(data) {
    return axios.post(`${URL_API}/usuarios`, data)
        .catch(error => {
            console.error('Error al enviar la solicitud:', error);
            throw error;
        });
}

// Función para iniciar sesión
export function login(data) {
    return axios.post(`${URL_API}/usuarios/login`, data)
        .catch(error => {
            console.error('Error al enviar la solicitud:', error);
            throw error;
        });
}

// Función para cerrar sesión
export function logout(data) {
    return axios.post(`${URL_API}/usuarios/logout`, data)
        .catch(error => {
            console.error('Error al enviar la solicitud:', error);
            throw error;
        });
}

export const addEscuelaToUser = (data) => {
    return axios.post(`${URL_API}/add-escuela`, data)
      .then(response => response.data)
      .catch(error => {
        throw error;
      });
  };

  export const getEscuela = async (usuario) => {
    try {
      const response = await axios.post(`${URL_API}/getEscuelaByUser`, { usuario });
      return response.data.escuela;
    } catch (error) {
      console.error('Error al obtener la escuela:', error);
      throw error;
    }
  };


