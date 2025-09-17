import { useState, useEffect, useContext, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../context/AuthContext";
import { useAuthApi } from "../api/auth";

import type { LoginPayload, RegisterPayload } from "../types";

export default function LoginForm() {
  const navigate = useNavigate();

  const [mode, setMode] = useState<"login" | "register">("login");
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const { login } = useContext(AuthContext);
  const { registerUser, loginUser } = useAuthApi();

  // --- Validators ---
  const validatePassword = (pw: string) => pw.length >= 8 && /\d/.test(pw);
  const validateEmail = (em: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em); // basic email regex

  // --- Unified validation effect ---
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      // Only validate in register mode
      if (mode === "register") {
        if (email && !validateEmail(email)) {
          setError("Please enter a valid email address.");
          return;
        }
      }

      if (password && !validatePassword(password)) {
        setError("Password must be at least 8 characters and include a number.");
        return;
      }

      setError("");   // Clear error if everything is valid
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [password, email, mode]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    // Guard: required fields
    if (!username || !password || (mode === "register" && !email) || !!error) return;

    try {
      if (mode === "register") {
        const payload: RegisterPayload = { username, email, password };
        await registerUser(payload);

        const data = await loginUser(payload);
        login(username, data.access, data.refresh);
        navigate("/dashboard");
      } else {
        const payload: LoginPayload = { username, password };

        const data = await loginUser(payload);
        login(username, data.access, data.refresh);
        navigate("/dashboard");
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  const isFormDisabled =
    !username || !password || (mode === "register" && !email) || !!error || !validatePassword(password);

  const switchMode = (newMode: "login" | "register") => {
    setMode(newMode);
    setError("");
    setUsername("");
    setEmail("");
    setPassword("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-transparent rounded w-108"
    >
      <label className="block mb-4">
        <span className="text-gray-700 opacity-75">Username</span>
        <input
          type="text"
          placeholder="Username" 
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="mt-2 block w-full border border-gray-300 rounded-md p-2 shadow-sm"
          required
        />
      </label>

      {mode === "register" && (
        <label className="block mb-4">
          <span className="text-gray-700 opacity-75">Email</span>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-2 block w-full border border-gray-300 rounded-md p-2 shadow-sm"
            required
          />
        </label>
      )}

      <label className="block mb-2">
        <span className="text-gray-700 opacity-75">Password</span>
        <input
          type="password"
          placeholder="Password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-2 block w-full border border-gray-300 rounded-md p-2 shadow-sm"
          required
        />
      </label>

      {/* Error messages */}
      {error && password && (
        <p className="text-red-500 mb-6">{error}</p>
      )}

      <button
        type="submit"
        disabled={!!error}
        className={`w-full py-2 rounded-md bg-[#3069ff] text-white ${
          isFormDisabled ? 
          "opacity-75 cursor-not-allowed" 
          : "hover:bg-[#2557d6] hover:shadow-sm}"
        }`}
      >
        {mode === "login" ? "Login" : "Register"}
      </button>

      <div className="mt-4 text-center text-sm text-gray-600">
        {mode === "login" ? (
          <span>
            New to Luma?{" "}
            <button
              type="button"
              onClick={() => switchMode("register")}
              className="text-[#3069ff] hover:underline"
            >
              Create an account
            </button>
          </span>
        ) : (
          <span>
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => switchMode("login")}
              className="text-[#3069ff] hover:underline"
            >
              Sign in
            </button>
          </span>
        )}
      </div>
    </form>
  );
}
