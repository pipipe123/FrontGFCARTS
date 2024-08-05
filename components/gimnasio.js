import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { createGimnasio } from '../services/compServices';
import '../css/gimnasio.css'
import '../css/general.css'

// Esquema de validación de yup
const schema = yup.object().shape({
  nombre: yup.string().required('El nombre del gimnasio es obligatorio'),
  entrenador: yup.string().required('El nombre del entrenador es obligatorio'),
});

const Gimnasio = ({ escuela, onGimnasioSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    const dataconescuela = {...data,escuela}
    console.log(dataconescuela);
    const res = await createGimnasio(dataconescuela);
    console.log(res);
    // Puedes usar la escuela aquí si es necesario
    onGimnasioSubmit(data.nombre, escuela)
  };

  return (
    <div className='forms-escuela'>
      <div className='mensaje'><h1>Segundo paso</h1></div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='forms-content-escuela'>
          <h1>Registra un gimnasio</h1>
          <table>
            <tr>
              <td>
                <div className='formularios-escuela'>
                  <input {...register('nombre', { required: true })} placeholder='Nombra a tu gimnasio'/>
                  {errors.nombre && <p>{errors.nombre.message}</p>}
                </div>
              </td>
            </tr> 
            <tr>
              <td>
                <div className='formularios-escuela'>
                  <input {...register('entrenador', { required: true })} placeholder='¿Quién será su entrenador?'/>
                  {errors.entrenador && <p>{errors.entrenador.message}</p>}
                </div>
              </td>
            </tr> 
          </table>
          <div className='enviar'>
            <button type="submit">siguiente</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Gimnasio;
