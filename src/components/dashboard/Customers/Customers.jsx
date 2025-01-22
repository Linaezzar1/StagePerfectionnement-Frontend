import React, { useEffect, useState } from 'react';
import './Customers.css';
import axios from 'axios';
import { fetchUsers , fetchFilesCount } from '../../../Services/UserService';

const Customers = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [developers, setDevelopers] = useState([]);
  const [filesCount, setFilesCount] = useState([]);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token'); // Récupérez le token JWT
      const response = await axios.get('http://localhost:3000/user/all', {
        headers: {
          Authorization: `Bearer ${token}`, // Ajoutez le token dans les en-têtes
        },
      });

       // Récupérer le nombre de fichiers par utilisateur
       const filesResponse = await axios.get('http://localhost:3000/file/countByUser', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setDevelopers(response.data); // Mettre à jour l'état avec les données des utilisateurs
      setFilesCount(filesResponse.data);

    } catch (error) {
      console.error('Error fetching users:', error.response?.data || error.message);
    }
  };

  useEffect(() => {
    fetchUsers();
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
                <td>{dev.ActiveStatus || 'actif'}</td>
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