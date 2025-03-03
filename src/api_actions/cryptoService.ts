// src/services/cryptoService.ts
import axios from 'axios';
import { CryptoCurrency, CryptoCurrentPrice } from 'components/interfaces/interfaces';
import { getAuthAxiosClient } from './axiosInterface';

const API_URL = 'https://api.coingecko.com/api/v3/simple/price';

interface GetCryptoIdResponse {
  data: NewCryptoInput[]
}

interface GetCryptoCurrentPriceResponse {
  data: PriceData
}

export interface NewCryptoInput {
  id?: string;
  urlname: string;
  name: string;
  symbol: string;
  amount: number;
}

interface CoinPriceData {
  brl: number
  usd: number
}

interface PriceData {
  [key: string]: CoinPriceData
}

export const fetchCryptocurrencies = async (): Promise<CryptoCurrency[]> => {

  const axiosClient_wx = getAuthAxiosClient()
  let responseCryptoId: GetCryptoIdResponse
  try {
    responseCryptoId = await axiosClient_wx.get('/crypto')
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.response?.status, error.response?.data);
    } else if (error instanceof Error) {
      console.error("Unexpected error:", error.message);
    }
    throw error;
  }
  const coinData = responseCryptoId.data

  const currencies = coinData.map(coin => coin.urlname).join(',');
  let responseCryptoCurrentPrice: GetCryptoCurrentPriceResponse
  try {
    responseCryptoCurrentPrice = await axios.get(`${API_URL}?ids=${currencies}&vs_currencies=usd,brl`);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.response?.status, error.response?.data);
    } else if (error instanceof Error) {
      console.error("Unexpected error:", error.message);
    }
    throw error;
  }

  const priceData: PriceData = responseCryptoCurrentPrice.data;

  const dataWithPrice: CryptoCurrency[] = coinData.map(coin => {

    return {
      ...coin,
      current_price_usd: priceData[coin.urlname] ? priceData[coin.urlname].usd : 0,
      current_price_brl: priceData[coin.urlname] ? priceData[coin.urlname].brl : 0,
    }
  })

  return dataWithPrice;
}

export const addCryptoCurrency = async (newCrypto: NewCryptoInput): Promise<NewCryptoInput> => {
  const axiosClient_wx = getAuthAxiosClient()

  try {
    const response = await axiosClient_wx.post('/crypto', newCrypto)
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.response?.status, error.response?.data);
    } else if (error instanceof Error) {
      console.error("Unexpected error:", error.message);
    }
    throw error;
  }

}
