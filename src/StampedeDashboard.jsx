import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const eventsData = [
  {
    date: '2025-05-03',
    location: 'Sree Lairai Devi Temple, Goa',
    description: 'Stampede during annual pilgrimage festival (Jatra)',
    deaths: 6,
    injuries: 70,
    source: 'AP News',
    type: 'Religious'
  },
  {
    date: '2025-01-29',
    location: 'Maha Kumbh Mela, Prayagraj, UP',
    description: 'Stampede during pre-dawn holy dip on Mauni Amavasya',
    deaths: 30,
    injuries: 60,
    source: 'Euronews',
    type: 'Religious'
  },
  {
    date: '2025-02-15',
    location: 'New Delhi Railway Station',
    description: 'Stampede as crowds scrambled to catch trains to religious festival',
    deaths: 18,
    injuries: null,
    source: 'Reuters',
    type: 'Transit'
  },
  {
    date: '2025-01-08',
    location: 'Temple in Andhra Pradesh',
    description: 'Stampede near temple as thousands gathered to secure free visit passes',
    deaths: 6,
    injuries: 35,
    source: 'Reuters',
    type: 'Religious'
  },
  {
    date: '2024-07-02',
    location: 'Hathras, UP',
    description: 'Stampede at religious congregation led by Hindu preacher',
    deaths: 121,
    injuries: 150,
    source: 'NPR',
    type: 'Religious'
  },
  {
    date: '2023-03-31',
    location: 'Indore, MP',
    description: "Slab over ancient well collapsed during 'havan' on Ram Navami",
    deaths: 36,
    injuries: null,
    source: 'Economic Times',
    type: 'Religious'
  },
  {
    date: '2022-01-01',
    location: 'Vaishno Devi Shrine, J&K',
    description: 'Stampede triggered by heavy rush of devotees at shrine',
    deaths: 12,
    injuries: 15,
    source: 'Economic Times',
    type: 'Religious'
  }
];

const StampedeDashboard = () => {
  const [filter, setFilter] = useState('All');

  const filteredData = filter === 'All' ? eventsData : eventsData.filter(e => e.type === filter);
  const labels = filteredData.map(e => `${new Date(e.date).toLocaleDateString()} | ${e.location}`);

  const deathsData = filteredData.map(e => e.deaths);
  const injuriesData = filteredData.map(e => e.injuries || 0);

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Deaths',
        data: deathsData,
        backgroundColor: 'rgba(239, 68, 68, 0.8)' // Red
      },
      {
        label: 'Injuries',
        data: injuriesData,
        backgroundColor: 'rgba(234, 179, 8, 0.8)' // Yellow
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#1f2937',
          font: { size: 14 }
        }
      },
      tooltip: {
        callbacks: {
          title: (tooltipItems) => filteredData[tooltipItems[0].dataIndex].description,
          afterTitle: (tooltipItems) => `Source: ${filteredData[tooltipItems[0].dataIndex].source}`,
        }
      }
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">🧭 Stampede Events Dashboard</h1>
        <p className="text-sm text-gray-500">Visualizing deaths and injuries from major stampede incidents</p>
      </div>

      <div className="card bg-base-100 shadow-xl p-6 mb-6">
        <div className="form-control w-full max-w-xs mb-4">
          <label className="label">
            <span className="label-text font-semibold">Filter by Event Type</span>
          </label>
          <select
            className="select select-bordered"
            value={filter}
            onChange={e => setFilter(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Religious">Religious</option>
            <option value="Transit">Transit</option>
          </select>
        </div>
        <div className="overflow-x-auto">
          <Bar data={chartData} options={options} />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 mt-6">
        {filteredData.map((event, i) => (
          <div key={i} className="card shadow-md bg-base-200 p-4">
            <h3 className="text-lg font-bold text-primary">{event.location}</h3>
            <p className="text-sm text-gray-600 mb-1">{new Date(event.date).toDateString()}</p>
            <p className="text-sm italic mb-2 text-gray-700">"{event.description}"</p>
            <div className="text-sm"><span className="font-semibold">Deaths:</span> {event.deaths}</div>
            <div className="text-sm"><span className="font-semibold">Injuries:</span> {event.injuries ?? 'Not specified'}</div>
            <div className="text-xs text-right text-gray-500 mt-2">📌 Source: {event.source}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StampedeDashboard;
