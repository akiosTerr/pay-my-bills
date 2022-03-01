import axios from "axios";
import { HistoryItemType } from "../components/interfaces/interfaces";
import api_config from '../config/api_config'
import { RecurringBillAddRequest, RecurringBillsResponse } from "./interfaces/api_interfaces";

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

export const addRecurringBill = (newRecurringBill: RecurringBillAddRequest) => () => {
    axiosClient.post('/recurring-bills', newRecurringBill)
    .then((response) => {
      console.log(response)
    })
    .catch((error) => {
      console.error(error);
    });
}


export const removeRecurringBill = (id: string) => () => {
    axiosClient.delete('/recurring-bills/'+id)
    .then((response) => {
      console.log(response)
    })
    .catch((error) => {
      console.error(error);
    });
}