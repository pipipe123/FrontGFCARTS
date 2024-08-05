import React, { useLayoutEffect, useRef } from 'react';
import '../css/general.css';
import '../css/mainapp.css';
import '../css/header.css'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Header from '../components/header';

export default function MainApp() {

  const inicioHeadRef = useRef(null);

  useLayoutEffect(() => {
    // Añadir la clase 'animate' después de que la página haya cargado
    const timeoutId = setTimeout(() => {
      if (inicioHeadRef.current) {
        inicioHeadRef.current.classList.add('animate');
     
      }
    }, 100);

    // Limpiar el timeout si el componente se desmonta
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className='content'>
      <Header/>
      <main>
        <div className='animated-background'>
          <div className='inicio'>
            <div className='inicio-head' ref={inicioHeadRef}>
              <table>
                <tr>
                  <td className='presentacion'>
                    <h2>Bienvenido</h2>
                    <p>¡Organiza y visualiza tus torneos de taekwondo con facilidad! Gestiona cada competencia de manera eficiente y precisa.</p>
                  </td>
                </tr>
                <tr>
                  <td><button>Inicio rapido</button></td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
