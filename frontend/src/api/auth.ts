import { type LoginPayload, type RegisterPayload } from "../types";

const BASE_URL = "http://127.0.0.1:8000/";

export async function registerUser(payload: RegisterPayload) {
  try {
    const res = await fetch(BASE_URL + "users/register/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      return { error: "Registration failed" };
    }

    const data = await res.json();
    return data; // should return user info if backend is set up like that
  } catch {
    return { error: "Something went wrong. Please try again." };
  }
}

export async function loginUser(payload: LoginPayload) {
  try {
    const res = await fetch(BASE_URL + "api/token/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      return { error: "Invalid credentials" };
    }

    const data = await res.json();
    return { access: data.access, refresh: data.refresh };
  } catch {
    return { error: "Something went wrong. Please try again." };
  }
}