import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { AdminProps, LoginResponseProps, loginService } from "../services/auth";
import { api } from "../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface SubscriberData {
  id: string;
  deviceId: string;
  phone: string;
  districtId: string;
  provinceId: string;
}

interface AuthContextData {
  subscriber: SubscriberData | null;
  updateSubscriber: (subscriber: SubscriberData) => void;
  loggedIn: boolean;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData
);

export function AuthProvider({ children }: PropsWithChildren) {
  const [subscriber, setSubscriber] = useState<SubscriberData | null>(null);

  function updateSubscriber(subscriber: SubscriberData) {
    setSubscriber(subscriber);
    api.defaults.headers.Authorization = subscriber.deviceId;
    const jsonValue = JSON.stringify(subscriber);
    AsyncStorage.setItem("@BePrepared:subscriber", jsonValue);
  }

  function logout() {
    AsyncStorage.clear().then(() => {
      setSubscriber(null);
      api.defaults.headers.Authorization = "";
    });
  }

  useEffect(() => {
    AsyncStorage.getItem("@BePrepared:subscriber").then((value) => {
      if (value) {
        const parsedValue = JSON.parse(value);
        setSubscriber(parsedValue);
        api.defaults.headers.Authorization = parsedValue.deviceId;
      }
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{ loggedIn: !!subscriber, subscriber, logout, updateSubscriber }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}
