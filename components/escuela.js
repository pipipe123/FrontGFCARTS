import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { createEscuela } from '../services/compServices';
import { addEscuelaToUser } from '../services/AuthService';
import '../css/general.css'
import '../css/escuela.css'
// Esquema de validación de yup
const schema = yup.object().shape({
  nombre: yup.string().required('El nombre de la escuela es obligatorio'),
});

const Escuela = ({ usuario, onEscuelaSubmit }) => {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const res = await createEscuela(data);
      console.log(res);
      let data2 = { escuela: data.nombre, usuario: usuario };
      await addEscuelaToUser(data2);
      console.log(data2);

      // Llamar a la función onEscuelaSubmit para pasar la escuela al componente Gimnasio
      onEscuelaSubmit(data2.escuela);
    } catch (error) {
      console.error('Error al crear la escuela o asociar al usuario', error);
    }
  };

  return (
    <div className='forms-escuela'>
      <div className='mensaje'><h1>Primer paso</h1></div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='forms-content-escuela'>
          <h1>Registra tu escuela</h1>
          <table>
            <tr>
              <td>
                <div className='formularios-escuela'>
                  <input {...register('nombre', { required: true })} placeholder='Nombra a tu escuela'/>
                  {errors.nombre && <p>{errors.nombre.message}</p>}
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

export default Escuela;
