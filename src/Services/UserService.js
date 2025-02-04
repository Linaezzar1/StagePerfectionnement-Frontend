import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000'; // Remplacez par l'URL de votre backend

// Ajouter le token JWT automatiquement dans les requêtes
const getHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    Authorization: `Bearer ${token}`,
  };
};

// Service pour récupérer les utilisateurs
export const fetchUsers = async () => {
  const response = await axios.get(`${API_BASE_URL}/user/all`, {
    headers: getHeaders(),
  });
  return response.data;
};



export const fetchCurrentUser = async () => {
    const response = await axios.get(`${API_BASE_URL}/user/currentUser`, {
      headers: getHeaders(),
    });
    return response.data;
  };


// Service pour supprimer un utilisateur
export const deleteUser = async (userId) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/user/deleteUser`, {
      headers: getHeaders(),
      data: { userId }  // Envoi de l'ID de l'utilisateur dans le corps de la requête
    });
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'utilisateur :', error.message);
    throw error;
  }
};

// Service pour mettre à jour le statut d'activité
export const updateActiveStatus = async (userId, isActive) => {
    await axios.patch(
      `${API_BASE_URL}/user/activeStatus`,
      { userId, isActive },
      {
        headers: getHeaders(),
      }
    );
  };
  
  // Détecter l'activité ou l'inactivité d'un utilisateur
  export const detectActivity = (userId) => {
    let timeout;
  
    const setActive = async (isActive) => {
      try {
        await updateActiveStatus(userId, isActive);
      } catch (error) {
        console.error('Erreur lors de la mise à jour du statut actif :', error.message);
      }
    };
  
    const activityHandler = () => {
      clearTimeout(timeout);
      setActive(true);
  
      // Définir l'utilisateur comme inactif après 1 minute d'inactivité
      timeout = setTimeout(() => setActive(false), 60000);
    };
  
    // Ajouter les événements pour détecter l'activité
    window.addEventListener('mousemove', activityHandler);
    window.addEventListener('keydown', activityHandler);
  
    return () => {
      // Nettoyer les événements pour éviter les fuites de mémoire
      window.removeEventListener('mousemove', activityHandler);
      window.removeEventListener('keydown', activityHandler);
    };
  };


  