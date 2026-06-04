import { createContext, useState } from "react";
import { saveToken, removeToken } from "../utils/token";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState({});

  const login = (userData) => {
    setIsLogged(true);
    saveToken(userData.token);
    setUser(userData);
  };
  const logout = () => {
    setIsLogged(false);
    removeToken();
    setUser({});
  };

  return (
    <AuthContext.Provider
      value={{
        isLogged,
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
