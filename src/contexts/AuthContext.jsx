import { createContext, useState } from "react";
import { saveToken, removeToken } from "../utils/token";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLogged, setIsLogged] = useState(false);
  const [token, setToken] = useState("");

  const login = (token) => {
    setIsLogged(true);
    saveToken(token);
    setToken(token)
  };
  const logout = () => {
    setIsLogged(false);
    removeToken();
    setToken("");
  };

  return (
    <AuthContext.Provider
      value={{
        isLogged,
        token,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
