import React, { useEffect, useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { getCreatedFilesThisWeek, getModifiedFilesThisWeek, fetchFilesCreatedByDay } from '../../Services/FileService';
import './MainAnalytics.css'
import { format, subDays } from "date-fns";
import { fr } from "date-fns/locale";


const MainAnalytics = () => {
  const [createdFiles, setCreatedFiles] = useState(0);
  const [modifiedFiles, setModifiedFiles] = useState(0);
  const [fileData, setFileData] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const created = await getCreatedFilesThisWeek();
        const modified = await getModifiedFilesThisWeek();
        console.log('Created Files:', created); // Vérifiez la valeur
        console.log('Modified Files:', modified); // Vérifiez la valeur
        setCreatedFiles(created);
        setModifiedFiles(modified);
      } catch (error) {
        console.error('Erreur lors de la récupération des statistiques:', error);
        alert('Une erreur est survenue lors du chargement des statistiques.');
      }
    };

    fetchStats();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchFilesCreatedByDay();
        console.log("Données brutes :", data);

        // Générer les 7 derniers jours
        let last7Days = Array.from({ length: 7 }, (_, i) => {
          const date = subDays(new Date(), i);
          return {
            day: format(date, "EEEE", { locale: fr }), // "lundi", "mardi", ...
            date: format(date, "yyyy-MM-dd"),
            totalFiles: 0, // Initialiser à 0
          };
        }).reverse();

        // Remplir avec les données récupérées
        data.forEach(({ _id, count }) => {
          let dayObj = last7Days.find((d) => d.date === _id);
          if (dayObj) {
            dayObj.totalFiles = count;
          }
        });

        console.log("Données finales formatées :", last7Days);
        setFileData(last7Days);
      } catch (error) {
        console.error("Erreur lors du chargement des données d'analytique", error);
      }
    };
    fetchData();
  }, []);

  const statsData = [
    { title: 'Fichiers créés cette semaine', value: createdFiles },
    { title: 'Fichiers modifiés cette semaine', value: modifiedFiles },
    { title: 'Nombre de commits', value: '78' }, // Exemple statique
    { title: 'Nombre de pushs', value: '56' }, // Exemple statique
  ];

  // Données fictives pour le graphique
  const chartData = fileData.map((day) => ({
    name: day.day.charAt(0).toUpperCase() + day.day.slice(1), // "Lundi", "Mardi", ...
    fichiers: day.totalFiles,  
    commits: Math.floor(Math.random() * 15),
    pushs: Math.floor(Math.random() * 10),
}));
  return (
    <div className="mainAnalytics-container">
      <h1 className="analytics-title">My Analytics</h1>
      <div className='mainAnalytics'>

        {/* Cartes des statistiques */}
        <div className="stats-grid">
          {statsData.map((stat, index) => (
            <div key={index} className="stat-card">
              <h3>{stat.title}</h3>
              <p>{stat.value}</p>

            </div>
          ))}
        </div>

        {/* Graphique des tendances */}
        <div className="chart-container">
          <h2>Activité des développeurs cette semaine</h2>
          <LineChart
            width={800}
            height={400}
            data={chartData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="fichiers" stroke="#8884d8" />
            <Line type="monotone" dataKey="commits" stroke="#82ca9d" />
            <Line type="monotone" dataKey="pushs" stroke="#ff8042" />
          </LineChart>
        </div>
      </div>
    </div>
  )
}

export default MainAnalytics
