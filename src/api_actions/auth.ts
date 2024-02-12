import { LoginData } from "./interfaces/api_interfaces";
import { getAuthAxiosClient } from "./axiosInterface";
import Cookies from 'js-cookie';
import { redirect } from "react-router-dom";


export const getLoginToken = (loginData: LoginData, login: Function) => {
  const axiosClient_wx = getAuthAxiosClient()
  axiosClient_wx.post('/auth/login', loginData)
    .then((response) => {
      console.log(response)
      Cookies.set('jwtToken', response.data.token, { expires: 1 });
      login()
    })
    .catch((error) => {
      console.error(error);
    });
}