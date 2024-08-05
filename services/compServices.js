import axios from 'axios';
// import escuela from '../components/escuela';

const URL_API = "http://localhost:3000/api";

// Escuela
export function createEscuela(data) {
    return axios.post(`${URL_API}/Escuela`, data)
        .catch(error => {
            console.error('Error al enviar la solicitud:', error);
            throw error;
        });
}

export function readEscuela() {
    return axios.get(`${URL_API}/Escuela`)
        .catch(error => {
            console.error('Error al enviar la solicitud:', error);
            throw error;
        });
}

export function readEscuelaxNombre(nombre) {
    return axios.get(`${URL_API}/Escuela/${nombre}`)
        .catch(error => {
            console.error('Error al enviar la solicitud:', error);
            throw error;
        });
}

export function updateEscuela(data) {
    return axios.put(`${URL_API}/Escuela`, data)
        .catch(error => {
            console.error('Error al enviar la solicitud:', error);
            throw error;
        });
}

export function deleteEscuela(data) {
    return axios.delete(`${URL_API}/Escuela`, { data })
        .catch(error => {
            console.error('Error al enviar la solicitud:', error);
            throw error;
        });
}

// Gimnasio
export function createGimnasio(data) {
    return axios.post(`${URL_API}/Gimnasio`, data)
        .catch(error => {
            console.error('Error al enviar la solicitud:', error);
            throw error;
        });
}

export function readGimnasio() {
    return axios.get(`${URL_API}/Gimnasio`)
        .catch(error => {
            console.error('Error al enviar la solicitud:', error);
            throw error;
        });
}

export function readGimnasioxNombre(nombre) {
    return axios.get(`${URL_API}/Gimnasio/${nombre}`)
        .catch(error => {
            console.error('Error al enviar la solicitud:', error);
            throw error;
        });
}

export function updateGimnasio(data) {
    return axios.put(`${URL_API}/Gimnasio`, data)
        .catch(error => {
            console.error('Error al enviar la solicitud:', error);
            throw error;
        });
}

export function deleteGimnasio(data) {
    console.log(data)

    return axios.delete(`${URL_API}/Gimnasio`, { data })
        .catch(error => {
            console.error('Error al enviar la solicitud:', error);
            throw error;
        });
}



// Competidor
export function createCompetidor(data) {
    return axios.post(`${URL_API}/Competidor`, data)
        .catch(error => {
            console.error('Error al enviar la solicitud:', error);
            throw error;
        });
}

export function readCompetidor() {
    return axios.get(`${URL_API}/Competidor`)
        .catch(error => {
            console.error('Error al enviar la solicitud:', error);
            throw error;
        });
}

export function updateCompetidor(data) {
    return axios.put(`${URL_API}/Competidor`, data)
        .catch(error => {
            console.error('Error al enviar la solicitud:', error);
            throw error;
        });
}

export function deleteCompetidor(data) {
    return axios.delete(`${URL_API}/Competidor`, { data })
        .catch(error => {
            console.error('Error al enviar la solicitud:', error);
            throw error;
        });
}

// Evento
export function createEvento(data) {
    return axios.post(`${URL_API}/Evento`, data)
        .catch(error => {
            console.error('Error al enviar la solicitud:', error);
            throw error;
        });
}

export function readEvento() {
    return axios.get(`${URL_API}/Evento`)
        .catch(error => {
            console.error('Error al enviar la solicitud:', error);
            throw error;
        });
}

export function ReadEventoxCodigo(codigo) {
    return axios.get(`${URL_API}/Evento/${codigo}`)
        .catch(error => {
            console.error('Error al enviar la solicitud:', error);
            throw error;
        });
}

export function updateEvento(data) {
    return axios.put(`${URL_API}/Evento`, data)
        .catch(error => {
            console.error('Error al enviar la solicitud:', error);
            throw error;
        });
}

export function deleteEvento(data) {

    return axios.delete(`${URL_API}/Evento`, { data })
        .catch(error => {
            console.error('Error al enviar la solicitud:', error);
            throw error;
        });
}

export function readGimnasioxEscuela(escuela) {
    return axios.get(`${URL_API}/Gimnasio/Escuela/${escuela}`)
        .catch(error => {
            console.error('Error al enviar la solicitud:', error);
            throw error;
        });
}
export function readCompetidoresByGimnasio(gimnasio) {
    return axios.get(`${URL_API}/Competidor/${gimnasio}`)
        .catch(error => {
            console.error('Error al enviar la solicitud:', error);
            throw error;
        });
}
export const getGimnasiosCount = async (escuela) => {
    try {
        const response = await axios.get(`${URL_API}/gimnasios/count/${escuela}`);
        return response.data.count;
    } catch (error) {
        console.error('Error al obtener la cantidad de gimnasios:', error);
        throw error;
    }
};

export const getCompetidoresCount = async (escuela) => {
    try {
        const response = await axios.get(`${URL_API}/competidores/count/${escuela}`);
        return response.data.count;
    } catch (error) {
        console.error('Error al obtener la cantidad de competidores:', error);
        throw error;
    }
};
export const getCinturonesNegrosCount = async (escuela) => {
    try {
        const response = await axios.get(`${URL_API}/competidores/cinturonesNegros/count/${escuela}`);
        return response.data.count;
    } catch (error) {
        console.error('Error al obtener la cantidad de cinturones negros:', error);
        throw error;
    }
};

export const addCompetidor = async (competidorData) => {
    try {
const response = await axios.put(`${URL_API}/addCompetidor`, competidorData);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

export function graficar(codigoTorneo) {
    return axios.get(`${URL_API}/Grafica/${codigoTorneo}`)
        .catch(error => {
            console.error('Error al enviar la solicitud:', error);
            throw error;
        });
}
export function emparejar(codigoTorneo) {
    return axios.get(`${URL_API}/Emparejar/${codigoTorneo}`)
        .catch(error => {
            console.error('Error al enviar la solicitud:', error);
            throw error;
        });
}



export const generarPDF = async (codigoTorneo) => {
    try {
        // Realiza la solicitud GET para generar el PDF
        const response = await axios.get(`${URL_API}/generarPDF/${codigoTorneo}`, {
            responseType: 'blob', // Importante para manejar el archivo PDF
        });

        // Crea un enlace temporal para descargar el archivo
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${codigoTorneo}_registro.pdf`); // Nombre del archivo para la descarga
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } catch (error) {
        console.error('Error al generar o descargar el PDF:', error);
    }
};

export const obtenerEventosPorUsuario = async (usuario) => {
    try {
        const response = await axios.get(`${URL_API}/eventos/usuario/${usuario}`);
        console.log(response.data)
        return response;
    } catch (error) {
        console.error('Error al obtener los eventos del usuario', error);
        throw error;
    }
};

export const obtenerNombresCompetidoresPorTorneo = async (torneo) => {
    try {
        const response = await axios.get(`${URL_API}/competidores/torneo/${torneo}`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener los nombres de competidores por torneo', error);
        throw error;
    }
};