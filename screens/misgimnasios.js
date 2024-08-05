import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { readGimnasioxEscuela, deleteGimnasio } from '../services/compServices.js';
import { FaBars, FaPlus, FaTrash } from 'react-icons/fa';
import { IoMdHome } from "react-icons/io";
import Gimnasio from '../components/gimnasio';
import { useManejoSesion } from '../services/sesion.js';
import '../css/misgimnasios.css'; // Cambié el nombre del archivo CSS para que coincida con el nuevo nombre de clase
import HeaderHome from '../components/header-home';
import { MdEmojiEvents } from "react-icons/md";

const MisGimnasios = () => {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState('');
  const location = useLocation();
  const { escuela } = location.state || { escuela: '' };

  const [gimnasios, setGimnasios] = useState([]);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const user = location.state?.usuario || null;
    setUsuario(user);
    useManejoSesion(user, navigate);
    if (escuela) {
      readGimnasioxEscuela(escuela)
        .then(response => {
          setGimnasios(response.data);
        })
        .catch(error => {
          setError(error.message);
        });
    }
  }, [escuela]);

  const handleGymClick = (gimnasio) => {
    navigate('/Mis_Competidores', { state: { gimnasio: gimnasio.nombre, escuela: escuela, usuario: usuario } });
  };

  const handleAddGimnasioClick = () => {
    setShowForm(true);
  };

  const handleGimnasioSubmit = (nombre) => {
    setShowForm(false);
    readGimnasioxEscuela(escuela)
      .then(response => {
        setGimnasios(response.data);
      })
      .catch(error => {
        setError(error.message);
      });
  };

  const handleDeleteGimnasio = (nombre) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este gimnasio?')) {
      data = {nombre:nombre}
      console.log(data)
      deleteGimnasio(data)
        .then(() => {
          // Actualiza la lista de gimnasios después de eliminar
          readGimnasioxEscuela(escuela)
            .then(response => {
              setGimnasios(response.data);
            })
            .catch(error => {
              setError(error.message);
            });
        })
        .catch(error => {
          console.error('Error al eliminar gimnasio:', error);
          setError('Error al eliminar gimnasio.');
        });
    }
  };

  const menu = () => {
    navigate('/home', { state: { usuario: usuario } });
  };

  const events = () => {
    navigate('/Torneos', { state: { escuela: escuela, usuario: usuario } });
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className='container-misgimnasios'>
      <HeaderHome usuario={usuario} />
      <div className='sidebar-misgimnasios'>
        <ul>
          <li><FaBars className="menu-icon-main" /></li>
          <li><button onClick={menu}><IoMdHome className="menu-icon"/><p>Menu</p></button></li>
          <li><button onClick={events}><MdEmojiEvents className="menu-icon"/><p>Eventos</p></button></li>
          <li></li>
          <li><button onClick={handleAddGimnasioClick}><FaPlus className="add-icon-misgimnasios" /><p>añadir gimnasio</p></button></li>
        </ul>
      </div>
      <div className='content-misgimnasios'>
        <h2>Gimnasios de la escuela {escuela}</h2>
        <div className='scrollable-content-misgimnasios'>
          {gimnasios.length === 0 ? (
            <p>No se encontraron gimnasios para esta escuela.</p>
          ) : (
            <ul>
              {gimnasios.map((gimnasio, index) => (
                <li key={index} onClick={() => handleGymClick(gimnasio)}>
                  <h3>{gimnasio.nombre}</h3>
                  <p>Escuela: {gimnasio.escuela}</p>
                  <p>Entrenador: {gimnasio.entrenador}</p>
                  <FaTrash
                    className='delete-icon'
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteGimnasio(gimnasio.nombre);
                    }}
                  />
                </li>
              ))}
            </ul>
          )}
        </div>
        {showForm && <Gimnasio escuela={escuela} onGimnasioSubmit={handleGimnasioSubmit} />}
        <div className='fondo-principal-misgimnasios'>
          <img src="../assets/fondo-principal.jpg" alt="Fondo Principal" />
        </div>
      </div>
    </div>
  );
};

export default MisGimnasios;
