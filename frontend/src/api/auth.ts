import { type AuthResponse, type LoginPayload, type RegisterPayload } from "../types";

const BASE_URL = "http://127.0.0.1:8000/users/";

export async function loginUser(payload: LoginPayload): Promise<AuthResponse> {
  const res = await fetch(BASE_URL + "login/", {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  return res.json();
}

export async function registerUser(payload: RegisterPayload): Promise<AuthResponse> {
  const res = await fetch(BASE_URL + "register/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  return res.json();
}

export async function logoutUser(): Promise<AuthResponse> {
  const res = await fetch(BASE_URL + "logout/", {
    method: "POST",
    credentials: "include",
  });
  
  return res.json();
}
