import React from 'react';
import { useForm } from 'react-hook-form';
import '../css/general.css';
import '../css/signup.css';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { addUser } from '../services/AuthService';

export default function Signup() {
  const navigate = useNavigate();
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
 
  const goToHome = () => {
    navigate('/');
  };
  
  const onSubmit = async (data) => {
    console.log(data.usuario)
    const res = await addUser(data);
    console.log(res);

    navigate('/Comencemos', { state: { usuario: data.usuario } });
  };
  
  const goToLogin = () => {
    document.querySelector('.contenedor').classList.add('slide-in-right');
    setTimeout(() => navigate('/Login'), 1000  );
  };

  // Watch the password field to compare with confirm password
  const password = watch("pass");

  return (
    <div className='contenedor'>
      <div className='side'>
        {/* <FaArrowLeft onClick={goToHome}/> */}
        <div className='side-content'>
          <table>
            <tr><td><h1>Bienvenido de vuelta</h1></td></tr>
            <tr><td><h3>¿Ya tienes una cuenta?</h3></td></tr>
            <tr><td><div className='separador'></div></td></tr>
            <tr><td><button className='RegistroSlide' onClick={goToLogin}>Inicia Sesion</button></td></tr>
            <tr><td><br/></td></tr>
            <tr><td> <button onClick={goToHome}><FaArrowLeft  /></button></td></tr>
          </table>
        </div>
      </div>
      <div className='fondo'>
        <img src='../assets/test3.jpg' ></img>
      </div>
      <div className='forms'>
        <div className='forms-content'>
          <form onSubmit={handleSubmit(onSubmit)}>
            <table>
              <tr><td><h1>Regístrate</h1></td></tr>
              <tr>
                <td>
                  <div className='formularios'>
                    <img src='../assets/user.png' className='icon' alt="Icono Nombre"></img>
                    <input {...register('usuario', { required: true })} placeholder='Nombre'/>
                    {errors.nombre && <span>Este campo es requerido</span>}
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div className='formularios'>
                    <img src='../assets/envelope.png' className='icon' alt="Icono Correo"></img>
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
                    {errors.correo && <span>{errors.correo.message}</span>}
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div className='formularios'>
                    <img src='../assets/lock.png' className='icon' alt="Icono Contraseña"></img>
                    <input type="password" {...register('pass', { required: true })} placeholder='Contraseña'/>
                    {errors.contraseña && <span>Este campo es requerido</span>}
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div className='formularios'>
                    <img src='../assets/lock.png' className='icon' alt="Icono Confirmar Contraseña"></img>
                    <input 
                      type="password" 
                      {...register('confirmarContraseña', { 
                        required: true,
                        validate: value => value === password || "Las contraseñas no coinciden"
                      })} 
                      placeholder='Confirmar contraseña'
                    />
                    {errors.confirmarContraseña && <span>{errors.confirmarContraseña.message}</span>}
                  </div>
                </td>
              </tr>
              <tr><td><div className='separador2'></div></td></tr>
              <tr><td><button type="submit">Registrarse</button></td></tr>  
              <tr><td><div className='separador'></div></td></tr>
            </table>
          </form>
        </div>
      </div>
    </div>
  );
}
