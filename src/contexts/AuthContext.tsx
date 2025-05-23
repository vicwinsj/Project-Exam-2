import {
  createContext,
  useCallback,
  useContext,
  useState,
  useEffect,
} from "react";
import { fetchProfile } from "../api/profile";
import { Profile } from "../types/profile";
import { AuthContextType } from "../types/auth";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [profile, setProfile] = useState<Profile | null>(null);

  const refreshProfile = useCallback(async () => {
    setAuthLoading(true);
    if (accessToken && username) {
      try {
        const data = await fetchProfile(username, accessToken);
        setProfile(data);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      }
    }
    setAuthLoading(false);
  }, [accessToken, username]);

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
  }, [accessToken, username, refreshProfile]);

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
