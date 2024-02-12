import Cookies from "js-cookie";
import { useEffect, useState } from "react";

export const useAuth = () => {
    const [loggedIn, setLoggedIn] = useState(false);
  
    useEffect(() => {
      // Check if the user is logged in (e.g., by checking if a token exists in local storage)
      const token = Cookies.get('jwtToken');
      if (token) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
    }, [loggedIn]);
  
    const login = () => {
      setLoggedIn(true);
    };
  
    const logout = () => {
      setLoggedIn(false);
    };
  
    return { loggedIn, login, logout };
  };
  
