import React, { useEffect, useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { getCreatedFilesThisWeek, getModifiedFilesThisWeek } from '../../Services/FileService';
import './MainAnalytics.css'


const MainAnalytics = () => {
    const [createdFiles, setCreatedFiles] = useState(0);
  const [modifiedFiles, setModifiedFiles] = useState(0);

  useEffect(() => {
    const fetchStats = async () => {
      const created = await getCreatedFilesThisWeek();
      const modified = await getModifiedFilesThisWeek();
      setCreatedFiles(created);
      setModifiedFiles(modified);
    };

    fetchStats();
  }, []);

  const statsData = [
    { title: 'Fichiers créés cette semaine', value: createdFiles },
    { title: 'Fichiers modifiés cette semaine', value: modifiedFiles },
    { title: 'Nombre de commits', value: '78' }, // Exemple statique
    { title: 'Nombre de pushs', value: '56' }, // Exemple statique
  ];

  // Données fictives pour le graphique
  const chartData = [
    { name: 'Lun', fichiers: 10, commits: 5, pushs: 3 },
    { name: 'Mar', fichiers: 20, commits: 10, pushs: 7 },
    { name: 'Mer', fichiers: 15, commits: 8, pushs: 4 },
    { name: 'Jeu', fichiers: 25, commits: 12, pushs: 9 },
    { name: 'Ven', fichiers: 30, commits: 15, pushs: 10 },
    { name: 'Sam', fichiers: 10, commits: 5, pushs: 2 },
    { name: 'Dim', fichiers: 5, commits: 3, pushs: 1 },
  ];

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
