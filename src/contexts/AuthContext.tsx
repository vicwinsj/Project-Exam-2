import { createContext, useContext, useState, useEffect } from "react";

type Avatar = {
  url: string;
  alt: string;
};

type AuthContextType = {
  accessToken: string | null;
  loggedInUser: { name: string; avatar: Avatar } | null;
  login: (token: string, name: string, avatar: Avatar) => void;
  logout: () => void;
  authLoading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [loggedInUser, setLoggedInUser] = useState<{
    name: string;
    avatar: { url: string; alt: string };
  } | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const name = localStorage.getItem("username");
    const avatarObject = localStorage.getItem("avatar");

    if (token) {
      setAccessToken(token);
    }

    if (name && avatarObject) {
      const avatar = JSON.parse(avatarObject);
      setLoggedInUser({ name, avatar });
    }
    setAuthLoading(false);
  }, []);

  const login = (token: string, name: string, avatar: Avatar) => {
    setAccessToken(token);
    localStorage.setItem("accessToken", token);
    setLoggedInUser({ name, avatar });
    localStorage.setItem("username", name);
    localStorage.setItem("avatar", JSON.stringify(avatar));
  };

  const logout = () => {
    setAccessToken(null);
    setLoggedInUser(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("username");
    localStorage.removeItem("avatar");
  };

  return (
    <AuthContext.Provider
      value={{ accessToken, loggedInUser, login, logout, authLoading }}
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
