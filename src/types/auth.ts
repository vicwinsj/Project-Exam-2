import { Profile } from "./profile";

export type AuthContextType = {
  accessToken: string | null;
  username: string | null;
  login: (
    token: string,
    name: string,
    email: string,
    password: string,
    remember: boolean
  ) => void;
  logout: () => void;
  authLoading: boolean;
  savedPassword: string | null;
  savedUsername: string | null;
  profile: Profile | null;
  setProfile: React.Dispatch<React.SetStateAction<Profile | null>>;
  refreshProfile: () => Promise<void>;
};

export type ErrorState = {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
};
