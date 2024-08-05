import React from 'react';
import './css/general.css';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import MainApp from './components/mainapp'; // Corrección aquí
import Header from './components/header';

export default function Inicio() {
  return (
    <div className='content'>

      <Header />
      <MainApp/>
    </div>
  );
}
