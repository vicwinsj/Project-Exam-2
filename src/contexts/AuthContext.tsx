import { createContext, useContext, useState, useEffect } from "react";

type AuthContextType = {
  accessToken: string | null;
  username: string | null;
  login: (token: string, name: string) => void;
  logout: () => void;
  authLoading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const name = localStorage.getItem("username");

    if (token) {
      setAccessToken(token);
    }

    if (name) {
      setUsername(name);
    }
    setAuthLoading(false);
  }, []);

  const login = (token: string, name: string) => {
    setAccessToken(token);
    localStorage.setItem("accessToken", token);
    setUsername(name);
    localStorage.setItem("username", name);
  };

  const logout = () => {
    setAccessToken(null);
    setUsername(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("username");
  };

  return (
    <AuthContext.Provider
      value={{ accessToken, username, login, logout, authLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
