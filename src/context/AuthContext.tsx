import { ReactNode, createContext, useEffect, useState } from "react";
import { axiosPrivate } from "../api/axios";

type AuthContextTypes = {
  auth: {
    accessToken: string;
  };
  setAuth: React.Dispatch<React.SetStateAction<{ accessToken: string }>>;
};

const AuthContext = createContext({} as AuthContextTypes);

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [auth, setAuth] = useState({ accessToken: "" });
  useEffect(() => {
    if (auth.accessToken) {
      axiosPrivate.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${auth.accessToken}`;
    }
  }, [auth.accessToken]);
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
