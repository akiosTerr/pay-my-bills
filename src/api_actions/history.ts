import { HistoryItemType, LineChartData } from "components/interfaces/interfaces";
import { HistoryAddRequest } from "api_actions/interfaces/api_interfaces";
import { getAuthAxiosClient } from "./axiosInterface";

export const getHistoryItems = (setHistoryItems: Function) => () => {
  const axiosClient_wx = getAuthAxiosClient()  
  axiosClient_wx.get('/history')
    .then((response) => {
      const items: HistoryItemType[] = response.data
      setHistoryItems(items)
    })
    .catch((error) => {
      console.error(error);
    });
}

export const addHistoryItem = (historyItem: HistoryAddRequest, updateHistory: Function, updateBills: Function) => () => {
  const axiosClient_wx = getAuthAxiosClient()
  
  axiosClient_wx.post('/history',historyItem)
    .then((response) => {
      updateHistory()
      updateBills()
    })
    .catch((error) => {
      console.error(error);
    });
}

export const removeHistoryItem = (historyItemId: string, updateHistory: Function) => {
  const axiosClient_wx = getAuthAxiosClient()
  axiosClient_wx.delete('/history/'+historyItemId)
  .then((response) => {
    updateHistory()
  })
  .catch((error) => {
    console.error(error);
  });
}


export const getChartData = (setChartData: Function) => () => {
  const axiosClient_wx = getAuthAxiosClient()
  axiosClient_wx.get('/history/chart')
    .then((response) => {
      const items: LineChartData[] = response.data
      setChartData(items)
    })
    .catch((error) => {
      console.error(error);
    });
}