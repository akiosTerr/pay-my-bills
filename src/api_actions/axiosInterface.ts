import axios from "axios";
import Cookies from "js-cookie";

const EnvironmentBaseUrl = process.env.REACT_APP_API_URL

export const getAuthAxiosClient = () => {
    let token = Cookies.get('jwtToken');
    if(!token) {
        token = ""
    }
    return axios.create({
        baseURL:  EnvironmentBaseUrl,
        headers: {
          "Content-type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Authorization": `Bearer ${token}`
        }
})}