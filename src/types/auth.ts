import { Profile } from "./profile";

export type AuthContextType = {
  accessToken: string | null;
  username: string | null;
  login: (token: string, name: string) => void;
  logout: () => void;
  authLoading: boolean;
  profile: Profile | null;
  setProfile: React.Dispatch<React.SetStateAction<Profile | null>>;
  refreshProfile: () => Promise<void>;
};
