import { createContext, useContext, useState } from "react";
import { setAccessToken as setAxiosAccessToken } from "../api/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessTokenState] = useState("");

  const setAccessToken = (token) => {
    setAccessTokenState(token);
    setAxiosAccessToken(token); // Keep axios in sync
  };

  const logout = () => {
    setAccessToken("");
  };

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        setAccessToken,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);