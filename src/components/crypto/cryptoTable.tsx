import React, { useState, useEffect } from "react";
import { fetchCryptocurrencies } from "api_actions/cryptoService";
import { CryptoCurrency } from "../interfaces/interfaces";
import { CryptoPrice, getPriceBrl, getPriceUsd } from "utils/general_utils";
import { CryptoTableElement, Totalnetworth } from "./cryptoTable.style";
import AddCryptoForm from "./addCryptoForm";
import TableError from "./tableError";

function formatToCurrency(value: number, currency: string = 'USD', locale: string = 'en-US'): string {
  return value.toLocaleString(locale, {
    style: 'currency',
    currency: currency,
  });
}

const CryptoTable: React.FC = () => {
  const [cryptoData, setCryptoData] =
    useState<CryptoCurrency[]>([]);
  const [currentPrice, setCurrentPrice] = useState<CryptoPrice[]>([]);
  const [totalUsd, setTotalUsd] = useState<number>(0);
  const [totalBrl, setTotalBrl] = useState<number>(0);

  const loadData = async () => {
    const updatedCryptos = await fetchCryptocurrencies();
    const priceData = updatedCryptos.map((item) => {
      const { name, current_price_usd, current_price_brl } = item
      return {
        name,
        current_price_usd,
        current_price_brl
      }
    })
    setCryptoData(updatedCryptos)
    setCurrentPrice(priceData)
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    updateTotals(cryptoData)
  }, [currentPrice, cryptoData])

  const addNewCrypto = () => {
    loadData()
  }

  const updateTotals = (cryptos: CryptoCurrency[]) => {
    const getTotal = (coinValues: number[]) => {
      if (coinValues.length === 0)
        return 0
      const total = coinValues.reduce(
        (accumulator, currentValue) => accumulator + currentValue
      );

      return total;
    };

    const getTotalUsd = () => {
      const totalValueList = cryptos.map(
        (crypto) => crypto.amount * getPriceUsd(crypto.name, currentPrice)
      );
      return getTotal(totalValueList);
    };
    const getTotalBrl = () => {
      const totalValueList = cryptos.map(
        (crypto) => crypto.amount * getPriceBrl(crypto.name, currentPrice)
      );
      return getTotal(totalValueList);
    };
    setTotalUsd(getTotalUsd());
    setTotalBrl(getTotalBrl());
  };

  return (
    <>
      <CryptoTableElement>
        <thead>
          <tr>
            <th>Name</th>
            <th>Symbol</th>
            <th>Owned</th>
            <th>Price (USD)</th>
            <th>Price (BRL)</th>
            <th>Value (USD)</th>
            <th>Value (BRL)</th>
          </tr>
        </thead>
        <tbody>
          <AddCryptoForm addNewCrypto={addNewCrypto} />
          <tr>
            <td colSpan={7}>
              <hr />
            </td>
          </tr>
          {cryptoData.map((crypto) => (
            <tr key={crypto.urlname}>
              <td>{crypto.name}</td>
              <td>{crypto.symbol}</td>
              <td>{crypto.amount}</td>
              <td>${getPriceUsd(crypto.name, currentPrice).toFixed(2)}</td>
              <td>R${getPriceBrl(crypto.name, currentPrice).toFixed(2)}</td>
              <td>
                ${(crypto.amount * getPriceUsd(crypto.name, currentPrice)).toFixed(2)}
              </td>
              <td>
                R${(crypto.amount * getPriceBrl(crypto.name, currentPrice)).toFixed(2)}
              </td>
              <td>
              </td>
            </tr>
          ))}
          <tr>
            <td colSpan={7}>
              <Totalnetworth>
                Total: {formatToCurrency(totalBrl, "BRL")} {formatToCurrency(totalUsd)}
              </Totalnetworth>
            </td>
          </tr>
        </tbody>
      </CryptoTableElement>

    </>
  );
};

export default CryptoTable;
