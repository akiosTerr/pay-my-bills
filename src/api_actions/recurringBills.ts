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

export const getOneRecurringBill = (id:string, setRecurringBill: Function) => () => {
    axiosClient.get('/recurring-bills/'+id)
    .then((response) => {
      const item: RecurringBillsResponse = response.data
      setRecurringBill(item)
    })
    .catch((error) => {
      console.error(error);
    });
}

export const addRecurringBill = (newRecurringBill: RecurringBillAddRequest, navigate: Function) => () => {
    axiosClient.post('/recurring-bills', newRecurringBill)
    .then((response) => {
      navigate("/")
    })
    .catch((error) => {
      console.error(error);
    });
}


export const editRecurringBill = (id: string, newRecurringBill: RecurringBillAddRequest, navigate: Function) => () => {
    axiosClient.put('/recurring-bills/'+id, newRecurringBill)
    .then((response) => {
      navigate("/")
    })
    .catch((error) => {
      console.error(error);
    });
}


export const removeRecurringBill = (id: string, updateBills: Function) => () => {
    axiosClient.delete('/recurring-bills/'+id)
    .then((response) => {
      updateBills()
    })
    .catch((error) => {
      console.error(error);
    });
}