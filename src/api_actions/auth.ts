import { LoginData } from "./interfaces/api_interfaces";
import { getAuthAxiosClient } from "./axiosInterface";


export const getLoginToken = (loginData: LoginData, login: Function, setProfileName: any) => {
  const axiosClient_wx = getAuthAxiosClient()
  axiosClient_wx.post('/auth/login', loginData)
    .then((response) => {
      login(response.data.token)
      setProfileName(response.data.username)
      localStorage.setItem('username', response.data.username);
    })
    .catch((error) => {
      console.error(error);
    });
}