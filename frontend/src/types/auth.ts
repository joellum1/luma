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
