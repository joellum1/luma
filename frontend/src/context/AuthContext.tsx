import React, { createContext, useState, useEffect, type ReactNode } from "react";
import { type AuthResponse } from "../types";
import { logoutUser } from "../api/auth";

interface AuthContextType {
  user: string | null;
  setUser: (username: string | null) => void;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
  logout: async () => {},
});

interface Props {
  children: ReactNode;
}

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<string | null>(null);

  // Optionally fetch current user from backend on mount
  useEffect(() => {
    fetch("http://127.0.0.1:8000/users/current/", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data: AuthResponse) => {
        if (data.username) setUser(data.username);
      })
      .catch(() => setUser(null));
  }, []);

  const logout = async () => {
    await logoutUser();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
