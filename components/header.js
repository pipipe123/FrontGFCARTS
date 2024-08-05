import React from 'react'
import { Link } from 'react-router-dom';
import '../css/header.css'
import '../css/general.css'

// import logo from '../assets/logo.jpg'
const Header = () =>{
    return(
        <header className='sticky-header'>
                    <div className="logo"><img className='logoGfcarts' src="../assets/gfcarts.jpg"></img></div>
            <div className='Infos'>
            <h2><Link to='/Login'>Login</Link></h2>
            <h2><Link to='/Registro'>Registro</Link></h2>
                <img src={'../assets/logo.jpg'} className='logo-img'/>
            </div>
        </header>
    );
};


export default Header;