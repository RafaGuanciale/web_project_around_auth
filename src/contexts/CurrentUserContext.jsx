import { createContext, useState, useEffect } from "react";
import api from "../utils/api";

export const CurrentUserContext = createContext(null);

export function CurrentUserProvider({ children }) {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    (async () => {
      try {
        const response = await api.getUserInfo();
        setCurrentUser(response);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  const handleUpdateUser = async (data) => {
    try {
      const response = await api.updateUserInfo(data);
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