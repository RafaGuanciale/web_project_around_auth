import { createContext, useState } from "react";
import { saveToken, removeToken } from "../utils/token";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLogged, setIsLogged] = useState(false);
  const [email, setEmail] = useState("");

  const login = ({ token, email }) => {
    setIsLogged(true);
    saveToken(token);
    setEmail(email);
  };
  const logout = () => {
    setIsLogged(false);
    removeToken();
    setEmail("");
  };

  return (
    <AuthContext.Provider
      value={{
        isLogged,
        email,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
