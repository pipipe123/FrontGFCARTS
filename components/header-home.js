import React, { useState } from 'react';
import { FaBars, FaUserCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { logout } from '../services/AuthService';
import '../css/header-home.css';

const HeaderHome = ({ usuario }) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();

  const toggleUserMenu = () => {
    setShowUserMenu(!showUserMenu);
  };

  const handleLogout = () => {
    if (window.confirm('¿Estás seguro de que quieres cerrar sesión?')) {
      logout();
      navigate('/login');
    }
  };

  return (
    <header className="header">
      <div className="header-left">
        <div className="logo"><img className='logoGfcarts' src="../assets/gfcarts.jpg"></img></div>
      </div>
      <div className="header-right">
        <FaUserCircle className="profile-icon" onClick={toggleUserMenu} />
        {showUserMenu && (
          <div className="user-menu">
            <p>{usuario}</p>
            <button onClick={handleLogout}>Cerrar Sesión</button>
          </div>
        )}
      </div>
    </header>
  );
};

export default HeaderHome;
