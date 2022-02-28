import axios from "axios";
import { HistoryItemType } from "../components/interfaces/interfaces";
import api_config from '../config/api_config'

const api_path = api_config.apiUrl

const axiosClient = axios.create({
    baseURL:  api_path,
    headers: {
      "Content-type": "application/json"
    }
  });

export const getHistoryItems = (setHistoryItems: Function) => () => {
    axiosClient.get('/history')
    .then((response) => {
      const items: HistoryItemType[] = response.data
      setHistoryItems(items)
    })
    .catch((error) => {
      console.error(error);
    });
}