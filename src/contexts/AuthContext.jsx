import { createContext, useState } from "react";
import { saveToken, removeToken } from "../utils/token";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLogged, setIsLogged] = useState(false);
  const [email, setEmail] = useState("");

  const onLogin = ({ token, email }) => {
    setIsLogged(true);
    saveToken(token);
    setEmail(email);
  };
  const onLogout = () => {
    setIsLogged(false);
    removeToken();
    setEmail("");
  };

  return (
    <AuthContext.Provider
      value={{
        isLogged,
        email,
        onLogin,
        onLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
