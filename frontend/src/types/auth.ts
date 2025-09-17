export interface User {
  username: string;
  email: string;
}

export interface AuthContextType {
  user: string | null;

  accessToken: string | null;
  refreshToken: string | null;

  loading: boolean;
  isAuthenticated: boolean;

  login: (username: string, access: string, refresh: string) => void;
  logout: () => void;

  refreshAccessToken: () => Promise<boolean>;
}

export interface AuthResponse {
  message?: string;
  error?: string;
  username?: string;
}

export interface LoginPayload {
  username: string;
  password: string;
}

export interface RegisterPayload {
  username: string;
  email: string;
  password: string;
}
