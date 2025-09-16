import { createContext, useState, useEffect, type ReactNode } from "react";

interface AuthContextType {
  user: string | null;
  token: string | null;   // JWT access token
  login: (username: string, token: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const storedUser = localStorage.getItem("user");
  const storedToken = localStorage.getItem("token");

  const [user, setUser] = useState<string | null>(storedUser);
  const [token, setToken] = useState<string | null>(storedToken);

  // Save to localStorage whenever user or token changes
  useEffect(() => {
    if (user && token) {
      localStorage.setItem("user", user);
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    }
  }, [user, token]);

  const login = (username: string, newToken: string) => {
    setUser(username);
    setToken(newToken);
    localStorage.setItem("user", username);
    localStorage.setItem("token", newToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
