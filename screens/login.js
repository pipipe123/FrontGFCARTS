import React from 'react';
import { useForm } from 'react-hook-form';
import '../css/general.css';
import '../css/login.css';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/AuthService';
import { FaArrowLeft } from 'react-icons/fa';
import Swal from 'sweetalert2';

export default function Login() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const goToHome = () => {
    navigate('/');
  };

  const onSubmit = async (data) => {
    try {
      const response = await login(data);

      if (response.status === 200) {
        Swal.fire({
          title: 'Inicio de sesión exitoso',
          text: 'Ahora puedes acceder al sistema.',
          icon: 'success',
          confirmButtonText: 'Ir al inicio'
        }).then((result) => {
          if (result.isConfirmed) {
            navigate('/home', { state: { usuario: data.usuario } });
          }
        });
      } else {
        Swal.fire({
          title: 'Error',
          text: response.data,
          icon: 'error',
          confirmButtonText: 'Intentar de nuevo'
        });
      }
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: 'Ocurrió un error al intentar iniciar sesión. Por favor, inténtalo de nuevo.',
        icon: 'error',
        confirmButtonText: 'Intentar de nuevo'
      });
    }
  };

  const goToSignup = () => {
    document.querySelector('.contenedor-1').classList.add('slide-in');
    setTimeout(() => navigate('/Registro'), 1000);
  };

  return (
    <div className='contenedor-1'>
      <div className='side-1'>
        <div className='side-content-1'>
          <table>
            <tbody>
              <tr><td><h1>¡Bienvenido!</h1></td></tr>
              <tr><td><h3>¿Aún no tienes una cuenta?</h3></td></tr>
              <tr><td><div className='separador'></div></td></tr>
              <tr><td><button onClick={goToSignup}>Registrarse</button></td></tr>
              <tr><td><br/></td></tr>
              <tr><td> <button onClick={goToHome}><FaArrowLeft  /></button></td></tr>

            </tbody>
          </table>
        </div>
      </div>
      <div className='fondo-1'>
        <img src='../assets/fondo_signup2.jpg' alt="Fondo" />
      </div>
      <div className='forms-1'>
        <div className='forms-content'>
          <form onSubmit={handleSubmit(onSubmit)}>
            <table>
              <tbody>
                <tr><td><h1>Inicia sesión</h1></td></tr>
                <tr>
                  <td>
                    <div className='formularios'>
                      <img src='../assets/user.png' className='icon' alt="Icono Nombre" />
                      <input {...register('usuario', { required: true })} placeholder='Nombre' />
                      {/* {errors.usuario && <span>Este campo es requerido</span>} */}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className='formularios'>
                      <img src='../assets/envelope.png' className='icon' alt="Icono Correo" />
                      <input 
                        type="email"
                        {...register('correo', {
                          required: true,
                          pattern: {
                            value: /^[a-zA-Z0-9._%+-]+@gmail.com$/,
                            message: "El correo debe ser de dominio @gmail.com"
                          }
                        })}
                        placeholder='Correo'
                      />
                      {/* {errors.correo && <span>{errors.correo.message}</span>} */}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className='formularios'>
                      <img src='../assets/lock.png' className='icon' alt="Icono Contraseña" />
                      <input 
                        type="password"
                        {...register('pass', { required: true })}
                        placeholder='Contraseña'
                      />
                      {/* {errors.pass && <span>Este campo es requerido</span>}  */}
                    </div>
                  </td>
                </tr>
                <tr><td><div className='separador2'></div></td></tr>
                <tr><td><button type="submit">Iniciar sesión</button></td></tr>
                <tr><td><div className='separador'></div></td></tr>
              </tbody>
            </table>
          </form>
        </div>
      </div>
    </div>
  );
}
