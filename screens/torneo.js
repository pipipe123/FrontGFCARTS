import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { obtenerEventosPorUsuario, obtenerNombresCompetidoresPorTorneo, graficar, emparejar, generarPDF, deleteEvento } from '../services/compServices';
import { FaPlus, FaArrowRight, FaTrash } from 'react-icons/fa';
import { FaBars } from 'react-icons/fa';
import { CgGym } from "react-icons/cg";
import { IoMdHome } from "react-icons/io";
import '../css/torneos.css';
import '../css/general.css';
import Evento from '../components/evento';
import HeaderHome from '../components/header-home';
import { useManejoSesion } from '../services/sesion.js';

const Torneos = () => {
  const [torneos, setTorneos] = useState([]);
  const [usuario, setUsuario] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [selectedTorneo, setSelectedTorneo] = useState(null);
  const [competidores, setCompetidores] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const user = location.state?.usuario || null;
    setUsuario(user);
    useManejoSesion(user, navigate);

    const fetchEventos = async () => {
      try {
        const eventos = await obtenerEventosPorUsuario(user);
        setTorneos(eventos.data || []);
      } catch (error) {
        console.error('Error al obtener los torneos:', error);
        setTorneos([]);
      }
    };

    if (user) {
      fetchEventos();
    } else {
      setTorneos([]);
    }
  }, [location.state, navigate]);

  const toggleForm = () => {
    setShowForm(prevShowForm => !prevShowForm);
  };

  const verMas = async (codigo) => {
    try {
      const nombres = await obtenerNombresCompetidoresPorTorneo(codigo);
      console.log('Competidores:', nombres); // Verifica los competidores obtenidos
      setCompetidores(nombres || []);
      setSelectedTorneo(codigo);
    } catch (error) {
      console.error('Error al obtener los nombres de los competidores:', error);
      setCompetidores([]);
    }
  };

  const graficarTorneo = async (codigo) => {
    if (window.confirm('Una vez que empieces a graficar, no se podrá añadir más participantes al evento. ¿Estás seguro?')) {
      try {
        await graficar(codigo);
        await emparejar(codigo);
        await generarPDF(codigo);
        alert('El torneo ha sido graficado exitosamente.');
      } catch (error) {
        console.error('Error al graficar el torneo:', error);
      }
    }
  };

  const eliminarEvento = async (codigo) => {

    if (window.confirm('¿Estás seguro de que quieres eliminar este evento?')) {
      try {
        data = {codigo:codigo}
        await deleteEvento(data);
        setTorneos(torneos.filter(torneo => torneo.codigo !== codigo));
        alert('El evento ha sido eliminado.');
      } catch (error) {
        console.error('Error al eliminar el evento:', error);
      }
    }
  };

  const menu = () => {
    navigate('/home', { state: { usuario: usuario } });
  };

  const gyms = () => {
    navigate('/Mis_Gimnasios', { state: { escuela: location.state?.escuela, usuario: usuario } });
  };

  const handleEventoSubmit = (nuevoEvento) => {
    setShowForm(false);
    setTorneos((prevTorneos) => [...prevTorneos, nuevoEvento]);
    
  };

  return (
    <div className='container-torneos'>
      <HeaderHome usuario={usuario} />
      <div className='sidebar-torneos'>
        <ul>
          <li><FaBars className="menu-icon-main-torneos" /></li>
          <li><button onClick={menu}><IoMdHome className="menu-icon" /><p>Menu</p></button></li>
          <li><button onClick={gyms}><CgGym className="menu-icon" /><p>Gimnasios</p></button></li>
          <li><button onClick={toggleForm}><FaPlus /><p>Añadir Evento</p></button></li>
        </ul>
      </div>
      <div className='content-torneos'>
        <h2>Torneos creados</h2>
        {torneos.length === 0 ? (
          <p>No se encontraron torneos creados.</p>
        ) : (
          <div className='torneos-list'>
            {torneos.map((torneo) => (
              <div key={torneo.codigo} className='torneo-item'>
                <h3>{torneo.nombre}</h3>
                <p>Código: {torneo.codigo}</p> {/* Mostrar el código del torneo */}
                <p>Competidores inscritos: {torneo.cantidadCompetidores}</p>
                <button onClick={() => verMas(torneo.codigo)}><FaArrowRight /> Ver Más</button>
                <button className='btn-graficar' onClick={() => graficarTorneo(torneo.codigo)}>Graficar Torneo</button>
                <button className='btn-eliminar' onClick={() => eliminarEvento(torneo.codigo)}><FaTrash /> Eliminar</button>
                {selectedTorneo === torneo.codigo && (
                  <div className='competidores-list'>
                    <h4>Competidores</h4>
                    {competidores.length === 0 ? (
                      <p>No hay competidores registrados para este torneo.</p>
                    ) : (
                      <ul className='competidores-horizontal'>
                        {competidores.map((competidor, index) => (
                          <li key={index}>
                            <p>{competidor.nombre}</p>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
        {showForm && <Evento usuario={usuario} onEventoSubmit={handleEventoSubmit} />}
        <div className='fondo-principal-torneos'>
          <img src="../assets/fondo-principal.jpg" alt="Fondo Principal" />
        </div>
      </div>
    </div>
  );
};

export default Torneos;
