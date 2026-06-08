import { createContext, useState, useEffect, useContext } from "react";
import api from "../utils/api";
import { AuthContext } from "./AuthContext";

export const CurrentUserContext = createContext(null);

export function CurrentUserProvider({ children }) {
  const [currentUser, setCurrentUser] = useState({});
  const { isLogged } = useContext(AuthContext);

  useEffect(() => {
    if (!isLogged) {
      return;
    }

    (async () => {
      try {
        const response = await api.getUserInfo();
        setCurrentUser(response);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [isLogged]);

  const handleUpdateUser = async (data) => {
    try {
      const response = await api.updateUserInfo(data);
       console.log(response);
      setCurrentUser(response);
    } catch (error) {
      console.error(error);
    }
  };
  const handleUpdateAvatar = async (data) => {
    await api.updateProfilePicture(data).then((res) => {
      setCurrentUser(res);
    });
  };

  return (
    <CurrentUserContext.Provider
      value={{ currentUser, handleUpdateUser, handleUpdateAvatar }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
}
