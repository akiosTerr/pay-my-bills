import Cookies from "js-cookie";
import { useEffect, useState } from "react";

export const useAuth = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    useEffect(() => {
      const token = Cookies.get('jwtToken');
      if (token) {
        setLoggedIn(true);
      } else {
        logout();
      }
    }, [loggedIn]);
  
    const login = (token: string) => {
      const expirationDate = new Date();
      expirationDate.setTime(expirationDate.getTime() + 6 * 60 * 60 * 1000);
      Cookies.set('jwtToken', token, { expires: expirationDate});
      setLoggedIn(true);
    };
  
    const logout = () => {
      Cookies.remove('jwtToken');
      setLoggedIn(false);
    };
  
    return { loggedIn, login, logout };
  };
  
