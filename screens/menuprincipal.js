import React, { useState, useEffect } from 'react';
import { FaBars, FaArrowLeft,} from 'react-icons/fa';
import { CgGym } from "react-icons/cg";
import HeaderHome from '../components/header-home';
import { useNavigate, useLocation } from 'react-router-dom';
import { getEscuela } from '../services/AuthService.js';
import '../css/menuprincipal.css';
import '../css/general.css';
import { useManejoSesion } from '../services/sesion.js';
import { getGimnasiosCount, getCompetidoresCount, getCinturonesNegrosCount } from '../services/compServices.js';
import { MdEmojiEvents } from "react-icons/md";
export default function MenuPrincipal() {
  const [escuela, setEscuela] = useState('');
  const [gimnasiosCount, setGimnasiosCount] = useState(0);
  const [competidoresCount, setCompetidoresCount] = useState(0);
  const [cinturonesNegrosCount, setCinturonesNegrosCount] = useState(0);
  const [usuario, setUsuario] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Asegúrate de que `usuario` se inicializa correctamente
    const user = location.state?.usuario || null;
    setUsuario(user);
     // Verifica el valor aquí
    useManejoSesion(user,navigate);
  }, [location.state]);

  // Usa el hook para manejar la sesión

  useEffect(() => {
    // console.log('Usuario en MenuPrincipal:', usuario);
    const recuperarDatos = async (usuario) => {
      try {
        const escuelaResult = await getEscuela(usuario);
        setEscuela(escuelaResult);
        const gimnasiosCountResult = await getGimnasiosCount(escuelaResult);
        setGimnasiosCount(gimnasiosCountResult);
        const competidoresCountResult = await getCompetidoresCount(escuelaResult);
        setCompetidoresCount(competidoresCountResult);
        const cinturonesNegrosCountResult = await getCinturonesNegrosCount(escuelaResult);
        setCinturonesNegrosCount(cinturonesNegrosCountResult);
      } catch (error) {
        console.error('Error al recuperar los datos:', error);
      }
    };

    if (usuario) {
      recuperarDatos(usuario);
    }
  }, [usuario]);

  const onBack = () => {
    navigate('/');
  };

  const gyms = () => {
    navigate('/Mis_Gimnasios', { state: { escuela: escuela, usuario: usuario } });
  };
  const events = () => {
    navigate('/Torneos', { state: { escuela: escuela, usuario: usuario } });
  };
  return (
    <div className='container'>
      <HeaderHome  usuario={usuario} />
      <div className='sidebar'>
        <ul>
          <li><FaBars className="menu-icon-main" /></li>

          <li><button onClick={gyms}><CgGym className="menu-icon"/><p>Gimnasios</p></button></li>
          <li><button onClick={events}><MdEmojiEvents className="menu-icon"/><p>Eventos</p></button></li>
        </ul>
      </div>
      <div className='content-menuprincipal'>
        <div className='content-principal'>
          <table>
            <tr className='fila-1'>
              <td><div className='letrero'>
                <h1>Competidores</h1>
                <p>{competidoresCount}</p>
              </div></td>
              <td><div className='letrero'>
                <h1>Gimnasios</h1>
                <p>{gimnasiosCount}</p>
              </div></td>
              <td><div className='letrero'>
                <h1>Cintas negras</h1>
                <p>{cinturonesNegrosCount}</p>
              </div></td>
            </tr>
          </table>
          <table>
            <tr>
              <td className='fila-2'>
                <div className='admin'>
                  <h1>Admin</h1>
                  <p>Coming soon...</p>
                </div>
              </td>
              <td className='fila-2' colSpan={2}>
                <div className='notas-version'>
                  <h2>Notas de versión:</h2>
                  <hr className='divider' />
                  <p>No hay nada que ver aún...</p>
                </div>
              </td>
            </tr>
          </table>
          <table className='fila-3'>
            <tr>
              <td><div className='algomas'><h3>Coming soon...</h3></div></td>
              <td><div className='algomas'><h3>Coming soon...</h3></div></td>
            </tr>
          </table>
        </div>
        <div className='fondo-principal'>
          <img src="../assets/fondo-principal.jpg" alt="Fondo Principal" />
        </div>
      </div>
    </div>
  );
}
