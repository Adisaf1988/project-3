import React, { useEffect, useState } from "react";
import {
  LoginData,
  Maybe,
  RegisterData,
  Token,
  User,
  Vacation,
} from "../@types";
import { loginUser, userDetails } from "../components/pages/login/service";
import { registerUser } from "../components/pages/registration/service";

export interface IAuthContext {
  user: Maybe<User>;
  loading: boolean;
  error: unknown;
  token: Maybe<string>;
  followedVacations: Array<Vacation>;
  addFollow: (vacation: Vacation) => void;
  login: (userDetails: LoginData) => Promise<Maybe<Token>>;
  logout: () => void;
  register: (userData: RegisterData) => Promise<Maybe<Token>>;
}

const AuthContext = React.createContext<IAuthContext | null>(null);

export function AuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<Maybe<User>>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>();
  const [followed, setFollowed] = useState<Array<Vacation>>([]);
  const [token, setToken] = useState<Maybe<string>>(
    localStorage.getItem("token")
  );

  async function register(data: RegisterData): Promise<Maybe<Token>> {
    try {
      setLoading(true);
      const response = await registerUser(data);
      localStorage.setItem("token", response.access_token);
      setToken(response.access_token);
      return response;
    } catch (e) {
      setError(e);
      throw e;
    } finally {
      setLoading(false);
    }
  }

  async function login(data: LoginData): Promise<Maybe<Token>> {
    try {
      setLoading(true);
      const response = await loginUser(data);
      localStorage.setItem("token", response.access_token);
      setToken(response.access_token);
      return response;
    } catch (e) {
      setError(e);
      throw e;
    } finally {
      setLoading(false);
    }
  }

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
  };

  useEffect(() => {
    if (token) {
      const fetchUser = async () => {
        try {
          setLoading(true);
          const { user, follows } = await userDetails();
          setUser(user);
          setFollowed(follows);
        } catch (e) {
          logout();
          console.log(e);
        } finally {
          setLoading(false);
        }
      };

      fetchUser();
    } else {
      setLoading(false);
    }
  }, [token]);

  const addFollow = (vacation: Vacation) => {
    const existingVacation = followed.findIndex((f) => f.id === vacation.id);
    if (existingVacation != -1) {
      followed.splice(existingVacation, 1);
      setFollowed([...followed]);
    } else {
      setFollowed([...followed, vacation]);
    }
  };
  return (
    <AuthContext.Provider
      value={{
        user,
        followedVacations: followed,
        loading,
        error,
        token,
        addFollow,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("AuthContextProvider not found!");
  }
  return context;
};
