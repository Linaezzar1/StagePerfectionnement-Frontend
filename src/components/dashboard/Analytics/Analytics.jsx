import React from 'react'
import ReactApexChart from 'react-apexcharts';
import './Analytics.css'


const Analytics = () => {

  const statsData = [
    { title: "Active developers at this moment", value: "12" },
    { title: "Modified files /month", value: "345" },

  ];


  const options = {
    chart: {
      id: 'basic-bar',
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    },
  };

  const series = [
    {
      name: 'Modified files',
      data: [30, 40, 45, 50, 49, 60, 70, 91, 125, 80, 90, 100],
    },
  ];


  return (
    <div className='analytics-container'>
      <div className="stats">
        {statsData.map((stat, index) => (
          <div key={index} className="stat-item">
            <h3> {stat.title}</h3>
            <p>{stat.value}</p>

          </div>
        ))}
      </div>

      <div className="charts">
        <h2>Developers activity</h2>
        <ReactApexChart options={options} series={series} type="bar" width="100%" height="300" />
      </div>
    </div>
  )
}

export default Analytics
