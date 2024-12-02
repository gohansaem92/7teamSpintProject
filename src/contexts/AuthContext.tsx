import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  useEffect,
} from "react";

type AuthContextType = {
  loggedIn: boolean;
  setLoggedIn: (status: boolean) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    setLoggedIn(!!accessToken);
  }, []);

  const value = useMemo(() => ({ loggedIn, setLoggedIn }), [loggedIn]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
