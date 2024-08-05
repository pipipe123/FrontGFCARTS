import React from 'react';
import './css/general.css';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import MainApp from './components/mainapp.js'; // Corrección aquí
import Header from './components/header.js';
import Signup from './screens/signup.js';
import Login from './screens/login.js'; // Corrección aquí
import Competidor from './components/competidor.js';
import MenuPrincipal from './screens/menuprincipal.js';
import Escuela from './components/escuela.js';
import Gimnasio from './components/gimnasio.js';
import Comencemos from './screens/comencemos.js';
import MisGimnasios from './screens/misgimnasios.js';
import MisCompetidores from './screens/miscompetidores.js'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import Evento from './components/evento.js';
import Torneos from './screens/torneo.js';
export default function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<MainApp />} />
          <Route path="/Torneos" element={<Torneos />} />
          <Route path="/Evento" element={<Evento />} />
          <Route path="/Login" element={<Login />} /> {/* Corrección aquí */}
          <Route path="/Registro" element={<Signup />} />
          <Route path="/Competidor" element={<Competidor />} />
          <Route path="/Escuela" element={<Escuela />} />
          <Route path="/Gimnasio" element={<Gimnasio />} />
          <Route path="/Comencemos" element={<Comencemos />} />
          <Route path="/Mis_Gimnasios" element={<MisGimnasios />} />
          <Route path="/Mis_Competidores" element={<MisCompetidores />} />
          <Route path='/home' element={<MenuPrincipal/>}/>
      </Routes>
    </Router>
  );
}
