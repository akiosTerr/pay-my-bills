import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LiveBitcoinPrice: React.FC = () => {
  const [price, setPrice] = useState<string | null>(null);

  useEffect(() => {
    const fetchBitcoinPrice = async () => {
      try {
        const response = await axios.get('https://api.coingecko.com/api/v3/simple/price', {
          params: {
            ids: 'bitcoin',
            vs_currencies: 'usd'
          }
        });
        console.log(response.data.bitcoin.usd)
        const price = response.data.bitcoin.usd;
        setPrice(price.toLocaleString());
      } catch (error) {
        console.error('Error fetching Bitcoin price:', error);
      }
    };

    fetchBitcoinPrice();
    const interval = setInterval(fetchBitcoinPrice, 30000);  // 30000 milliseconds = 30 seconds

    return () => clearInterval(interval);  // Cleanup interval on component unmount
  }, []);

  return (
    <div>
      <h2>Live Bitcoin Price</h2>
      <h1>Current Bitcoin Price: USD {price}</h1>
    </div>
  );
};

export default LiveBitcoinPrice;