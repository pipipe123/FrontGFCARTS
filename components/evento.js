import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { createEvento } from '../services/compServices';
import '../css/general.css';
import '../css/evento.css';

// Esquema de validación de yup
const schema = yup.object().shape({
  nombre: yup.string().required('El nombre del evento es obligatorio'),
});

const Evento = ({ usuario, onEventoSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      // Crear el evento
      let data2 = { ...data, usuario };
      const res = await createEvento(data2);
      console.log(res);
      if (onEventoSubmit) {
        onEventoSubmit(res.data);
      }
    } catch (error) {
      console.error('Error al crear el evento', error);
    }
  };

  return (
    <div className='forms-evento'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='forms-content-evento'>
          <h1>Registra tu evento</h1>
          <table>
            <tr>
              <td>
                <div className='formularios-evento'>
                  <input {...register('nombre', { required: true })} placeholder='Nombre del evento' />
                  {errors.nombre && <p>{errors.nombre.message}</p>}
                </div>
              </td>
            </tr>
          </table>
          <div className='enviar'>
            <button type="submit">Siguiente</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Evento;
