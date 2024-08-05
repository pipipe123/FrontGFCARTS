import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { createCompetidor } from '../services/compServices';
import Swal from 'sweetalert2';
import '../css/escuela.css' //hay que corregir esto 
import '../css/general.css'

// Esquema de validación de yup
const schema = yup.object().shape({
  nombre: yup.string().required('El nombre es obligatorio'),
  cinta: yup.string().required('La cinta es obligatoria'),
  anioNacimiento: yup
    .number()
    .typeError('Debe ser un número')
    .required('El año de nacimiento es obligatorio')
    .min(1900, 'Año no válido')
    .max(new Date().getFullYear(), 'Año no válido'),
  peso: yup
    .number()
    .typeError('Debe ser un número')
    .required('El peso es obligatorio')
    .positive('Debe ser un número positivo'),
  sexo: yup.string().required('El sexo es obligatorio'),
  modalidad: yup.string().required('La modalidad es obligatoria'),
  estatura: yup
    .number()
    .typeError('Debe ser un número')
    .positive('Debe ser un número positivo'),
});

const Competidor = ({ gimnasio, escuela, outoflogin, onCompetidorSubmit }) => {
  console.log(outoflogin)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      console.log("Datos antes de enviar:", data);
      const datacongimnasio = { ...data, gimnasio, escuela };
      console.log("Datos con gimnasio y escuela:", datacongimnasio);

      // Envía los datos al servidor
      const res = await createCompetidor(datacongimnasio);
      console.log("Respuesta del servidor:", res);

      if(!outoflogin)  {

        Swal.fire({
          title: '¡Éxito!',
          text: 'Los datos se han enviado correctamente. Ahora puedes iniciar sesión.',
          icon: 'success',
          confirmButtonText: 'Ir al Login'
        }).then((result) => {
          if (result.isConfirmed) {
            // Redirige al login, reemplaza '/login' con la ruta de tu login
            window.location.href = '/login';
          }
        });
      } 
    } catch (error) {
      console.error("Error al enviar datos:", error);
      Swal.fire({
        title: 'Error',
        text: 'Hubo un problema al enviar los datos. Por favor, verifica los campos.',
        icon: 'error',
        confirmButtonText: 'Revisar'
      });
    }
    onCompetidorSubmit(gimnasio)
  };

  return (
    <div className='forms-escuela'>
      <div className='mensaje'><h1>Último paso</h1></div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='forms-content-escuela'>
          <h1>Registra un Competidor</h1>
          <table>
            <tbody>
              <tr>
                <td>
                  <div className='formularios-escuela'>
                    <input {...register('nombre')} placeholder='Nombre del competidor'/>
                    {errors.nombre && <p>{errors.nombre.message}</p>}
                  </div>
                </td>
              </tr> 
              <tr>
                <td>
                  <div className='formularios-escuela'>
                    <select {...register('cinta')}>
                      <option value="">¿Qué cinturón es?</option>
                      <option value="Cinturón Blanco">Cinturón Blanco</option>
                      <option value="Cinturón Blanco - Avanzado">Cinturón Blanco- Avanzado</option>
                      <option value="Cinturón Amarillo">Cinturón Amarillo</option>
                      <option value="Cinturón Amarillo - Avanzado">Cinturón Amarillo- Avanzado</option>
                      <option value="Cinturón Verde">Cinturón Verde</option>
                      <option value="Cinturón Verde - Avanzado">Cinturón Verde- Avanzado</option>
                      <option value="Cinturón Azul">Cinturón Azul</option>
                      <option value="Cinturón Azul - Avanzado">Cinturón Azul- Avanzado</option>
                      <option value="Cinturón Rojo">Cinturón Rojo</option>
                      <option value="Cinturón Rojo - Avanzado">Cinturón Rojo- Avanzado</option>
                      <option value="Cinturón Negro">Cinturón Negro</option>
                    </select>
                    {errors.cinta && <p>{errors.cinta.message}</p>}
                  </div>
                </td>
              </tr> 
              <tr>
                <td>
                  <div className='formularios-escuela'>
                    <select {...register('sexo')}>
                      <option value="">¿Cuál es su sexo?</option>
                      <option value="Femenil">Mujer</option>
                      <option value="Varonil">Hombre</option>
                    </select>
                    {errors.sexo && <p>{errors.sexo.message}</p>}
                  </div>
                </td>
              </tr> 
              <tr>
                <td>
                  <div className='formularios-escuela'>
                    <input {...register('anioNacimiento')} placeholder='¿En qué año nació?'/>
                    {errors.anioNacimiento && <p>{errors.anioNacimiento.message}</p>}
                  </div>
                </td>
              </tr> 
              <tr>
                <td>
                  <div className='formularios-escuela'>
                    <input {...register('modalidad')} placeholder='¿En qué participará?'/>
                    {errors.modalidad && <p>{errors.modalidad.message}</p>}
                  </div>
                </td>
              </tr> 
              <tr>
                <td>
                  <div className='formularios-escuela'>
                    <input {...register('peso')} placeholder='¿Cuánto pesa? (kg)'/>
                    {errors.peso && <p>{errors.peso.message}</p>}
                  </div>
                </td>
              </tr> 
              <tr>
                <td>
                  <div className='formularios-escuela'>
                    <input {...register('estatura')} placeholder='¿Cuánto mide? (cm)'/>
                    {errors.estatura && <p>{errors.estatura.message}</p>}
                  </div>
                </td>
              </tr> 
            </tbody>
          </table>
          <div className='enviar'>
            <button type="submit">Siguiente</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Competidor;
