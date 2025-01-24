import React, { useEffect, useState } from 'react';
import './Customers.css';
import { fetchUsers, fetchFilesCount, detectActivity, } from '../../../Services/UserService';

const Customers = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [developers, setDevelopers] = useState([]);
  const [filesCount, setFilesCount] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Récupération des utilisateurs
        const users = await fetchUsers();
        setDevelopers(users);

        // Récupération des fichiers par utilisateur
        const filesData = await fetchFilesCount();
        setFilesCount(filesData);

        // Détection d'activité pour chaque utilisateur
        users.forEach((user) => {
          detectActivity(user._id);
        });
      } catch (error) {
        console.error('Erreur lors du chargement des données :', error.message);
      }
    };

    fetchData();
  }, []);

  // Filtrer les développeurs en fonction de la recherche
  const filteredDevelopers = developers.filter(dev =>
    dev.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Trouver le nombre de fichiers pour chaque utilisateur
  const getFilesCountForUser = (userId) => {
    const userFile = filesCount.find(fileData =>  fileData._id.toString() === userId.toString());
    return userFile ? userFile.totalFiles : 0;
  };

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
                <td>{dev.role}</td>
                <td>{dev.ActiveStatus || 'Active'}</td>
                <td>{getFilesCountForUser(dev._id)}</td>
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