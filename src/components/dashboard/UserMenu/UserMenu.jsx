import React from 'react';
import './UserMenu.css';

const UserMenu = () => {
  return (
    <div className="user-menu">
      <span className="username">John Doe</span>
      <div className="dropdown">
        <button className="dropbtn">▼</button>
        <div className="dropdown-content">
          <a href="#">Profil</a>
          <a href="#">Paramètres</a>
          <a href="#">Déconnexion</a>
        </div>
      </div>
    </div>
  );
};

export default UserMenu;