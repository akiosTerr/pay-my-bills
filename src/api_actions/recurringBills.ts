import { getAuthAxiosClient } from "./axiosInterface";
import { RecurringBillAddRequest, RecurringBillsResponse } from "./interfaces/api_interfaces";


export const getRecurringBills = (setRecurringBills: Function) => () => {
  const axiosClient_wx = getAuthAxiosClient()
  axiosClient_wx.get('/recurring-bills')
    .then((response) => {
      const items: RecurringBillsResponse[] = response.data
      setRecurringBills(items)
    })
    .catch((error) => {
      console.error(error);
    });
}

export const getOneRecurringBill = (id:string, setRecurringBill: Function) => () => {
    const axiosClient_wx = getAuthAxiosClient()
    axiosClient_wx.get('/recurring-bills/'+id)
    .then((response) => {
      const item: RecurringBillsResponse = response.data
      setRecurringBill(item)
    })
    .catch((error) => {
      console.error(error);
    });
}

export const addRecurringBill = (newRecurringBill: RecurringBillAddRequest, navigate: Function) => () => {
    const axiosClient_wx = getAuthAxiosClient()
    axiosClient_wx.post('/recurring-bills', newRecurringBill)
    .then((response) => {
      navigate("/")
    })
    .catch((error) => {
      console.error(error);
    });
}


export const editRecurringBill = (id: string, newRecurringBill: RecurringBillAddRequest, navigate: Function) => () => {
  const axiosClient_wx = getAuthAxiosClient()  
  axiosClient_wx.put('/recurring-bills/'+id, newRecurringBill)
    .then((response) => {
      navigate("/")
    })
    .catch((error) => {
      console.error(error);
    });
}


export const removeRecurringBill = (id: string, updateBills: Function) => () => {
    const axiosClient_wx = getAuthAxiosClient()
    axiosClient_wx.delete('/recurring-bills/'+id)
    .then((response) => {
      updateBills()
    })
    .catch((error) => {
      console.error(error);
    });
}