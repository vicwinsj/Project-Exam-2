import { createContext, useContext, useState, useEffect } from "react";
import { fetchProfile } from "../api/profile";

type AuthContextType = {
  accessToken: string | null;
  username: string | null;
  login: (token: string, name: string) => void;
  logout: () => void;
  authLoading: boolean;
  profile: Profile | null;
  setProfile: React.Dispatch<React.SetStateAction<Profile | null>>;
  refreshProfile: () => Promise<void>;
};

type Profile = {
  name: string;
  email: string;
  bio: string;
  avatar: {
    url: string;
    alt: string;
  };
  banner: {
    url: string;
    alt: string;
  };
  venueManager: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [profile, setProfile] = useState<Profile | null>(null);

  const refreshProfile = async () => {
    if (accessToken && username) {
      try {
        const data = await fetchProfile(username, accessToken);
        setProfile(data);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      }
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const name = localStorage.getItem("username");

    if (token) setAccessToken(token);
    if (name) setUsername(name);
  }, []);

  useEffect(() => {
    if (accessToken && username) {
      refreshProfile();
    }
  }, [accessToken, username]);

  useEffect(() => {
    if (accessToken !== undefined && username !== undefined) {
      setAuthLoading(false);
    }
  }, [accessToken, username]);

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
      value={{
        accessToken,
        username,
        login,
        logout,
        authLoading,
        profile,
        setProfile,
        refreshProfile,
      }}
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
