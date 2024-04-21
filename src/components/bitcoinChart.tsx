// src/components/BitcoinChart.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

interface BitcoinData {
  date: string;
  price: number;
}

const BitcoinChart: React.FC = () => {
  const [data, setData] = useState<BitcoinData[]>([]);

  useEffect(() => {
    const fetchBitcoinData = async () => {
      try {
        const response = await axios.get('https://api.coingecko.com/api/v3/coins/bitcoin/market_chart', {
          params: {
            vs_currency: 'usd',
            days: '30',  // Fetch data for the last 30 days
            interval: 'daily'
          }
        });
        const fetchedData: BitcoinData[] = response.data.prices.map((item: [number, number]) => ({
          date: new Date(item[0]).toLocaleDateString(),
          price: item[1]
        }));
        setData(fetchedData);
      } catch (error) {
        console.error('Error fetching Bitcoin data:', error);
      }
    };

    fetchBitcoinData();
  }, []);

  const chartData = {
    labels: data.map(d => d.date),
    datasets: [
      {
        label: 'Bitcoin Price (USD)',
        data: data.map(d => d.price),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      }
    ],
  };

  return (
    <div>
      <h2>Bitcoin Price Chart</h2>
      <Line data={chartData} />
    </div>
  );
};

export default BitcoinChart;