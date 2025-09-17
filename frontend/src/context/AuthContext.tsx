import { BASE_URL } from "../api/constants";
import { createContext, useState, useEffect, useCallback, type ReactNode } from "react";

interface AuthContextType {
  user: string | null;

  accessToken: string | null;   // JWT access token
  refreshToken: string | null;

  loading: boolean;
  isAuthenticated: boolean;

  login: (username: string, access: string, refresh: string) => void;
  logout: () => void;

  refreshAccessToken: () => Promise<boolean>;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,

  accessToken: null,
  refreshToken: null,

  loading: true,
  isAuthenticated: false,

  login: () => Promise.resolve(),
  logout: () => {},

  refreshAccessToken: async () => false,
});

const ACCESS_KEY = "access_token";
const REFRESH_KEY = "refresh_token";
const USER_KEY = "user";

/** Decode JWT payload safely */
function parseJwt(token: string | null) {
  if (!token) return null;
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => `%${("00" + c.charCodeAt(0).toString(16)).slice(-2)}`)
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
}

function isTokenExpired(token: string | null) {
  const payload = parseJwt(token);
  if (!payload || !payload.exp) return true;
  const expMs = payload.exp * 1000;
  return Date.now() > expMs;
}

const REFRESH_URL = BASE_URL + "api/token/refresh/";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const initialAccess = localStorage.getItem(ACCESS_KEY);
  const initialRefresh = localStorage.getItem(REFRESH_KEY);
  const initialUser = localStorage.getItem(USER_KEY);

  const [user, setUser] = useState<string | null>(initialUser);
  const [accessToken, setAccessToken] = useState<string | null>(initialAccess);
  const [refreshToken, setRefreshToken] = useState<string | null>(initialRefresh);
  const [loading, setLoading] = useState<boolean>(true);

  const login = (username: string, access: string, refresh: string) => {
    setUser(username);
    setAccessToken(access);
    setRefreshToken(refresh);
    localStorage.setItem(USER_KEY, username);
    localStorage.setItem(ACCESS_KEY, access);
    localStorage.setItem(REFRESH_KEY, refresh);
  };

  const logout = () => {
    setUser(null);
    setAccessToken(null);
    setRefreshToken(null);
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(ACCESS_KEY);
    localStorage.removeItem(REFRESH_KEY);
  };

  const refreshAccessToken = useCallback(async (): Promise<boolean> => {
    const rt = localStorage.getItem(REFRESH_KEY) || refreshToken;
    if (!rt) return false;

    try {
      const res = await fetch(REFRESH_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh: rt }),
      });
      if (!res.ok) {
        // invalid refresh -> logout
        console.warn("Refresh token invalid, logging out");
        logout();

        return false;
      }
      const json = await res.json();

      if (!json.access) return false;

      setAccessToken(json.access);
      localStorage.setItem(ACCESS_KEY, json.access);

      return true;
    } catch (err) {
      console.error("Error refreshing access token:", err);

      return false;
    }
  }, [refreshToken]);

  // On mount, ensure we have a valid access token (refresh if expired)
  useEffect(() => {
    let mounted = true;
    const init = async () => {
      // if no access AND no refresh -> nothing to do
      if (!accessToken && !refreshToken) {
        if (mounted) setLoading(false);
        return;
      }

      // if access exists and is valid -> good
      if (accessToken && !isTokenExpired(accessToken)) {
        if (mounted) setLoading(false);
        return;
      }

      // else try refresh (if we have refresh)
      if (refreshToken) {
        await refreshAccessToken();
        if (mounted) setLoading(false);
        return;
      }

      // no valid tokens
      if (mounted) setLoading(false);
    };

    init();
    return () => {
      mounted = false;
    };
  }, []); // run once on mount

  const isAuthenticated = !!accessToken && !isTokenExpired(accessToken);

  return (
    <AuthContext.Provider value={{
        user,
        accessToken,
        refreshToken,
        loading,
        isAuthenticated,
        login,
        logout,
        refreshAccessToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
