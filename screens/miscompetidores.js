import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { readCompetidoresByGimnasio, addCompetidor, deleteCompetidor } from '../services/compServices'; // Asegúrate de importar la función adecuada
import { FaPlus, FaTrash } from 'react-icons/fa';
import '../css/miscompetidores.css'; // Actualiza el import del CSS
import HeaderHome from '../components/header-home';
import Competidor from '../components/competidor';
import { FaBars } from 'react-icons/fa';
import { useManejoSesion } from '../services/sesion.js';
import { CgGym } from "react-icons/cg";
import { IoMdHome } from "react-icons/io";
import { MdEmojiEvents } from "react-icons/md";
import Swal from 'sweetalert2';

const MisCompetidores = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [usuario, setUsuario] = useState('');

  const { gimnasio } = location.state || { gimnasio: '' };
  const { escuela } = location.state || { escuela: '' };

  const [competidores, setCompetidores] = useState([]);
  const [error, setError] = useState(null);
  const [showAddCompetidorForm, setShowAddCompetidorForm] = useState(false);
  const [showAddToTorneoForm, setShowAddToTorneoForm] = useState(false);
  const [selectedCompetidor, setSelectedCompetidor] = useState(null);
  const [torneoCodigo, setTorneoCodigo] = useState('');

  useEffect(() => {
    const user = location.state?.usuario || null;
    setUsuario(user);
    useManejoSesion(user, navigate);

    if (gimnasio) {
      readCompetidoresByGimnasio(gimnasio)
        .then(response => {
          setCompetidores(response.data);
        })
        .catch(error => {
          console.error(error.message);
          setError('Error al cargar competidores');
        });
    }
  }, [gimnasio]);

  const menu = () => {
    navigate('/home', { state: { usuario: usuario } });
  };

  const gyms = () => {
    navigate('/Mis_Gimnasios', { state: { escuela: escuela, usuario: usuario } });
  };

  const events = () => {
    navigate('/Torneos', { state: { escuela: escuela, usuario: usuario } });
  };

  const handleAgregarCompetidor = (competidor) => {
    setSelectedCompetidor(competidor);
    setShowAddToTorneoForm(true);
    setShowAddCompetidorForm(false); // Ocultar formulario de agregar competidor
  };

  const handleAddCompetidorClick = () => {
    setShowAddCompetidorForm(true);
  };

  const handleCompetidorSubmit = () => {
    setShowAddCompetidorForm(false);
    readCompetidoresByGimnasio(gimnasio)
      .then(response => {
        setCompetidores(response.data);
      })
      .catch(error => {
        console.error(error.message);
        setError('Error al cargar competidores');
      });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (selectedCompetidor && torneoCodigo) {
      try {
        let data = { nombre: selectedCompetidor.nombre, torneo: torneoCodigo };
        const res = await addCompetidor(data);
        console.log(res);
        setShowAddToTorneoForm(false);
        setTorneoCodigo('');
        setSelectedCompetidor(null);
        window.location.reload();
      } catch (error) {
        console.error('Error al agregar competidor al torneo:', error);
        alert('Hubo un error al agregar el competidor.');
      }
    } else {
      alert('Por favor, complete todos los campos.');
    }
  };

  const handleDeleteCompetidor = async (nombre) => {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: "Esta acción eliminará al competidor.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    });

    if (result.isConfirmed) {
      try {
        data = {nombre:nombre}
        await deleteCompetidor(data);
        // Refresh competidores list after deletion
        readCompetidoresByGimnasio(gimnasio)
          .then(response => {
            setCompetidores(response.data);
        window.location.reload();

          })
          .catch(error => {
            console.error(error.message);
            setCompetidores([])
            // setError('Error al cargar competidores');
          });
      } catch (error) {
        console.error('Error al eliminar competidor:', error);
        Swal.fire('Error', 'Hubo un error al eliminar el competidor.', 'error');
      }
    }
  };

 

  return (
    <div className='container-miscompetidores'>
      <HeaderHome usuario={usuario} />
      <div className='sidebar-miscompetidores'>
        <ul>
          <li><FaBars className="menu-icon-mainmiscompetidores" /></li>
          <li><button onClick={menu}><IoMdHome className="menu-icon" /><p>Menu</p></button></li>
          <li><button onClick={gyms}><CgGym className="menu-icon" /><p>Gimnasios</p></button></li>
          <li><button onClick={events}><MdEmojiEvents className="menu-icon" /><p>Eventos</p></button></li>
          <li></li>
          <li><button onClick={handleAddCompetidorClick}><FaPlus /><p>Añadir Competidor</p></button></li>
        </ul>
      </div>
      <div className='content-miscompetidores'>
        <h2>Competidores del gimnasio {gimnasio}</h2>
        <div className='scrollable-content-miscompetidores'>
          {competidores.length === 0 ? (
            <p>No se encontraron competidores para este gimnasio.</p>
          ) : (
            <ul>
              {competidores.map((competidor, index) => (
                <li key={index} className='competidor-item'>
                  <h3>{competidor.nombre}</h3>
                  <p>Edad: {competidor.edad}</p>
                  <p>Peso: {competidor.peso}</p>
                  <p>Cinta: {competidor.cinta}</p>
                  <p>Categoria: {competidor.categoria}</p>
                  <p>Estatura: {competidor.estatura}</p>
                  <p>IMC: {competidor.imc}</p>
                  <p>Torneo: {competidor.torneo}</p>
                  <button 
                    className='btn-agregar-torneo' 
                    onClick={() => handleAgregarCompetidor(competidor)}
                  >
                    <FaPlus />
                  </button>
                  <button 
                    className='btn-delete-competidor' 
                    onClick={() => handleDeleteCompetidor(competidor.nombre)}
                  >
                    <FaTrash />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        {showAddCompetidorForm && <Competidor gimnasio={gimnasio} escuela={escuela} outoflogin={true} onCompetidorSubmit={handleCompetidorSubmit} />}
        {showAddToTorneoForm && (
          <div className='form-agregar-torneo'>
            <h3>Agregar Competidor a un Torneo</h3>
            <form onSubmit={handleSubmit}>
              <label htmlFor='torneoCodigo'>Ingrese el código del torneo:</label>
              <input
                id='torneoCodigo'
                type='text'
                value={torneoCodigo}
                onChange={(e) => setTorneoCodigo(e.target.value)}
                required
                placeholder='Código del Torneo'
              />
              <button type='submit'>Enviar</button>
              <button type='button' onClick={() => setShowAddToTorneoForm(false)}>Cancelar</button>
            </form>
          </div>
        )}
        <div className='fondo-principal-miscompetidores'>
          <img src="../assets/fondo-principal.jpg" alt="Fondo Principal" />
        </div>
      </div>
    </div>
  );
};

export default MisCompetidores;
