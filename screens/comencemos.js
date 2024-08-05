import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { BsChevronCompactRight, BsChevronCompactLeft } from "react-icons/bs";
import '../css/general.css';
import '../css/comencemos.css';
import Competidor from '../components/competidor';
import Escuela from '../components/escuela';
import Gimnasio from '../components/gimnasio';

const Comencemos = () => {
    const location = useLocation();
    const { usuario } = location.state || { usuario: '' };
    const components = ['Escuela', 'Gimnasio', 'Competidor'];
    const [selectedComponent, setSelectedComponent] = useState(components[0]);
    const [escuela, setEscuela] = useState(''); // Estado para almacenar la escuela
    const [gimnasio, setGimnasio] = useState(''); // Estado para almacenar la escuela

    const handleEscuelaSubmit = (escuela) => {
        setEscuela(escuela);
        setSelectedComponent('Gimnasio'); // Avanzar al siguiente componente
    };

    const handleGimnasioSubmit = (gimnasio) => {
        setGimnasio(gimnasio);
        setSelectedComponent('Competidor'); // Avanzar al siguiente componente
    };
    const renderComponent = () => {
        switch (selectedComponent) {
            case 'Competidor':
                return <Competidor gimnasio={gimnasio} escuela={escuela}/>;
            case 'Escuela':
                return <Escuela usuario={usuario} onEscuelaSubmit={handleEscuelaSubmit} />;
            case 'Gimnasio':
                return <Gimnasio escuela={escuela} onGimnasioSubmit={handleGimnasioSubmit} />;
            default:
                return <Competidor />;
        }
    };

    const handlePrevious = () => {
        const currentIndex = components.indexOf(selectedComponent);
        const previousIndex = (currentIndex - 1 + components.length) % components.length;
        setSelectedComponent(components[previousIndex]);
    };

    const handleNext = () => {
        const currentIndex = components.indexOf(selectedComponent);
        const nextIndex = (currentIndex + 1) % components.length;
        setSelectedComponent(components[nextIndex]);
    };

    const isFirstComponent = components.indexOf(selectedComponent) === 0;
    const isLastComponent = components.indexOf(selectedComponent) === components.length - 1;

    return (
        <div className='content'>
            <div className='content-comencemos'>
                <div className='fondo-comencemos'>
                    <img src='../assets/fondo-comencemos.jpg' alt='Fondo' />
                </div>
                <div className='menu-flotante'>
                    <ul>
                        <li onClick={() => setSelectedComponent('Escuela')}>Escuela</li>
                        <li onClick={() => setSelectedComponent('Gimnasio')}>Gimnasio</li>
                        <li onClick={() => setSelectedComponent('Competidor')}>Competidor</li>
                    </ul>
                </div>
                <div className='forms-comencemos'>
                    {!isFirstComponent && (
                        <BsChevronCompactLeft
                            className='icon-left'
                            onClick={handlePrevious}
                        />
                    )}
                    {renderComponent()}
                    {!isLastComponent && (
                        <BsChevronCompactRight
                            className='icon-right'
                            onClick={handleNext}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Comencemos;
