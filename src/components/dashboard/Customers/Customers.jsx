import React, { useState } from 'react';
import './Customers.css';

const Customers = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const developers = [
    { id: 1, name: 'John Doe', AdminStatus: 'admin', ActiveStatus: 'actif', createdFiles: 15 },
    { id: 2, name: 'Jane Smith', AdminStatus: 'user', ActiveStatus: 'inactif', createdFiles: 30 },
    { id: 3, name: 'Alice Johnson', AdminStatus: 'user', ActiveStatus: 'actif', createdFiles: 10 },
  ];

  // Filtrer les développeurs en fonction de la recherche
  const filteredDevelopers = developers.filter(dev =>
    dev.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="developers-list">
      {/* Barre de recherche */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Rechercher un développeur..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Tableau des développeurs */}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Admin status</th>
            <th>Active status</th>
            <th>Total files created</th>
          </tr>
        </thead>
        <tbody>
          {filteredDevelopers.length > 0 ? (
            filteredDevelopers.map(dev => (
              <tr key={dev.id}>
                <td>{dev.name}</td>
                <td>{dev.AdminStatus}</td>
                <td>{dev.ActiveStatus}</td>
                <td>{dev.createdFiles}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={{ textAlign: 'center' }}>Aucun développeur trouvé.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Customers;