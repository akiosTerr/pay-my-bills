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
import { styled } from 'styled-components';

const ContainerChart = styled.div`
  display: flex;
  width: 100%;
`;

const ContainerItem = styled.div`
  width: 50%;
`

const ChartHeader = styled.h2`
  color: #fff;
`

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

interface chartData {
  date: string;
  price: number;
}

const BitcoinChart: React.FC = () => {
  const [btcData, setBtcData] = useState<chartData[]>([]);
  const [solanaData, setSolanaData] = useState<chartData[]>([]);

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
        const fetchedData: chartData[] = response.data.prices.map((item: [number, number]) => ({
          date: new Date(item[0]).toLocaleDateString(),
          price: item[1]
        }));
        setBtcData(fetchedData);
      } catch (error) {
        console.error('Error fetching Bitcoin data:', error);
      }
    };

    fetchBitcoinData();
  }, []);

  useEffect(() => {
    const fetchSolanaData = async () => {
      try {
        const response = await axios.get('https://api.coingecko.com/api/v3/coins/solana/market_chart', {
          params: {
            vs_currency: 'usd',
            days: '30',  // Fetch data for the last 30 days
            interval: 'daily'
          }
        });
        const fetchedData: chartData[] = response.data.prices.map((item: [number, number]) => ({
          date: new Date(item[0]).toLocaleDateString(),
          price: item[1]
        }));
        setSolanaData(fetchedData);
      } catch (error) {
        console.error('Error fetching Bitcoin data:', error);
      }
    };

    fetchSolanaData()
  }, [])

  const btcChartData = {
    labels: btcData.map(d => d.date),
    datasets: [
      {
        label: 'Bitcoin Price (USD)',
        data: btcData.map(d => d.price),
        borderColor: '#fff',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      }
    ],
  };

  const solanaChartData = {
    labels: solanaData.map(d => d.date),
    datasets: [
      {
        label: 'Solana Price (USD)',
        data: solanaData.map(d => d.price),
        borderColor: '#fff',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      }
    ],
  };

  return (
    <ContainerChart>
      <ContainerItem>
        <ChartHeader>Bitcoin</ChartHeader>
        <Line data={btcChartData} />
      </ContainerItem>
      <ContainerItem>
        <ChartHeader>Solana</ChartHeader>
        <Line data={solanaChartData} />
      </ContainerItem>
    </ContainerChart>
  );
};

export default BitcoinChart;