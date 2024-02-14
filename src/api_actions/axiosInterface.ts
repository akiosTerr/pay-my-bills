import axios from "axios";
import { prod_url } from "config/url_data";
import Cookies from "js-cookie";

const Environments = {
    local: "http://localhost:3001",
    prod: prod_url
}

export const getAuthAxiosClient = () => {
    let token = Cookies.get('jwtToken');
    if(!token) {
        token = ""
    }
    return axios.create({
        baseURL:  Environments.local,
        headers: {
          "Content-type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Authorization": `Bearer ${token}`
        }
})}