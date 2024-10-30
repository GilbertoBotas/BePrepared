import { PropsWithChildren, createContext, useContext, useEffect, useState } from "react";
import { AdminProps, LoginResponseProps, loginService } from "../services/auth";
import { api } from "../services/api";

interface AuthContextData {
  loggedIn: boolean;
  login: (email: string, password: string) => Promise<LoginResponseProps>;
  admin: AdminProps | null;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextData>({ } as AuthContextData);

export function AuthProvider({ children }: PropsWithChildren) {
  const [admin, setAdmin] = useState<AdminProps | null>(null);

  async function login(email: string, password: string): Promise<LoginResponseProps> {
    const response = await loginService(email, password);
    api.defaults.headers.Authorization = `Bearer ${response.token}`;
    localStorage.setItem("@BePrepared:token", response.token);
    localStorage.setItem("@BePrepared:admin", JSON.stringify(response.admin));
    setAdmin(response.admin)
    return response;
  }

  function logout() {
    setAdmin(null);
    localStorage.clear();
    api.defaults.headers.Authorization = '';
  }

  useEffect(() => {
    const token = localStorage.getItem("@BePrepared:token");
    const admin = localStorage.getItem("@BePrepared:admin");
    api.defaults.headers.Authorization = `Bearer ${token}`;

    if(admin)
      setAdmin(JSON.parse(admin));

    setAdmin(admin);
  },[]);

  return (
    <AuthContext.Provider value={{ loggedIn: !!admin, login, admin, logout }}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  
  return context;
}
