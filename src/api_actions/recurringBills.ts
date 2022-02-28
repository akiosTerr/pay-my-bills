import axios from "axios";
import { HistoryItemType } from "../components/interfaces/interfaces";
import api_config from '../config/api_config'
import { RecurringBillsResponse } from "./interfaces/api_interfaces";

const api_path = api_config.apiUrl

const axiosClient = axios.create({
    baseURL:  api_path,
    headers: {
      "Content-type": "application/json"
    }
  });

export const getRecurringBills = (setRecurringBills: Function) => () => {
    axiosClient.get('/recurring-bills')
    .then((response) => {
      const items: RecurringBillsResponse[] = response.data
      setRecurringBills(items)
    })
    .catch((error) => {
      console.error(error);
    });
}